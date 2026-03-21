import { NextRequest, NextResponse } from "next/server";

type LatLng = {
  lat: number;
  lng: number;
};

type NormalizedSolarResponse = {
  solarDataAvailable: boolean;
  message: string | null;
  buildingName: string | null;
  center: LatLng | null;
  maxPanelCount: number | null;
  maxSunlightHoursPerYear: number | null;
  maxArrayAreaMeters2: number | null;
  yearlyEnergyKwh: number | null;
  carbonOffsetFactorKgPerMwh: number | null;
};

type GoogleLatLng = {
  latitude?: number;
  longitude?: number;
};

type GoogleSolarPanelConfig = {
  panelsCount?: number;
  yearlyEnergyDcKwh?: number;
};

type GoogleSolarPotential = {
  maxArrayPanelsCount?: number;
  maxSunshineHoursPerYear?: number;
  maxArrayAreaMeters2?: number;
  carbonOffsetFactorKgPerMwh?: number;
  solarPanelConfigs?: GoogleSolarPanelConfig[];
};

type GoogleBuildingInsightsResponse = {
  name?: string;
  center?: GoogleLatLng;
  solarPotential?: GoogleSolarPotential;
};

type NormalizedErrorBody = { error: string };

function jsonError(message: string, status: number) {
  const body: NormalizedErrorBody = { error: message };
  return NextResponse.json(body, { status });
}

function parseRequiredNumber(value: string | null, field: string) {
  if (!value) return { ok: false as const, value: null };

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return { ok: false as const, value: null };

  return { ok: true as const, value: parsed };
}

function normalizeSolar(
  inputCenter: LatLng,
  data: GoogleBuildingInsightsResponse | null,
): NormalizedSolarResponse {
  if (!data) {
    return {
      solarDataAvailable: false,
      message: "No solar data returned.",
      buildingName: null,
      center: inputCenter,
      maxPanelCount: null,
      maxSunlightHoursPerYear: null,
      maxArrayAreaMeters2: null,
      yearlyEnergyKwh: null,
      carbonOffsetFactorKgPerMwh: null,
    };
  }

  const solarPotential = data.solarPotential;

  const solarPanelConfigs = solarPotential?.solarPanelConfigs ?? [];
  const bestConfig = solarPanelConfigs.reduce<
    GoogleSolarPanelConfig | null
  >((best, current) => {
    const bestCount = best?.panelsCount ?? -1;
    const currentCount = current?.panelsCount ?? -1;
    return currentCount > bestCount ? current : best;
  }, null);

  const center: LatLng = {
    lat:
      typeof data.center?.latitude === "number"
        ? data.center.latitude
        : inputCenter.lat,
    lng:
      typeof data.center?.longitude === "number"
        ? data.center.longitude
        : inputCenter.lng,
  };

  return {
    solarDataAvailable: Boolean(
      solarPotential &&
        typeof solarPotential.maxArrayPanelsCount === "number",
    ),
    message: null,
    buildingName: typeof data.name === "string" ? data.name : null,
    center,
    maxPanelCount:
      typeof solarPotential?.maxArrayPanelsCount === "number"
        ? solarPotential.maxArrayPanelsCount
        : null,
    maxSunlightHoursPerYear:
      typeof solarPotential?.maxSunshineHoursPerYear === "number"
        ? solarPotential.maxSunshineHoursPerYear
        : null,
    maxArrayAreaMeters2:
      typeof solarPotential?.maxArrayAreaMeters2 === "number"
        ? solarPotential.maxArrayAreaMeters2
        : null,
    yearlyEnergyKwh:
      typeof bestConfig?.yearlyEnergyDcKwh === "number"
        ? bestConfig.yearlyEnergyDcKwh
        : null,
    carbonOffsetFactorKgPerMwh:
      typeof solarPotential?.carbonOffsetFactorKgPerMwh === "number"
        ? solarPotential.carbonOffsetFactorKgPerMwh
        : null,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const latRaw = searchParams.get("lat");
  const lngRaw = searchParams.get("lng");

  const latParsed = parseRequiredNumber(latRaw, "lat");
  const lngParsed = parseRequiredNumber(lngRaw, "lng");

  if (!latParsed.ok || !lngParsed.ok) {
    return jsonError("Missing or invalid 'lat' and 'lng' query parameters.", 400);
  }

  const lat = latParsed.value;
  const lng = lngParsed.value;

  // Basic coordinate bounds so we can fail fast.
  if (lat === null || lng === null || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return jsonError("Latitude must be [-90, 90] and longitude must be [-180, 180].", 400);
  }

  const apiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY;

  if (!apiKey) {
    return jsonError(
      "Server solar insights is not configured. Missing GOOGLE_MAPS_SERVER_API_KEY.",
      500,
    );
  }

  const inputCenter: LatLng = { lat, lng };

  const endpoint = new URL(
    "https://solar.googleapis.com/v1/buildingInsights:findClosest",
  );
  endpoint.searchParams.set("location.latitude", String(lat));
  endpoint.searchParams.set("location.longitude", String(lng));
  // Keep it conservative: prefer HIGH quality imagery for more reliable results.
  endpoint.searchParams.set("requiredQuality", "HIGH");
  endpoint.searchParams.set("key", apiKey);

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(endpoint.toString(), { method: "GET" });
  } catch {
    return jsonError("Unable to reach the Google Solar API service.", 502);
  }

  // The upstream API typically uses NOT_FOUND when there are no buildings within range.
  if (upstreamResponse.status === 404) {
    return NextResponse.json(
      {
        ...normalizeSolar(inputCenter, null),
        message: "No usable solar data returned for these coordinates.",
      } satisfies NormalizedSolarResponse,
      { status: 200 },
    );
  }

  if (!upstreamResponse.ok) {
    return jsonError(
      "Solar API request failed with an upstream error.",
      502,
    );
  }

  let data: GoogleBuildingInsightsResponse | null = null;
  try {
    data = (await upstreamResponse.json()) as GoogleBuildingInsightsResponse;
  } catch {
    return jsonError(
      "Received an unexpected response from the Solar API service.",
      502,
    );
  }

  const normalized = normalizeSolar(inputCenter, data);
  if (!normalized.solarDataAvailable) {
    return NextResponse.json(
      { ...normalized, message: "Solar data is unavailable for this location." },
      { status: 200 },
    );
  }

  return NextResponse.json(normalized);
}

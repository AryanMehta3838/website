import { NextRequest, NextResponse } from "next/server";

type GeocodeResult = {
  formattedAddress: string;
  lat: number;
  lng: number;
};

type GoogleGeocodeResponse = {
  status: string;
  results: Array<{
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
};

function createErrorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address || !address.trim()) {
    return createErrorResponse("Missing 'address' query parameter.", 400);
  }

  const apiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY;

  if (!apiKey) {
    return createErrorResponse(
      "Server geocoding is not configured. Missing GOOGLE_MAPS_SERVER_API_KEY.",
      500,
    );
  }

  const endpoint = new URL(
    "https://maps.googleapis.com/maps/api/geocode/json",
  );
  endpoint.searchParams.set("address", address);
  endpoint.searchParams.set("key", apiKey);

  let geocodeResponse: Response;

  try {
    geocodeResponse = await fetch(endpoint.toString(), {
      method: "GET",
    });
  } catch {
    return createErrorResponse(
      "Unable to reach the Google Geocoding service.",
      502,
    );
  }

  if (!geocodeResponse.ok) {
    return createErrorResponse(
      "Geocoding request failed with an upstream error.",
      502,
    );
  }

  let data: GoogleGeocodeResponse;

  try {
    data = (await geocodeResponse.json()) as GoogleGeocodeResponse;
  } catch {
    return createErrorResponse(
      "Received an unexpected response from the geocoding service.",
      502,
    );
  }

  if (!data.results || data.results.length === 0) {
    return createErrorResponse(
      "No geocoding results found for the provided address.",
      404,
    );
  }

  const firstResult = data.results[0];
  const { formatted_address, geometry } = firstResult;
  const { lat, lng } = geometry.location;

  const result: GeocodeResult = {
    formattedAddress: formatted_address,
    lat,
    lng,
  };

  return NextResponse.json(result);
}

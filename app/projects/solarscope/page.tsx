"use client";

import { useState } from "react";
import { SearchBar } from "@/src/components/solarscope/SearchBar";
import { MapPanel } from "@/src/components/solarscope/MapPanel";
import { InsightCards } from "@/src/components/solarscope/InsightCards";

type GeocodeResult = {
  formattedAddress: string;
  lat: number;
  lng: number;
};

/** Matches the normalized JSON from GET /api/solarscope/solar */
type SolarResult = {
  solarDataAvailable: boolean;
  message: string | null;
  buildingName: string | null;
  center: { lat: number; lng: number } | null;
  maxPanelCount: number | null;
  maxSunlightHoursPerYear: number | null;
  maxArrayAreaMeters2: number | null;
  yearlyEnergyKwh: number | null;
  carbonOffsetFactorKgPerMwh: number | null;
};

function isSolarResult(data: unknown): data is SolarResult {
  return (
    typeof data === "object" &&
    data !== null &&
    "solarDataAvailable" in data &&
    typeof (data as SolarResult).solarDataAvailable === "boolean"
  );
}

export default function SolarScopePage() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [submittedAddress, setSubmittedAddress] = useState<string | null>(null);
  const [geocodeResult, setGeocodeResult] = useState<GeocodeResult | null>(
    null,
  );
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState<string | null>(null);

  const [solarResult, setSolarResult] = useState<SolarResult | null>(null);
  const [isSolarLoading, setIsSolarLoading] = useState(false);
  const [solarError, setSolarError] = useState<string | null>(null);

  const handleSubmitSearch = async () => {
    const trimmed = searchInput.trim();
    if (!trimmed) {
      setSubmittedAddress(null);
      setGeocodeResult(null);
      setGeocodeError(null);
      setSolarResult(null);
      setSolarError(null);
      return;
    }

    setSubmittedAddress(trimmed);
    setIsGeocoding(true);
    setGeocodeError(null);
    setGeocodeResult(null);
    setSolarResult(null);
    setSolarError(null);

    try {
      const res = await fetch(
        `/api/solarscope/geocode?address=${encodeURIComponent(trimmed)}`,
        { method: "GET" },
      );

      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        // Keep the error message simple and user-friendly below.
      }

      if (!res.ok) {
        const message =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error?: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Geocoding failed. Please try a different address.";
        setGeocodeError(message);
        return;
      }

      if (
        typeof data === "object" &&
        data !== null &&
        typeof (data as { formattedAddress?: unknown }).formattedAddress ===
          "string" &&
        typeof (data as { lat?: unknown }).lat === "number" &&
        typeof (data as { lng?: unknown }).lng === "number"
      ) {
        const result = data as GeocodeResult;
        setGeocodeResult(result);

        // Sequential: fetch solar insights using geocoded coordinates.
        setIsSolarLoading(true);
        try {
          const solarRes = await fetch(
            `/api/solarscope/solar?lat=${encodeURIComponent(result.lat)}&lng=${encodeURIComponent(result.lng)}`,
            { method: "GET" },
          );
          let solarData: unknown = null;
          try {
            solarData = await solarRes.json();
          } catch {
            setSolarError("Solar insights could not be loaded.");
            return;
          }
          if (!solarRes.ok) {
            const msg =
              typeof solarData === "object" &&
              solarData !== null &&
              "error" in solarData &&
              typeof (solarData as { error?: unknown }).error === "string"
                ? (solarData as { error: string }).error
                : "Solar insights request failed.";
            setSolarError(msg);
            return;
          }
          if (isSolarResult(solarData)) {
            setSolarResult(solarData);
          } else {
            setSolarError("Solar insights response was unexpected.");
          }
        } catch {
          setSolarError("Unable to load solar insights. Please try again.");
        } finally {
          setIsSolarLoading(false);
        }
        return;
      }

      setGeocodeError("Received an unexpected response from geocoding.");
    } catch {
      setGeocodeError("Unable to geocode right now. Please try again.");
    } finally {
      setIsGeocoding(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">SolarScope</h1>
            <p className="text-sm text-zinc-600">
              Rooftop solar feasibility explorer
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 md:py-16">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSubmit={() => {
            void handleSubmitSearch();
          }}
          isLoading={isGeocoding}
        />

        {isGeocoding && (
          <section className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">
            <p>
              <span className="font-medium text-zinc-900">
                Resolving address:
              </span>{" "}
              {submittedAddress}
            </p>
          </section>
        )}

        {geocodeError && (
          <section className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <p>
              <span className="font-medium">Geocoding error:</span>{" "}
              {geocodeError}
            </p>
          </section>
        )}

        {geocodeResult ? (
          <section className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">
            <p>
              <span className="font-medium text-zinc-900">Resolved:</span>{" "}
              {geocodeResult.formattedAddress}
            </p>
          </section>
        ) : null}

        {!geocodeResult && !isGeocoding && submittedAddress ? (
          <section className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">
            <p>
              <span className="font-medium text-zinc-900">Submitted address:</span>{" "}
              {submittedAddress}
            </p>
          </section>
        ) : null}

        <MapPanel
          coordinates={
            geocodeResult ? { lat: geocodeResult.lat, lng: geocodeResult.lng } : null
          }
        />
        <InsightCards
          solar={solarResult}
          isLoading={isSolarLoading}
          error={solarError}
        />
      </main>
    </div>
  );
}

/** Matches the normalized JSON from GET /api/solar (only fields we display). */
type SolarData = {
  solarDataAvailable: boolean;
  maxPanelCount: number | null;
  maxSunlightHoursPerYear: number | null;
  maxArrayAreaMeters2: number | null;
  yearlyEnergyKwh: number | null;
};

type InsightCardsProps = {
  solar: SolarData | null;
  isLoading: boolean;
  error: string | null;
};

type CandidateRating = "Excellent" | "Good" | "Limited" | "Unknown";

type RatingResult = {
  rating: CandidateRating;
  explanation: string;
};

const UNAVAILABLE = "Unavailable";

/** Simple thresholds; easy to tweak. Uses 0 when a value is missing. */
function getCandidateRating(solar: SolarData): RatingResult {
  const panels = solar.maxPanelCount ?? 0;
  const sunlightHours = solar.maxSunlightHoursPerYear ?? 0;
  const yearlyKwh = solar.yearlyEnergyKwh ?? 0;

  const hasAnyData = panels > 0 || sunlightHours > 0 || yearlyKwh > 0;
  if (!solar.solarDataAvailable || !hasAnyData) {
    return {
      rating: "Unknown",
      explanation:
        "Insufficient solar data for this location, or address is outside supported coverage.",
    };
  }

  if (panels >= 15 && (sunlightHours >= 1200 || yearlyKwh >= 6000)) {
    return {
      rating: "Excellent",
      explanation:
        "High panel capacity and strong sunlight or yearly generation make this roof a strong candidate for solar.",
    };
  }

  if (panels >= 8 && (sunlightHours >= 1000 || yearlyKwh >= 3000)) {
    return {
      rating: "Good",
      explanation:
        "Solid panel count and good sun or generation potential; rooftop solar is a reasonable option.",
    };
  }

  if (panels >= 1 || sunlightHours >= 500 || yearlyKwh >= 500) {
    return {
      rating: "Limited",
      explanation:
        "Some solar potential is present, but panel capacity or sun exposure is limited compared to ideal sites.",
    };
  }

  return {
    rating: "Unknown",
    explanation:
      "Not enough data to assign a rating; key metrics are missing or zero.",
  };
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function InsightCards({ solar, isLoading, error }: InsightCardsProps) {
  return (
    <section className="rounded-xl border border-dashed border-zinc-200 bg-white px-6 py-6 shadow-sm md:py-8">
      <h2 className="text-base font-medium text-zinc-900">Solar insights</h2>
      <p className="mt-2 text-sm text-zinc-600">
        High-level, non-binding estimates based on rooftop characteristics.
      </p>

      {isLoading && (
        <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm text-zinc-600">
          Loading solar insights…
        </div>
      )}

      {!isLoading && error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <p>
            <span className="font-medium">Solar insights error:</span> {error}
          </p>
        </div>
      )}

      {!isLoading && !error && solar && (() => {
        const { rating, explanation } = getCandidateRating(solar);
        return (
          <>
            <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-4">
              <h3 className="text-sm font-medium text-zinc-900">
                Candidate rating
              </h3>
              <p className="mt-1 text-xl font-semibold text-zinc-900">
                {rating}
              </p>
              <p className="mt-1 text-sm text-zinc-600">{explanation}</p>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <article className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-4">
                <h3 className="text-sm font-medium text-zinc-900">
                  Solar potential
                </h3>
                <p className="mt-1 text-lg font-semibold text-zinc-900">
                  {solar.solarDataAvailable ? "Available" : UNAVAILABLE}
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  Whether usable solar data exists for this location.
                </p>
              </article>
              <article className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-4">
                <h3 className="text-sm font-medium text-zinc-900">
                  Max panel count
                </h3>
                <p className="mt-1 text-lg font-semibold text-zinc-900">
                  {solar.maxPanelCount != null
                    ? `${formatNumber(solar.maxPanelCount)} panels`
                    : UNAVAILABLE}
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  Maximum panels that can fit on the roof.
                </p>
              </article>
              <article className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-4">
                <h3 className="text-sm font-medium text-zinc-900">
                  Estimated yearly generation
                </h3>
                <p className="mt-1 text-lg font-semibold text-zinc-900">
                  {solar.yearlyEnergyKwh != null
                    ? `${formatNumber(solar.yearlyEnergyKwh)} kWh`
                    : UNAVAILABLE}
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  Modeled annual energy production (DC).
                </p>
              </article>
              <article className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-4">
                <h3 className="text-sm font-medium text-zinc-900">
                  Max array area
                </h3>
                <p className="mt-1 text-lg font-semibold text-zinc-900">
                  {solar.maxArrayAreaMeters2 != null
                    ? `${formatNumber(solar.maxArrayAreaMeters2)} m²`
                    : UNAVAILABLE}
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  Maximum solar array size in square meters.
                </p>
              </article>
            </div>
          </>
        );
      })()}

      {!isLoading && !error && !solar && (
        <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm text-zinc-600">
          Search an address to see solar insights for that location.
        </div>
      )}
    </section>
  );
}

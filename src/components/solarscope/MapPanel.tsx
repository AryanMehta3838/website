"use client";

import { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

declare const google: any;

type LatLng = {
  lat: number;
  lng: number;
};

type MapPanelProps = {
  coordinates: LatLng | null;
};

const DEFAULT_CENTER: LatLng = {
  lat: 39.5, // approximate center of the continental US
  lng: -98.35,
};

export function MapPanel({ coordinates }: MapPanelProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any | null>(null);
  const markerRef = useRef<any | null>(null);

  const [loadError, setLoadError] = useState<string | null>(null);

  const coordinatesRef = useRef<LatLng | null>(coordinates);
  coordinatesRef.current = coordinates;

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setLoadError("Google Maps is not configured yet.");
      return;
    }

    if (!mapContainerRef.current) {
      return;
    }

    let isCancelled = false;

    setOptions({
      key: apiKey,
      v: "weekly",
    });

    (async () => {
      try {
        await importLibrary("maps");

        if (isCancelled || !mapContainerRef.current) {
          return;
        }

        const initialCenter = coordinatesRef.current ?? DEFAULT_CENTER;
        const map = new google.maps.Map(mapContainerRef.current, {
          center: initialCenter,
          zoom: 5,
          disableDefaultUI: true,
        });

        const marker = new google.maps.Marker({
          position: initialCenter,
          map,
        });

        mapRef.current = map;
        markerRef.current = marker;
      } catch {
        if (!isCancelled) {
          setLoadError("Unable to load Google Maps right now.");
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;

    const target = coordinates ?? DEFAULT_CENTER;
    mapRef.current.setCenter(target);
    markerRef.current.setPosition(target);
  }, [coordinates]);

  const hasError = loadError !== null;

  return (
    <section className="rounded-xl border border-dashed border-zinc-200 bg-white px-6 py-6 shadow-sm md:py-8">
      <h2 className="text-base font-medium text-zinc-900">Map</h2>
      <p className="mt-2 text-sm text-zinc-600">
        An initial rooftop map preview will appear in this area.
      </p>

      {hasError ? (
        <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-6 text-sm text-zinc-600">
          <p className="font-medium text-zinc-900">Map not available</p>
          <p className="mt-1 text-xs text-zinc-600">
            {loadError} Add a browser API key in{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-[0.7rem]">
              NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            </code>{" "}
            to see the live map.
          </p>
        </div>
      ) : (
        <div className="mt-4 h-64 rounded-lg border border-zinc-200 bg-zinc-100">
          <div
            ref={mapContainerRef}
            className="h-full w-full rounded-lg"
            aria-label="SolarScope map preview"
          />
        </div>
      )}
    </section>
  );
}

"use client";
import React from "react";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";

const PARTICIPATING_COUNTRIES = [
  { lat: 38.8951, lng: -77.0364, name: 'USA', code: 'us' },
  { lat: 45.4215, lng: -75.6972, name: 'Canada', code: 'ca' },
  { lat: 19.4326, lng: -99.1332, name: 'Mexico', code: 'mx' },
  { lat: 48.8566, lng: 2.3522, name: 'France', code: 'fr' },
  { lat: 52.5200, lng: 13.4050, name: 'Germany', code: 'de' },
  { lat: 53.5000, lng: -3.0000, name: 'England', code: 'gb-eng' },
  { lat: 40.4168, lng: -3.7038, name: 'Spain', code: 'es' },
  { lat: 38.7223, lng: -9.1393, name: 'Portugal', code: 'pt' },
  { lat: 41.9028, lng: 12.4964, name: 'Italy', code: 'it' },
  { lat: 35.6762, lng: 139.6503, name: 'Japan', code: 'jp' },
  { lat: 37.5665, lng: 126.9780, name: 'South Korea', code: 'kr' },
  { lat: -35.2809, lng: 149.1300, name: 'Australia', code: 'au' },
  { lat: 14.7167, lng: -17.4677, name: 'Senegal', code: 'sn' },
  { lat: 34.0209, lng: -6.8416, name: 'Morocco', code: 'ma' },
  { lat: 52.3676, lng: 4.9041, name: 'Netherlands', code: 'nl' },
  { lat: 45.8150, lng: 15.9819, name: 'Croatia', code: 'hr' },
  { lat: -34.6037, lng: -58.3816, name: 'Argentina', code: 'ar', focus: true },
  { lat: -15.7938, lng: -47.8827, name: 'Brazil', code: 'br', focus: true }
]

export function Globe({ className, autoFocus = false }: { className?: string, autoFocus?: boolean }) {
  const markers: GlobeMarker[] = PARTICIPATING_COUNTRIES.map((country) => ({
    lat: country.lat,
    lng: country.lng,
    src: `https://flagcdn.com/${country.code}.svg`,
    label: country.name,
  }));

  return (
    <div className={`relative mx-auto aspect-square w-full flex items-center justify-center ${className || ''}`}>
      <Globe3D
        markers={markers}
        config={{
          atmosphereColor: "#3B82F6",
          atmosphereIntensity: 0.5,
          bumpScale: 5,
          autoRotateSpeed: autoFocus ? 0 : 0.3,
        }}
      />
    </div>
  );
}

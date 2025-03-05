"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { campusLocations, defaultLocation } from "@/lib/mapData";

const CampusMap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("campus-map", {
        center: [defaultLocation.latitude, defaultLocation.longitude],
        zoom: defaultLocation.zoom,
        layers: [
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }),
        ],
      });

      campusLocations.forEach((location) => {
        const marker = L.marker([location.latitude, location.longitude]).addTo(map);
        marker.bindPopup(`<strong>${location.title}</strong><br>${location.description}`);
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="campus-map" className="w-full h-full" />;
};

export default CampusMap;

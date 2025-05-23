'use client';

import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ReportMap({ coordinates, setCoordinates }) {
  const mapRef = useRef(null);

  function DraggableMarker() {
    const [position, setPosition] = useState([coordinates.lat, coordinates.lon]);

    const map = useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setCoordinates({ lat: e.latlng.lat, lon: e.latlng.lng });
      },
    });

    useEffect(() => {
      setPosition([coordinates.lat, coordinates.lon]);
    }, [coordinates]);

    return (
      <Marker
        position={position}
        icon={markerIcon}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const newCoords = e.target.getLatLng();
            setPosition([newCoords.lat, newCoords.lng]);
            setCoordinates({ lat: newCoords.lat, lon: newCoords.lng });
          },
        }}
      >
        <Popup>Drag me to adjust location</Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lon]}
      zoom={15}
      style={{ height: "300px", width: "100%", marginTop: "10px" }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <DraggableMarker />
    </MapContainer>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/swanik.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ReportPage() {
  const [formData, setFormData] = useState({
    age: "",
    color: "",
    location: "",
    email: "",
  });

  const [coordinates, setCoordinates] = useState({ lat: 20.5937, lon: 78.9629 }); // Default India center
  const mapRef = useRef(null); // Ref to map instance

  // Auto-detect user location on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          setCoordinates({ lat: userLat, lon: userLon });
          reverseGeocode(userLat, userLon);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  // Reverse geocode coordinates to location name (auto-fill location input)
  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setFormData((prev) => ({
          ...prev,
          location: data.display_name,
        }));
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };

  // Fetch coordinates from location name (when user types location)
  const fetchCoordinates = async (location) => {
    if (!location) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const newLat = parseFloat(data[0].lat);
        const newLon = parseFloat(data[0].lon);
        setCoordinates({ lat: newLat, lon: newLon });

        // Center map if available
        if (mapRef.current) {
          const currentZoom = mapRef.current.getZoom();
          mapRef.current.setView([newLat, newLon], currentZoom);
        }
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "location") {
      fetchCoordinates(value);
    }
  };

  const handleAgeChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, age: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "strayReports"), {
        ...formData,
        lat: coordinates.lat,
        lon: coordinates.lon,
        timestamp: Date.now(),
      });
      alert("Stray Dog Reported!");
      setFormData({ age: "", color: "", location: "", email: "" });
    } catch (error) {
      console.error("Error reporting stray:", error);
      alert("Error reporting stray dog. Try again!");
    }
  };

  function DraggableMarker() {
    const [position, setPosition] = useState([coordinates.lat, coordinates.lon]);

    const map = useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setCoordinates({ lat: e.latlng.lat, lon: e.latlng.lng });
      },
    });

    // Keep marker in sync if coordinates change externally
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
    <>
      <Header />
      <main className="report-page">
        <h1 className="h1report">REPORT A STRAY DOG</h1>
        <h1 className="rep-h1">
          Fill in the following details and get one step closer to helping strays find their loving homes
        </h1>
        <div className="formdiv">
          <form className="form-r" onSubmit={handleSubmit}>
            <label className="age-r">
              Age:
              <div className="age-options">
                <label className="label-i">
                  <input
                    className="radio-i"
                    type="radio"
                    name="age"
                    value="Puppy"
                    checked={formData.age === "Puppy"}
                    onChange={handleAgeChange}
                  />
                  Puppy
                </label>

                <label className="label-i">
                  <input
                    className="radio-i"
                    type="radio"
                    name="age"
                    value="Mid-size"
                    checked={formData.age === "Mid-size"}
                    onChange={handleAgeChange}
                  />
                  Mid-Size
                </label>

                <label className="label-i">
                  <input
                    className="radio-i"
                    type="radio"
                    name="age"
                    value="Fully grown"
                    checked={formData.age === "Fully grown"}
                    onChange={handleAgeChange}
                  />
                  Fully Grown
                </label>
              </div>
            </label>

            <label htmlFor="color" className="desc-r">
              Color:
              <input
                id="color"
                className="desc-inp"
                type="text"
                value={formData.color}
                onChange={handleChange}
                placeholder="Describe the dog's color"
                required
              />
            </label>

            <label htmlFor="location" className="loc-r">
              Location:
              <input
                id="location"
                className="loc-inp"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location found at"
                required
              />
            </label>

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

            <h2 className="loc-h2">Drag the pin for a more accurate location</h2>

            <label htmlFor="email" className="email-r">
              Email: (for contacting purposes)
              <input
                id="email"
                className="email-inp"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email "
                required
              />
            </label>

            <div className="submitb-r">
              <input className="submit-r" type="submit" value="Report" />
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ReportPage;

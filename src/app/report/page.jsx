"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "../styles/swanik.css";

const ReportMap = dynamic(() => import("../components/ReportMap"), { ssr: false });

export default function ReportPage() {
  const [formData, setFormData] = useState({
    age: "",
    color: "",
    location: "",
    email: "",
  });

  const [coordinates, setCoordinates] = useState({ lat: 20.5937, lon: 78.9629 }); // Default India center

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
                {["Puppy", "Mid-size", "Fully grown"].map((ageOption) => (
                  <label key={ageOption} className="label-i">
                    <input
                      className="radio-i"
                      type="radio"
                      name="age"
                      value={ageOption}
                      checked={formData.age === ageOption}
                      onChange={handleAgeChange}
                    />
                    {ageOption}
                  </label>
                ))}
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

            <ReportMap coordinates={coordinates} setCoordinates={setCoordinates} />

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

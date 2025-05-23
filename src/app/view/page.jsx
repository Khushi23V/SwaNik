"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // ✅ Add this
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/swanik.css";

const markerIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ViewPage() {
  const searchParams = useSearchParams(); // ✅ Use the hook
  const id = searchParams.get("id"); // ✅ Correct way to get value

  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!id) return;

    async function fetchDog() {
      try {
        const docRef = doc(db, "strayReports", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDog(docSnap.data());
        } else {
          setDog(null);
        }
      } catch (error) {
        console.error("Error fetching dog data:", error);
        setDog(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!dog) return <p>No dog details available.</p>;

  return (
    <>
      <Header />
      <main>
        <Link href="/adopt">
          <div className="back">
            <div className="bx bx-chevron-left" id="back-icon"></div>
          </div>
        </Link>

        <div className="main-div">
          <div className="infodiv">
            <h1 className="h1s">Color of Dog</h1>
            <p className="ps">{dog.color || "No description available"}</p>
          </div>

          <div className="detaildiv">
            <div className="detail">
              <h2 className="h2s">Age</h2>
              <h2 className="h2s">Location</h2>
              <h2 className="h2s">Email</h2>
            </div>

            <div className="sinfo">
              <p className="p2s">{dog.age || "No age available"}</p>
              <p className="p2s">{dog.location}</p>
              <p className="p2s">{dog.email}</p>
            </div>
          </div>

          <h2 className="view-h2">(Contact the email provided if you wish to adopt the dog)</h2>

          {isClient && (
            <MapContainer
              center={[dog.lat, dog.lon]}
              zoom={15}
              style={{
                height: "300px",
                width: "80%",
                marginTop: "20px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[dog.lat, dog.lon]} icon={markerIcon}>
                <Popup>{dog.location}</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

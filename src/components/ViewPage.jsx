import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/swanik.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const markerIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ViewPage() {
  const location = useLocation();
  const dog = location.state;

  if (!dog) {
    return <p>No dog details available.</p>;
  }

  return (
    <>
      <Header />
      <main>
        <Link to="/adopt" className="back">
          <div className="bx bx-chevron-left" id="back-icon"></div>
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
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default ViewPage;

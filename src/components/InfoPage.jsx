import React from "react";
import { Link } from "react-router-dom";
import "../styles/swanik.css";

function InfoPage() {
  return (
    <main>
      <div className="border">
        <div className="vinfo">
          <h1 className="h1v">WHAT WE DO</h1>
          <h2 className="h2v">Our Mission</h2>
          <p className="pv">
            At Stray Dog Finder, our mission goes beyond simply connecting people to stray dogs.
            We believe in the power of compassion, the strength of community, and the transformative effect of kindness.
            Every stray dog deserves a second chance—a warm home, a full belly, and the love of a family.
            Our mission is to make that possible, one paw at a time.
          </p>
          <h2 className="h2v">Reporting a Stray</h2>
          <p className="pv">
            Every stray dog has a story, and we’re here to help them write a new chapter.
            By reporting a stray, you’re taking the first step in giving them hope. This feature allows you to:
          </p>
          <ul className="ulv">
            <li className="liv">Identify and share the exact location of a stray in need.</li>
            <li className="liv">Capture their current condition with detailed descriptions.</li>
          </ul>
          <h2 className="h2v">Adopting a Stray</h2>
          <p className="pv">
            Adopting a stray dog means giving them a future filled with love and joy. Through this mission, we:
          </p>
          <ul className="ulv">
            <li className="liv">Share heartfelt profiles of rescued dogs, showcasing their unique personalities and stories.</li>
            <li className="liv">Make adoption simple and accessible, so more dogs can find forever homes.</li>
          </ul>
          <h2 className="h2v">Volunteering (launching soon)</h2>
          <p className="pv">
            Our mission thrives on the generosity of individuals who care deeply about animals. As a volunteer, you become a cornerstone of this effort. You can:
          </p>
          <ul className="ulv">
            <li className="liv">Raise awareness to expand the reach of our mission.</li>
            <li className="liv">Support other users by donating funds to those working to rescue and care for strays.</li>
          </ul>
        </div>
      </div>
      <footer className="footerv">
        <Link to="/">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/01/13/paw-155322_640.png"
            className="vlogo"
            alt="Paw Logo"
          />
        </Link>
      </footer>
    </main>
  );
};

export default InfoPage;

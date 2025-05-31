import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/swanik.css";
import Footer from "./Footer";

export default function MainPage() {
  const [isMenuShowing, setIsMenuShowing] = useState(false);

  const toggleMenu = () => {
    setIsMenuShowing((prev) => !prev);
  };

  return (
    <>
      <header className="head">
        <div className="navbar">
        <h1 className="hlogot"><Link to="/" className="logolink">SwaNik</Link>
          </h1>
          <Link to="/">
            <img
              src="https://cdn.pixabay.com/photo/2013/07/13/01/13/paw-155322_640.png"
              className="pawlogo"
              alt="Logo"
            />
          </Link>
          <div
            className={`bx bx-menu ${isMenuShowing ? "bx-x" : ""}`}
            id="menu-icon"
            onClick={toggleMenu}
          ></div>
        </div>
      </header>

      <main className="info">
      
        <div className="info-section">
        <h1 className="htitle">ABOUT</h1>
        <div className="info-info">
          <div className="item1"><p>At SwaNik, our mission goes beyond simply connecting people to stray dogs. We believe in the power of compassion, the strength of community, and the transformative effect of kindness. Every stray dog deserves a second chance; a warm home, a full belly, and the love of a family. Our mission is to make that possible, one paw at a time.</p>
          </div>
                    <a href="#home"><button className="waitlist-btn">Get Started</button></a>
                    </div>
        </div>
        <div className="report-section" id="home">
          <h1 className="htitle">REPORT</h1>
          <div className="report-info">
            <img
              src="https://t4.ftcdn.net/jpg/06/96/91/05/360_F_696910506_Nz7jzTSBy0HJIT2A85nmJB1orx7PZDRP.jpg"
              alt="Report Stray"
            />
            <div className="report-desc">
              <h1 className="htitle">If you spot a stray dog in need, you can identify and share the exact location of a stray in need and capture their current condition with detailed descriptions.</h1>
              <button>
                <Link to="/report">Report</Link>
              </button>
            </div>
          </div>
        </div>

        <div className="adopt-section">
          <h1 className="htitle">ADOPT</h1>
          <div className="adopt-info">
            <img
              src="https://png.pngtree.com/png-vector/20231017/ourmid/pngtree-cute-cartoon-happy-dog-png-file-png-image_10201724.png"
              alt="Adopt a Dog"
            />
            <div className="adopt-desc">
              <h1 className="htitle">Browse through our database of rescued strays, each with their own unique story.</h1>
              <button>
                <Link to="/adopt">Adopt</Link>
              </button>
            </div>
          </div>
        </div>

        <div className="volunteer-section">
          <h1 className="htitle">VOLUNTEER</h1>
          <p id="c">Wish to volunteer for our mission?</p>
          <div className="volunteer-info">
            <p>
              <Link to="/info" id="a">
                Learn More
              </Link>
            </p>
            
          </div>
        </div>

        <nav className="navlist" style={{ display: isMenuShowing ? "block" : "none" }}>
          <p>What Can You Do?</p>
          <ul>
            <li>
              <Link to="/report">Report</Link>
            </li>
            <li>
              <Link to="/adopt">Adopt</Link>
            </li>
            <li>
              <Link to="/info">Volunteer</Link>
            </li>
          </ul>
        </nav>
      </main>
      <Footer/>
    </>
  );
}

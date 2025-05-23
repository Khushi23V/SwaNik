
'use client';

import React, { useState } from "react";
import Link from "next/link";
import "../styles/swanik.css";

export default function Header() {
  const [isMenuShowing, setIsMenuShowing] = useState(false);

  const toggleMenu = () => {
    setIsMenuShowing((prev) => !prev);
  };

  return (
    <>
      <header className="head">
        <div className="navbar">
          <h1 className="hlogot">
            <Link href="/" className="logolink">SwaNik</Link>
          </h1>
          <Link href="/">
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

        <nav className="navlist" style={{ display: isMenuShowing ? "block" : "none" }}>
          <p>What Can You Do?</p>
          <ul>
            <li><Link href="/report">Report a Stray</Link></li>
            <li><Link href="/adopt">Adopt a Stray</Link></li>
            <li><Link href="/info">Volunteer</Link></li>
          </ul>
        </nav>
      </header>
    </>
  );
}

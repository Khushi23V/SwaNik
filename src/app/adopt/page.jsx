"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/swanik.css";

export default function AdoptPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      try {
        const querySnapshot = await getDocs(collection(db, "strayReports"));
        const reportsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }
    fetchReports();
  }, []);

  return (
    <>
      <Header />
      <main className="adoptcss">
        <h1 className="h1adopt">LOOK FOR STRAY DOGS</h1>
        <h1 className="rep-h1">Find your new best fur-iend today!</h1>
        <div className="cards">
          {reports.length > 0 ? (
            reports.map((dog) => (
              <div className="card" key={dog.id}>
                <div className="card-info">
                  <div className="nameloc">
                    <p className="padopt">Age: {dog.age}</p>
                    <p className="padopt">Location: {dog.location}</p>
                  </div>
                  <div className="features">
                    <div className="viewsave">
 <Link
  href={{ pathname: "/view", query: { id: dog.id } }}
  className="buttonadopt linkadopt"
>
  View
</Link>

                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No stray dogs reported yet.</p>
          )}
        </div>
      </main>
    </>
  );
}

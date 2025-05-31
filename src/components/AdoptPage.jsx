import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/swanik.css";
import Header from "../components/Header";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";


function AdoptPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      try {
        const querySnapshot = await getDocs(collection(db, "strayReports"));
        const reportsData = querySnapshot.docs.map(doc => doc.data());
        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }
  
    fetchReports();
  }, []);

  
  return (
    <>
    <Header/>
    <main className="adoptcss">
      
      <h1 className="h1adopt">LOOK FOR STRAY DOGS</h1>
      <h1 className="rep-h1">Find your new best fur-iend today!</h1>
      <div className="cards">
        {reports.length > 0 ? (
          reports.map((dog, index) => (
            <div className="card" key={index}>
              <div className="card-info">
                <div className="nameloc">
                  <p className="padopt">Age: {dog.age}</p>
                  <p className="padopt">Location: {dog.location}</p>
                </div>
                <div className="features">
                  <div className="viewsave">
                    <button className="buttonadopt">
                    <Link to="/view" state={dog} className="linkadopt">View</Link>
                    </button>
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

export default AdoptPage;

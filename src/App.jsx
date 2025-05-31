import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import ProfilePage from "./components/ProfilePage";
import AdoptPage from "./components/AdoptPage";
import InfoPage from "./components/InfoPage";
import ViewPage from "./components/ViewPage";
import ReportPage from "./components/ReportPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/adopt" element={<AdoptPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/view" element={<ViewPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
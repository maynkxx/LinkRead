import React from "react";
import Navbar from "../components/common/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--neutral-50)' }}>
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main className="container" style={{ padding: '2rem 1rem' }}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;

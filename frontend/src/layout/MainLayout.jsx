import React from "react";
import Navbar from "../components/common/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;

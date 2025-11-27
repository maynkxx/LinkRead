import React from 'react';

const Loader = ({ fullScreen = false, message = "Loading..." }) => {
  return (
    <div className={fullScreen ? "loader-overlay" : "loader-container py-10"}>
      <div className="loader-container">
        <div className="spinner" />
        {message && (
          <p className="text-sm text-secondary">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;

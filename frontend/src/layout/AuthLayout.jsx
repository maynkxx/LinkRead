import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 border border-gray-200">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center">{title}</h1>

        {subtitle && (
          <p className="text-sm text-gray-600 text-center mt-1">{subtitle}</p>
        )}

        {/* Inject form content */}
        <div className="mt-6">{children}</div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;

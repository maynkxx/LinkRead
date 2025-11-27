import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4 transition-colors duration-300">

      <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-8 border border-neutral-200 dark:border-neutral-700">

        {/* Title */}
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white text-center">{title}</h1>

        {subtitle && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center mt-2">{subtitle}</p>
        )}

        {/* Inject form content */}
        <div className="mt-8">{children}</div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;

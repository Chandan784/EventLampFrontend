"use client"; // Required for using React hooks in Next.js

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
// Import the profile icon

export default function Navbar() {
  let router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

  const handleLogin = () => {
    // Simulate login functionality

    setIsLoggedIn(true);
    router.push("/auth");
  };

  const handleLogout = () => {
    // Simulate logout functionality
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              EventLamp
            </Link>
          </div>

          {/* Login Button or Profile Icon */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  <FaUserCircle className="w-8 h-8" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Log
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

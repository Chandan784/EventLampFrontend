"use client";

import { useState, useEffect } from "react";
import VenueCard from "./components/VenueCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [venues, setVenues] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProfessional, setSelectedProfessional] = useState("All");
  const [selectedCapacity, setSelectedCapacity] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Fetch venues from the API
  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch("https://api.eventlamp.com/api/venues");
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    }

    fetchVenues();
  }, []);

  // Filter venues based on selected categories, filters, and search query
  const filteredVenues = venues.filter((venue) => {
    const isCategoryMatch =
      selectedCategory === "All" || venue.category === selectedCategory;
    const isProfessionalMatch =
      selectedProfessional === "All" ||
      venue.professional === selectedProfessional;
    const isCapacityMatch =
      selectedCapacity === "All" || venue.capacity === selectedCapacity;
    const isLocationMatch =
      selectedLocation === "All" || venue.location === selectedLocation;

    // Search filter
    const isSearchMatch =
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      isCategoryMatch &&
      isProfessionalMatch &&
      isCapacityMatch &&
      isLocationMatch &&
      isSearchMatch
    );
  });

  return (
    <div className="container mx-auto p-4">
      {/* Image Slider */}
      <div className="mb-8">
        <Slider {...sliderSettings}>
          {venues.slice(0, 5).map((venue) => (
            <div key={venue._id} className="relative w-full h-80 md:h-96">
              <img
                src={venue.image || "/fallback.jpg"}
                alt={venue.name}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                <h2 className="text-2xl font-bold">{venue.name}</h2>
                <p className="text-gray-300">{venue.location}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Sticky Search Bar and Filters Section */}
      <div className="sticky top-0 bg-white z-10 shadow-md">
        {/* Search Bar */}
        <div className="flex justify-center p-4 bg-white">
          <input
            type="text"
            placeholder="Search venues by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full max-w-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          />
        </div>

        {/* Filters - Horizontal Scroll */}
        <div className="flex overflow-x-auto gap-4 p-4 bg-gray-50">
          {/* Category Filter */}
          <div className="flex-shrink-0">
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white text-gray-700 text-sm md:text-base text-center appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-48"
            >
              <option value="All" disabled>
                Category
              </option>
              <option value="All">All</option>
              <option value="Mandap">Mandap</option>
              <option value="Hotel">Hotel</option>
              <option value="Private Plot">Private Plot</option>
            </select>
          </div>

          {/* Professional Look Filter */}
          <div className="flex-shrink-0">
            <select
              id="professional"
              value={selectedProfessional}
              onChange={(e) => setSelectedProfessional(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white text-gray-700 text-sm md:text-base text-center appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-48"
            >
              <option value="All" disabled>
                Professional Look
              </option>
              <option value="All">All</option>
              <option value="Wedding Planner">Wedding Planner</option>
              <option value="Event Manager">Event Manager</option>
              <option value="Caterer">Caterer</option>
              <option value="Stage Programer">Stage Programer</option>
              <option value="MNC" className="font-bold text-blue-600">
                MNC (Big Companies)
              </option>
            </select>
          </div>

          {/* Capacity Filter */}
          <div className="flex-shrink-0">
            <select
              id="capacity"
              value={selectedCapacity}
              onChange={(e) => setSelectedCapacity(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white text-gray-700 text-sm md:text-base text-center appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-48"
            >
              <option value="All" disabled>
                Capacity
              </option>
              <option value="All">All</option>
              <option value="Up to 100">Up to 100</option>
              <option value="100-500">100-500</option>
              <option value="500+">500+</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="flex-shrink-0">
            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white text-gray-700 text-sm md:text-base text-center appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-48"
            >
              <option value="All" disabled>
                Location
              </option>
              <option value="All">All</option>
              <option value="City Center">City Center</option>
              <option value="Suburbs">Suburbs</option>
              <option value="Outskirts">Outskirts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-center mt-8">
        Featured Venues
      </h1>

      {/* Venue Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues.map((venue) => (
          <VenueCard key={venue._id} venue={venue} />
        ))}
      </div>
    </div>
  );
}

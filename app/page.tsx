"use client"; // Required if using Next.js app directory to run code on client-side

import { Metadata } from "next";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getFeaturedListingAsync,
  selectFeaturedListing,
} from "@/lib/features/property/propertySlice";

// Components
import Home from "./home/page";
import Footer from "./components/Footer/Footer";
import FeaturesImageCarousel from "./components/FeatureCardsSwiper/FeaturesSwiper";
import SearchPanel from "./components/searchpanel/SearchPanel";
import StoriesGrid from "./components/StoriesGrid/StoriesGrid";
import ExploreProperties from "./components/ExploreProperties/ExploreProperties";

export default function IndexPage() {
  const dispatch = useAppDispatch();

  // Fetching featured listings from Redux store
  const rawFeaturedListingData = useAppSelector(selectFeaturedListing);
  const featuredListingData = Array.isArray(rawFeaturedListingData)
    ? rawFeaturedListingData
    : [];

  // Ref to track the first render and avoid redundant API calls
  const isInitialRender = useRef(true);

  // Fetch featured listings only once on the initial render
  useEffect(() => {
    if (isInitialRender.current) {
      dispatch(getFeaturedListingAsync());
      isInitialRender.current = false;
    }
  }, [dispatch]);

  // Location state management
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permission, setPermission] = useState<string | null>(null);

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      const status = await navigator.permissions.query({ name: "geolocation" });
      setPermission(status.state); // 'granted', 'denied', or 'prompt'
      status.onchange = () => setPermission(status.state); // Listen for changes
    } catch (err) {
      setError("Permission query not supported in this browser.");
    }
  };

  // Get location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log("LOCATION", latitude, longitude);
        setError(null);
      },
      (err) => {
        setError(`Failed to retrieve location: ${err.message}`);
      }
    );
  };

  useEffect(() => {
    requestLocationPermission();
    getLocation();
  }, []); // Runs on initial render to check permission state

  return (
    <>
      {/* Hero Section */}
      <div className="justify-center items-center h-[550px]">
        <div className="pt-[200px] flex flex-col justify-center items-center my-16">
          <h1 className="text-5xl font-bold text-blue-900 leading-tight">
            The Ultimate Technology Platform For Real Estate
          </h1>
          <p className="text-2xl text-gray-600 mt-4">
            Our cutting-edge digital platform empowers agents, builders, and
            developers to offer clients superior choices and make faster
            decisions.
          </p>
        </div>
        <SearchPanel />
      </div>

      {/* Stories Section */}
      <div className="mt-[160px]">
      <StoriesGrid />


      </div>
     
      {/* Featured Listings Carousel */}
      <div className="flex justify-center items-center mt-32 mb-32">
        <FeaturesImageCarousel featured={featuredListingData} />
      </div>

      {/* Explore Properties Section */}
      <div className="flex justify-center items-center">
        <ExploreProperties />
      </div>

      {/* Footer and Home Components */}
      <div>
        <Home />
        <Footer />
      </div>
    </>
  );
}

// Metadata for the page

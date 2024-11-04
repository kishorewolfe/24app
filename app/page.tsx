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

  const rawFeaturedListingData = useAppSelector(selectFeaturedListing);
  const featuredListingData = Array.isArray(rawFeaturedListingData)
    ? rawFeaturedListingData
    : [];

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      dispatch(getFeaturedListingAsync());
      isInitialRender.current = false;
    }
  }, [dispatch]);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permission, setPermission] = useState<string | null>(null);

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
      <div className="justify-center items-center h-[550px] sm:h-[400px] px-4">
        <div className="pt-[200px] sm:pt-[100px] flex flex-col justify-center items-center my-16">
          <h1 className="lg:text-5xl sm:text-3xl md:text-4xl font-bold text-blue-900 leading-tight text-center">
            The Ultimate Technology Platform For Real Estate
          </h1>
          <p className="text-2xl sm:text-lg text-gray-600 mt-4 text-center">
            Our cutting-edge digital platform empowers agents, builders, and
            developers to offer clients superior choices and make faster
            decisions.
          </p>
        </div>
        <SearchPanel />
      </div>

      {/* Stories Section */}
      <div className="mt-[160px] sm:mt-[80px] px-4">
        <StoriesGrid />
      </div>

      {/* Featured Listings Carousel */}
      <div className="flex justify-center items-center px-10">
        <FeaturesImageCarousel featured={featuredListingData} />
      </div>

      {/* Explore Properties Section */}
      <div className="flex justify-center items-center px-10">
        <ExploreProperties />
      </div>

      {/* Footer and Home Components */}
      <div className="px-4">
        <Home />
      
      </div>
    </>
  );
}

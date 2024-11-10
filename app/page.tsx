"use client";

import { Metadata } from "next";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getFeaturedListingAsync, selectFeaturedListing } from "@/lib/features/property/propertySlice";
import Home from "./home/page";
import Footer from "./components/Footer/Footer";
import FeaturesImageCarousel from "./components/FeatureCardsSwiper/FeaturesSwiper";
import SearchPanel from "./components/searchpanel/SearchPanel";
import StoriesGrid from "./components/StoriesGrid/StoriesGrid";
import ExploreProperties from "./components/ExploreProperties/ExploreProperties";
import Image from "next/image";

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const featuredListingData = useAppSelector(selectFeaturedListing) || [];
  const isInitialRender = useRef(true);

  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permission, setPermission] = useState<string | null>(null);

  // Fetch featured listings on first render
  useEffect(() => {
    if (isInitialRender.current) {
      dispatch(getFeaturedListingAsync());
      isInitialRender.current = false;
    }
  }, [dispatch]);

  // Request geolocation permission
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const status = await navigator.permissions.query({ name: "geolocation" });
        setPermission(status.state);
        status.onchange = () => setPermission(status.state);
      } catch {
        setError("Permission query not supported in this browser.");
      }
    };

    requestLocationPermission();
    getLocation();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        setError(null);
      },
      (err) => setError(`Failed to retrieve location: ${err.message}`)
    );
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative flex justify-center items-center h-[550px] sm:h-[400px] px-4 mt-[100px]">
        <Image
          src="/assets/BG/BGIMG.jpg"
          alt="IMG"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 pt-[200px] sm:pt-[100px] text-center text-white">
          <h1 className="lg:text-5xl sm:text-3xl md:text-4xl font-bold leading-tight">
            The Ultimate Technology Platform For Real Estate
          </h1>
          <p className="text-3xl sm:text-lg text-gray-100 mt-4">
            Our cutting-edge digital platform empowers agents, builders, and
            developers to offer clients superior choices and make faster
            decisions.
          </p>
        </div>
        <div className="absolute inset-0 bg-black opacity-25 z-0"></div>
      </div>

      <div className="mt-[-40px]">
        <SearchPanel />
      </div>

      <div className="mt-[160px] sm:mt-[80px] px-4">
        <StoriesGrid />
      </div>

      <div className="flex justify-center items-center px-10">
        <FeaturesImageCarousel featured={featuredListingData} />
      </div>

      <div className="flex justify-center items-center px-10">
        <ExploreProperties />
      </div>

      <div className="px-4">
        <Home />
      </div>
    </>
  );
}

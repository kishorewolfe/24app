"use client";
import type { Metadata } from "next";
import Home from "./home/page";
import HomePageHero from "./components/HomePageHero/HomePageHero";
import Footer from "./components/Footer/Footer";
import { Pagination, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import FeaturesImageCarousel from "./components/FeatureCardsSwiper/FeaturesSwiper";
import SearchPanel from "./components/searchpanel/SearchPanel";
import StoriesGrid from "./components/StoriesGrid/StoriesGrid";
import ExploreProperties from "./components/ExploreProperties/ExploreProperties";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getFeaturedListingAsync,
  selectFeaturedListing,
} from "@/lib/features/property/propertySlice";

interface Location {
  latitude: number;
  longitude: number;
}

export default function IndexPage() {
  const dispatch = useAppDispatch();
  let i =0;

  // Use selector to access the featured listings data from Redux
  let rawFeaturedListingData = useAppSelector(selectFeaturedListing);
  let featuredListingData = Array.isArray(rawFeaturedListingData)
    ? rawFeaturedListingData
    : [];


  // Use a ref to track initial render and prevent unnecessary re-runs
  const isInitialRender = useRef(true);

  // UseEffect to fetch data only on the first render
  useEffect(() => {
    console.log("i = " ,i++)
    dispatch(getFeaturedListingAsync())

    if (isInitialRender.current) {
      ; // Fetch data only once
      console.log("Fetched Featured Listing:", featuredListingData);
      isInitialRender.current = false; // Mark the first render as complete
    }
  }, []); // Only dispatch should be in the dependency array

 
  return (
    <>
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

      <div>
        <StoriesGrid />
      </div>

      <div className="flex justify-center items-center mt-32 mb-32">
        <FeaturesImageCarousel featured={featuredListingData} />
      </div>

      <div className="flex justify-center items-center">
        <ExploreProperties />
      </div>

      <div>
        <Home />
        <Footer />
      </div>
    </>
  );
}

// export const metadata: Metadata = {
//   title: "24 Hectors",
// };

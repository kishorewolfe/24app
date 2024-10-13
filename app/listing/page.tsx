"use client";
import {
  getuserLoginAsync,
  selectLoggedIn,
  selectUserId,
  selectUserJwt,
} from "@/lib/features/user/userDataSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { selectPropertyListing } from "@/lib/features/listing/ListingSlice";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getAllpropertiesListingAsync } from "@/lib/features/listing/ListingSlice";
import ListingLoading from "../components/ListingLoading/ListingLoading";
import { toast } from "react-toastify";
import { postforApprovalAsync } from "@/lib/features/approvals/ApprovalSlice";
import Image from "next/image";
import PropertyCard from "../components/Propertycard/Propertycard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const propertiesData = [
  // Sample Data - Replace with real API data
  {
    id: 1,
    title: "Karapakkam, OMR, Chennai",
    description: "Residential Land / Plot • 1,200 sqft",
    price: "₹88 Lac",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Whitecity Suja Flats, T Nagar",
    description: "2 BHK Flat • 949 sqft",
    price: "₹1.42 Cr",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Luxury Villa, ECR",
    description: "4 BHK Villa • 3,500 sqft",
    price: "₹3.5 Cr",
    image: "https://via.placeholder.com/150",
  },
  // Add more sample properties here...
];
const Login = () => {
  const handleChange = (event: any, value: React.SetStateAction<number>) => {
    setCurrentPage(value);
  };

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(2); // Number of cards per page

  const dispatch = useAppDispatch();
  const router = useRouter();

  // Redux selectors
  let userId = useAppSelector(selectUserId);
  let listingData = useAppSelector(selectPropertyListing) || []; // Fallback to empty array
  let jwtToken = useAppSelector(selectUserJwt);
  let isLoggedIn = useAppSelector(selectLoggedIn);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      dispatch(getAllpropertiesListingAsync({ jwt }));
    }
  }, [isLoggedIn, dispatch]);

  const requestInfoHandler = (data: any) => {
    const requestData = {
      requestedById: userId,
      owner_userId: data?.attributes?.createdby_usedid,
      usertype: data?.attributes?.posted_by,
      product_id: data?.id,
      jwt: jwtToken,
    };
    dispatch(postforApprovalAsync(requestData));
    toast.success("Request Submitted", data);
  };

  // Calculate the properties to display for the current page
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = listingData.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  return (
    <div style={{ marginTop: "200px" }} className="bg-slate-50">
      {isLoggedIn ? (
        <>
          <div className="container mx-auto p-5">
            <div className="flex">
              {/* Sidebar */}
              <aside className="w-1/4 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Budget
                  </label>
                  <input type="range" min="0" max="100" className="w-full" />
                </div>
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Type of User
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 text-left bg-gray-200 rounded hover:bg-gray-300">
                      Agent
                    </button>
                    <button className="w-full px-4 py-2 text-left bg-gray-200 rounded hover:bg-gray-300">
                      Builder
                    </button>
                    <button className="w-full px-4 py-2 text-left bg-gray-200 rounded hover:bg-gray-300">
                      Developer
                    </button>
                  </div>
                </div>
              </aside>

              {/* Property Listing Section */}
              <div className="w-3/4 ml-6 space-y-6">
                {currentProperties.map((item: any, i: any) => (
                  <PropertyCard key={i} property={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <Stack spacing={2} alignItems="center" className="mt-6">
            <Pagination
              count={Math.ceil(listingData.length / propertiesPerPage)}
              page={currentPage}
              onChange={handleChange}
              color="primary"
              size="large"
            />
          </Stack>
        </>
      ) : (
        <ListingLoading />
      )}
    </div>
  );
};

export default Login;

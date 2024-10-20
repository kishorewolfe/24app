"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getAllpropertiesListingAsync,
  selectPropertyListing,
} from "@/lib/features/listing/ListingSlice";
import {
  selectLoggedIn,
  selectUserId,
  selectUserJwt,
} from "@/lib/features/user/userDataSlice";
import ListingLoading from "../components/ListingLoading/ListingLoading";
import PropertyCard from "../components/Propertycard/Propertycard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const Login = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(4); // Number of cards per page
  const [selectedOption, setSelectedOption] = useState("");

  const dispatch = useAppDispatch();

  // Redux selectors
  const userId = useAppSelector(selectUserId);
  const jwtToken = useAppSelector(selectUserJwt);
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const rawListingData = useAppSelector(selectPropertyListing);
  const listingData = Array.isArray(rawListingData) ? rawListingData : [];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(listingData);

  // Handle search logic
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  // Update filtered data based on search term and original listing data
  useEffect(() => {
    const filtered = listingData.filter(
      (item) =>
        item?.attributes?.pin_code?.toLowerCase().includes(searchTerm) ||
        item?.attributes?.city?.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  }, [searchTerm, listingData]);

  // Fetch listing data on component mount or login state change
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      dispatch(getAllpropertiesListingAsync({ jwt }));
    }
  }, [isLoggedIn, dispatch]);

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredData.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handlePageChange = (event: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="bg-slate-50 min-h-screen mt-[120px]">
      <div className="container mx-auto max-w-7xl p-6">
        {/* Search Bar */}
       

        {isLoggedIn ? (
          <> <div className="flex justify-center gap-4 mb-6">
          <div className="w-full md:w-2/3 max-w-xl relative">
            <input
              type="text"
              placeholder="Search By City, Pincode"
              className="w-full h-16 px-8 pr-36 rounded-full bg-transparent border-2 border-gray-100 shadow-md focus:ring-orange-500 focus:border-orange-500 outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              type="submit"
              className="absolute right-4 top-3 h-10 px-4 text-sm text-white bg-blue-900 rounded-full hover:bg-orange-500"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
            {/* Filters Sidebar */}
            <aside className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  User Type
                </h3>
                <select
                  value={selectedOption}
                  onChange={handleSelectChange}
                  className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select User Type</option>
                  <option value="1">Agent</option>
                  <option value="2">Builder</option>
                  <option value="3">Developer</option>
                </select>
              </div>

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Both"
                />
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="Commercial"
                />
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="Residential"
                />
              </FormGroup>
              <button className="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mb-2">
                Submit
              </button>
            </aside>

            {/* Property Cards Grid */}
            <div className="bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 shadow">
              {currentProperties.map((item: any, i: number) => (
                <PropertyCard key={i} property={item} />
              ))}
            </div>
          </div>
                  {/* Pagination */}
        <Stack spacing={2} alignItems="center" className="mt-6">
          <Pagination
            count={Math.ceil(filteredData.length / propertiesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Stack>
        </>
         
        ) : (
          <ListingLoading />
        )}


      </div>
    </div>
  );
};

export default Login;

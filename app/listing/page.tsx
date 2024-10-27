"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getAllpropertiesListingAsync,
  getAllpropertiesListingForCityAsync,
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
import { useRouter, useSearchParams } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(4);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [homepagesearch, setHomepagesearch] = useState(false);

  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const jwtToken = useAppSelector(selectUserJwt);
  const rawListingData = useAppSelector(selectPropertyListing);
  const listingData = Array.isArray(rawListingData) ? rawListingData : [];

  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const district = searchParams.get("district");

  const search = searchParams.get("search");
  const jwt = localStorage.getItem("token");
  // Effect to detect search params and set homepage search state.
  useEffect(() => {
    if (district && search) {
      setHomepagesearch(true);
    } else {
      setHomepagesearch(false);
    }
  }, [district, search]);

  // Memoized filtering of listing data based on search term.
  const filteredData = useMemo(() => {
    if (!isLoggedIn) return listingData;


    return listingData.filter(
      (item) =>
        item?.attributes?.pin_code?.includes(searchTerm) ||
        item?.attributes?.district?.includes(searchTerm)
    );
  }, [listingData, searchTerm, isLoggedIn]);

  // Effect to fetch property listings when dependencies change.
  useEffect(() => {
    
    if (jwt) {
      if (district && search) {
        dispatch(getAllpropertiesListingForCityAsync({ jwt, district }));
      } else {
        dispatch(getAllpropertiesListingAsync({ jwt }));
      }
    }
  }, [isLoggedIn, district, search, dispatch]);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredData.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    
  };


  const handleSearchChange = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    dispatch(getAllpropertiesListingAsync({ jwt }));
    setHomepagesearch(false);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  const handleOriginalDispatch =()=>{
    dispatch(getAllpropertiesListingAsync({ jwt }));
    router.push(`/listing`); 
  }

  return (
    <div className="bg-slate-50 min-h-screen mt-[120px]">
      <div className="container mx-auto max-w-7xl p-6">
        {isLoggedIn ? (
          <>
        <div className="flex justify-center items-center px-4 sm:px-8 gap-4 mb-6">
  <form onSubmit={handleSearchChange} className="w-full">
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Search By District, Pincode"
        className="w-full h-14 sm:h-16 px-6 sm:px-8 pr-32 rounded-full 
                   bg-white border border-gray-300 shadow-md 
                   focus:ring-orange-500 focus:border-orange-500 
                   outline-none transition-all duration-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-4 top-2.5 sm:top-3 h-9 sm:h-10 
                   px-3 sm:px-4 text-sm text-white bg-blue-900 rounded-full 
                   hover:bg-orange-500 transition-colors duration-300"
      >
        <svg
          className="w-5 h-5"
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
  </form>
</div>


            {homepagesearch && (
              <>
                <h4 className="sm:text-sm md:inline-block lg:text-lg">Showing Search Results for : </h4>
                  {" "}
                <div className="text-slate-800 hover:text-blue-600 text-sm bg-slate-100 hover:bg-slate-100 border border-slate-200 rounded-2xl font-medium px-4 py-1 inline-flex space-x-1 items-center">
               
                  <span className="hidden md:inline-block text-lg">{district}</span>
                  <button onClick={handleOriginalDispatch}>
                  <span>
                    <svg
                      className="w-[24px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <circle
                          opacity="0.5"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#ff6666"
                          stroke-width="1.5"
                        ></circle>{" "}
                        <path
                          d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                          stroke="#ff6666"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>

                  </button>
                 
                </div>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
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
                  <FormControlLabel control={<Checkbox />} label="Commercial" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Residential"
                  />
                </FormGroup>
                <button className="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mb-2">
                  Submit
                </button>
              </aside>

              <div className="bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 shadow">
                {currentProperties.length > 0 ? (
                  currentProperties.map((item, i) => (
                    <PropertyCard key={i} property={item} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-lg font-semibold text-gray-600">
                      Can't find any results. Try adjusting your filters or
                      search criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>

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

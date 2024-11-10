"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import axios from "axios";
import Image from "next/image";
import { locationData } from "../Location/Locationdata";

interface LocationData {
  state: string;
  districts: string[];
}
const SearchPanel = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsVisible, setSuggestionsVisible] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [districts, setDistricts] = useState<string[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value.trim()) {
      setSuggestionsVisible(true);
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
      setSuggestionsVisible(false);
    }
  };

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get<string[]>(`/api/districts?search=${encodeURIComponent(query)}&search=true`);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching district suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchInput(suggestion);
    setSuggestionsVisible(false);
    router.push(`/listing?district=${encodeURIComponent(suggestion)}`);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(selectedDistrict && selectedState && searchInput.trim()){
      router.push(`/listing?state=${encodeURIComponent(selectedState)}&district=${encodeURIComponent(selectedDistrict)}&search=true`);
    }
    else if (searchInput.trim()) {
      router.push(`/listing?district=${encodeURIComponent(searchInput.trim())}&search=true`);
    }
  };

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedState(selected);
    const stateData = locationData.find((location) => location.state === selected);
    setDistricts(stateData ? stateData.districts : []);
  };

  
  const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedDistrict(selected);
  };




  return (
    <div> 
      <div className="flex justify-center items-center px-4 sm:px-8 gap-4 mb-6">
        <form 
          onSubmit={handleSearchSubmit} 
          className="flex flex-col items-center w-full"
        >
          <div className="w-full max-w-7xl relative">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search By District"
              className="w-full h-24 px-6 text-2xl pr-40 rounded-full bg-white border-2 border-gray-300 shadow-md focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-300"
            />

            {isSuggestionsVisible && suggestions.length > 0 && (
              <div className="absolute w-full max-w-7xl bg-white border border-gray-200 rounded-md shadow-lg mt-2">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="cursor-pointer p-3 hover:bg-gray-100"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}

            <div className="absolute flex items-center gap-6 right-24 top-8 sm:top-6">
              {/* State Dropdown */}
              <div className="relative h-14 flex items-center">
                <div className="absolute left-0 pl-2 flex items-center">
                  <svg width="35px" height="35px" fill="#FE820C" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 395.71 395.71">
                    <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path>
                  </svg>
                </div>
                <select
                  className="appearance-none bg-transparent text-gray-700 text-xl pl-12 py-3 focus:outline-none"
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <option value="" disabled>Select State</option>
                  {locationData.map((location) => (
                    <option key={location.state} value={location.state}>
                      {location.state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="border-l border-gray-300 h-12 mx-4"></div>

              {/* District Dropdown */}
              <div className="relative h-14 flex items-center">
                <select
                  className="appearance-none bg-transparent text-gray-700 text-xl  py-3 focus:outline-none"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                
                >
                  <option value="" >Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="absolute right-4 top-4 h-16 px-6 text-md text-white bg-blue-900 rounded-full hover:bg-orange-500 transition-colors duration-300">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchPanel;

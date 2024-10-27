"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const SearchPanel = () => {

  const [searchInput, setSearchInput] = useState("");
  const router = useRouter(); // Initialize the router

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value); // Update search input value
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    if (searchInput.trim()) {
      router.push(`/listing?district=${encodeURIComponent(searchInput.trim())}&search=true`); // Navigate to the search results page
    }
  };

  return (
    <div> 
<div className="flex justify-center items-center px-4 sm:px-8 gap-4 mb-6">
  <form 
    onSubmit={handleSearchSubmit} 
    className="flex flex-col items-center w-full"
  >
    <div className="w-full max-w-4xl relative">
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search By City, Pincode"
        className="w-full h-14 sm:h-16 px-6 sm:px-8 pr-32 
                   rounded-full bg-white border-2 border-gray-300 
                   shadow-md focus:ring-orange-500 focus:border-orange-500 
                   outline-none transition duration-300"
      />
      <button
        type="submit"
        className="absolute right-4 top-2.5 sm:top-3 h-9 sm:h-10 
                   px-4 text-sm text-white bg-blue-900 rounded-full 
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

  </div>
  )
}

export default SearchPanel

import React from 'react'

type Props = {}

const SearchPanel = (props: Props) => {
  return (
    <div> <div className="flex justify-center gap-4 mb-6">
    <div className="w-full md:w-2/3 max-w-4xl relative">
      <input
        type="text"
        placeholder="Search By City, Pincode"
        className="w-full h-16 px-8 pr-36 rounded-full bg-transparent border-2 border-gray-100 shadow-md focus:ring-orange-500 focus:border-orange-500 outline-none"
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
  </div></div>
  )
}

export default SearchPanel
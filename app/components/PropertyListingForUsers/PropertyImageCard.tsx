import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "./Loader";

type Props = {};

const PropertyImageCard = ({ imageProperties }: any): any => {
  const [isLoading, setIsLoading] = useState(true);
  const Dataimage = imageProperties?.images;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400); // Loader for 1.4 seconds
    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="border-b mb-5 flex justify-between text-sm">
        <div className="text-orange-500 flex items-center pb-2 pr-2 border-b-2 border-blue-800 uppercase">
          <svg
            className="h-6 mr-3"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 455.005 455.005"
          >
            {/* SVG path omitted for brevity */}
          </svg>
          <a href="#" className="font-semibold inline-block">
            Property Images
          </a>
        </div>
        <a href="#">24 Hectares</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10">
        {Dataimage?.map((item: any) => {
          const imgUrl = `${process.env.NEXT_PUBLIC_API_URL}${item.url}`;
          const imgId = item?.id;
          const name = item?.name;
          const createdAt = item?.createdAt;

          return (
            <div key={imgId} className="rounded overflow-hidden shadow-lg flex flex-col">
              <div className="relative">
                <a href="#">
                  <img className="w-full" src={imgUrl} alt={name} />
                  <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                </a>
              </div>
              <div className="px-6 py-4 mb-auto">
                <a
                  href="#"
                  className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
                >
                  Image Id {imgId}
                </a>
                <p className="text-gray-500 text-sm">Image Name: {name}</p>
                <p className="text-gray-500 text-sm">Created At: {createdAt}</p>
                <div className="mt-4 flex gap-4">
                  <a
                    className="px-6 py-2 min-w-[120px] text-center text-white bg-red-500 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
                    href="/download"
                  >
                    Delete
                  </a>
                  <a
                    className="px-6 py-2 min-w-[120px] text-center bg-slate-100 text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
                    href="/download"
                  >
                    Update
                  </a>
                </div>
              </div>
              <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <Link href={imgUrl} target="_blank" rel="noopener noreferrer">
                  <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                    <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      ></path>
                    </svg>
                    <span className="ml-1">Click Here To view in Full Size</span>
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyImageCard;

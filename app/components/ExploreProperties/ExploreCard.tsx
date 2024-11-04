import React from "react";
import EachExploreCard from "./EachExploreCard";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

const ExploreCard = ({ card }: any) => {
  const router = useRouter();
  const routeHandler = (plot: any, residential: any) => {
    router.push(`/listing?property=${plot}&type=${residential}&search=true`);
  };
  return (
    <>
      <div>
        <div className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg ">
          <div className="relative">
            <Image
              className="relative h-64 w-full flex items-end justify-start text-left bg-cover bg-center"
              src={card.imgsrc}
              alt="Product Image"
              width={340}
              height={230}
            />
            <div className="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
              Popular
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">{card.property}</h3>
            <h3 className="text-lg font-medium mb-2">{card.type}</h3>
            <p className="text-gray-600 text-sm mb-4">Tamil Nadu</p>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-900 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded "
                onClick={(e) => routeHandler(card?.property, card?.type)}
              >
                See More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreCard;

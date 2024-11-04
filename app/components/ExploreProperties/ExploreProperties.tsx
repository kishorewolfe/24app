// CardSlider.tsx
import React from "react";
import Slider from "react-slick";
import FeaturedCard from "../FeatureCardsSwiper/FeaturedCard";
import ExploreCard from "./ExploreCard";

// Define the CardSlider component
const ExploreProperties: React.FC = () => {

  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 4,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  let cards = [
    {id:1,imgsrc:"/assets/explore/plot1.jpg",property:"Plot" ,type:"Residential"},
    {id:2,imgsrc:"/assets/explore/plo2.jpg",property:"Plot" , type:"Commercial"},
    {id:3,imgsrc:"/assets/explore/plot3.png",property:"House",type:"Residential"},
    {id:4,imgsrc:"/assets/explore/plot4.png",property:"Flat",type:"Residential"},
]

  return (
    <div className="card-slider">
      <h1 className=" ml-[10px] justify-start items-start flex text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-blue-900  dark:text-gray-200">
        <span className="text-orange-500">
          {" "}
          Explore Popular Localities in Chennai
        </span>
      </h1>

      <div className="grid grid-cols-4">
        
        <div className="col-span-4 gap-2">
          <Slider {...settings}>
            {cards.map((card, index) => (
              <ExploreCard card={card} key={index} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ExploreProperties;

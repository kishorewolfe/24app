// CardSlider.tsx
import React from "react";
import Slider from "react-slick";
import FeaturedCard from "../FeatureCardsSwiper/FeaturedCard";
import ExploreCard from "./ExploreCard";

// Define the CardSlider component
const ExploreProperties: React.FC = () => {
  // Sample product data
  const products = [
    {
        title: "2000 Sq.Ft",
      image:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3609497/blanca-paloma-sanchez-500x500.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      newPrice: "$4.49",
      originalPrice: "$10.00",
      rating: 3,
      reviewsCount: 77,
      sale: true,
      link: "https://accessible360.com",
    },
    {
      title: "Second product title",
      image:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3609497/erol-ahmed-500x500.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur.",
      newPrice: "$19.99",
      rating: 4,
      reviewsCount: 30,
      link: "https://accessible360.com",
    },
    {
      title: "Third product title",
      image:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3609497/armando-castillejo-500x500.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      newPrice: "$12.99",
      originalPrice: "$15.99",
      rating: 2,
      reviewsCount: 0,
      sale: true,
      link: "https://accessible360.com",
    },
    {
      title: "Fourth product title",
      image:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3609497/calle-macarone-500x500.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur.",
      newPrice: "$9.99",
      rating: 5,
      reviewsCount: 7,
      link: "https://accessible360.com",
    },
    {
      title: "Fifth Product title",
      image:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3609497/galina-n-300x300.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      newPrice: "$0.99",
      rating: 5,
      reviewsCount: 9,
      link: "https://accessible360.com",
    },
  ];

  // Slider settings
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
    {id:1,imgsrc:"/assets/explore/cmbt.png",city:"CMBT"},
    {id:2,imgsrc:"/assets/explore/annanagar.jpg",city:"Anna Nagar"},
    {id:3,imgsrc:"/assets/explore/tambaram.jpeg",city:"Tambaram"},
    {id:4,imgsrc:"/assets/explore/vadapalani.jpg",city:"Vadapalani"},
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
        
        <div className="col-span-4">
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

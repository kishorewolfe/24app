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
    slidesToShow: 3,
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
        <div className="col-span-1">
          <div className="relative w-full max-w-2xl my-8 md:my-16 flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg">
            <span className="absolute text-xs font-medium top-0 left-0 rounded-br-lg rounded-tl-lg px-2 py-1 bg-primary-100 dark:bg-gray-900 dark:text-gray-300 border-gray-400 dark:border-gray-400 border-b-2 border-r-2 border-dashed ">
              24 Hectares
            </span>

            <div className="w-full sm:w-auto flex flex-col items-center sm:items-start">
              <p className="font-display mb-2 text-2xl font-semibold dark:text-gray-200">
                Popular properties
              </p>

              <div className="mb-4 md:text-lg text-gray-400">
                <p>Commercial and Residential Land/Property</p>
              </div>

              <div className="flex gap-4">
                <a
                  title="youtube url"
                  href="https://www.youtube.com/@mcqmate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="h-6 w-6 dark:text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.5949 4.45999C21.5421 4.71353 22.2865 5.45785 22.54 6.40501C22.9982 8.12001 23 11.7004 23 11.7004C23 11.7004 23 15.2807 22.54 16.9957C22.2865 17.9429 21.5421 18.6872 20.5949 18.9407C18.88 19.4007 12 19.4007 12 19.4007C12 19.4007 5.12001 19.4007 3.405 18.9407C2.45785 18.6872 1.71353 17.9429 1.45999 16.9957C1 15.2807 1 11.7004 1 11.7004C1 11.7004 1 8.12001 1.45999 6.40501C1.71353 5.45785 2.45785 4.71353 3.405 4.45999C5.12001 4 12 4 12 4C12 4 18.88 4 20.5949 4.45999ZM15.5134 11.7007L9.79788 15.0003V8.40101L15.5134 11.7007Z"
                      stroke="currentColor"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </a>

                <a
                  title="website url"
                  href="https://mcqmate.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="h-6 w-6 dark:text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <Slider {...settings}>
            {cards.map((card, index) => (
              <ExploreCard card={card} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ExploreProperties;

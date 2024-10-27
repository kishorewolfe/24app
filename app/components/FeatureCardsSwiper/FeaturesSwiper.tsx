// CardSlider.tsx
import React from "react";
import Slider from "react-slick";
import FeaturedCard from "./FeaturedCard";
interface FeaturesImageCarouselProps {
  featured: any; // Replace `any` with the actual type if available (e.g., array or object type)
}

// Define the CardSlider component
const CardSlider: React.FC<FeaturesImageCarouselProps> = ({featured}:any):any => {


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

  return (
    <div className="card-slider">
          <h1 className=" ml-[10px] justify-start items-start flex text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-blue-900  dark:text-gray-200">
   <span className="text-orange-500"> Featured Properties</span>
</h1>
      <Slider {...settings}>
        {featured.map((product: any , i:any ) => (
          <FeaturedCard product={product} key={i}/>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;

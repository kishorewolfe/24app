// Import Swiper React components
import Image from "next/image";
// Import Swiper styles
import { useRef } from "react";
import "./Property.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// import required modules
const PropertySwiper = ({ carouselImg }: any) => {
  return (
    <>
      <div className="flex">
        <div className="columns-1 md:columns-2 xl:columns-3 gap-7 ">
          {carouselImg?.map((img: any) => {
            let imgURLforSlider = img.attributes?.formats?.large?.url;
            let altText = img.attributes?.name;

            let imgUrl = `${process.env.NEXT_PUBLIC_API_URL}${imgURLforSlider}`;
            console.log("EachImg", imgUrl);

            return (
              <div className=" break-inside-avoid mb-8">
                <Image
                  className="h-auto max-w-full rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={imgUrl}
                  alt={altText}
                  width={800}
                  height={800}
                  priority
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default PropertySwiper;

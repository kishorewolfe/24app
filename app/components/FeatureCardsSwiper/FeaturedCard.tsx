import { selectLoggedIn } from "@/lib/features/user/userDataSlice";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import Image from "next/image";
const FeaturedCard = ({ product }: any): any => {
  const router = useRouter();

  let imgURLforSlider =
    product?.property_image[0].formats.thumbnail.url;

  let imgUrl = `${process.env.NEXT_PUBLIC_API_URL}${imgURLforSlider}`;
  let isLoggedIn = useAppSelector(selectLoggedIn);

  //[0].district
//[0]
  const redirectHandler = (district: any) => {
    // if(!isLoggedIn){
    //   toast.info("Please Login To View ")
    //   router.push("/login")
    // }
    // else{
    //   router.push(`/listing?district=${district}&search=true`)
    // }
    router.push(`/listing?district=${district}&search=true`);
  };

  return (
    <>
      <div className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg ">
        <div className="relative">
          <Image
            className="relative h-64 w-full flex items-end justify-start text-left bg-cover bg-center"
            src={imgUrl}
            alt="Product Image"
            width={340}
            height={230}
          />
          <div className="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
            Featured
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2">
            {" "}
            {product?.city}
          </h3>
          <h3 className="text-lg font-medium mb-2">{product?.description}</h3>
          <p className="text-gray-600 text-sm mb-4">
            {" "}
            {product?.property_type}
          </p>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-900 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded "
              onClick={(e) => redirectHandler(product?.district)}
            >
              See More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedCard;

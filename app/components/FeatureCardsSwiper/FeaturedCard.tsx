import { selectLoggedIn } from "@/lib/features/user/userDataSlice";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";



const FeaturedCard = ({ product }: any): any => {
  const router = useRouter();

  let imgURLforSlider =
    product?.attributes?.property_image?.data[0]?.attributes?.url;

  let imgUrl = `${process.env.NEXT_PUBLIC_API_URL}${imgURLforSlider}`;
  let isLoggedIn = useAppSelector(selectLoggedIn);

  const redirectHandler =(district:any)=>{
    if(!isLoggedIn){
      toast.info("Please Login To View ")
      router.push("/login")
    }
    else{
      router.push(`/listing?district=${district}&search=true`)
    }

  }


  return (
    <div>
      <div className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg bg-white shadow">
        <div className="relative">
          <img className="w-full" src={imgUrl} alt="Product Image" />
          <div className="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
            Featured
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2">
            {product?.attributes?.city}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{product?.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">
              {product?.attributes?.property_type}{" "}
            </span>
            <button className="bg-blue-900 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded" onClick={(e)=>redirectHandler(product?.attributes?.city)}>
              Request Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;

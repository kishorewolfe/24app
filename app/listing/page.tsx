"use client";
import {
  getuserLoginAsync,
  selectLoggedIn,
  selectUserId,
  selectUserJwt,
} from "@/lib/features/user/userDataSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { selectPropertyListing } from "@/lib/features/listing/ListingSlice";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getAllpropertiesListingAsync } from "@/lib/features/listing/ListingSlice";
import ListingLoading from "../components/ListingLoading/ListingLoading";
import { toast } from "react-toastify";
import { postforApprovalAsync } from "@/lib/features/approvals/ApprovalSlice";

type Props = {};

const Login = (props: Props) => {
  const [listing, setListing] = useState();
  const dispatch = useAppDispatch();
  const router = useRouter();
  let userId = useAppSelector(selectUserId)


  let listingData = useAppSelector(selectPropertyListing);
  let jwtToken = useAppSelector(selectUserJwt)

  let isLoggedIn = useAppSelector(selectLoggedIn);
  useEffect(() => {
    let jwt = localStorage.getItem("token");

    dispatch(getAllpropertiesListingAsync({ jwt }));
  }, [isLoggedIn]);

  const [loading, setLoading] = useState(false);


  const requestInfoHandler =(data:any) =>{
    let requestData = {
      requestedById:userId,
      owner_userId:data?.attributes?.createdby_usedid,
      usertype:data?.attributes?.posted_by,
      product_id:data?.id,
      jwt:jwtToken
    
    }
    dispatch(postforApprovalAsync(requestData))
    toast.success("Request Submitted",data);
  }

  return (

    <div style={{marginTop:"100px"}} >
    {isLoggedIn === true ?
      (listingData?.map((item: any) => {
       
      let src = item?.attributes?.property_image?.data[0]?.attributes?.url;
      return (
        <div className="mt-12">
          <article className="mx-2 my-10 max-w-screen-lg rounded-md border border-gray-100 text-gray-700 shadow-md md:mx-auto">
            <div className="flex flex-col md:flex-row">
              <div className="p-5 md:w-4/6 md:p-8">
                <span className="rounded-md bg-orange-400 px-2 py-1 text-xs uppercase text-white">
                  Member only
                </span>
                <p className="mt-1 text-md font-black md:mt-6 md:text-md">
                  Posted By : {item?.attributes?.posted_by}
                </p>
                <p className="mt-1 text-md font-black md:mt-6 md:text-md">
                Owner Name : {item?.attributes?.owner_name}
                </p>
                <p className="mt-1 text-gray-600">
                City:  {item?.attributes?.city} .
                </p>
                <p className="mt-1 text-gray-600">
                State:  {item?.attributes?.state} .
                </p>
                <button onClick={(e)=>requestInfoHandler(item)} className="mt-4 mr-2 flex items-center justify-center rounded-md bg-sky-900 px-8 py-2 text-center text-white duration-150 md:mb-4 hover:translate-y-1 hover:bg-orange-800">
                  Request Info
                </button>
              </div>
              <div className="mx-auto hidden items-center px-5 md:flex md:p-8">
                <img
                  className="rounded-md shadow-lg"
                  src={src}
                  alt="Shop image"
                  width={180}
                  height={280}
                />
              </div>
            </div>
          </article>
        </div>
      );
    })) : (<ListingLoading/>)}
     
    </div>
  );
};

export default Login;

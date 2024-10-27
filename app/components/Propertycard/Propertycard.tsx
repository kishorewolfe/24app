"use client";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectEmailId,
  selectLoggedIn,
  selectUserId,
  selectUserJwt,
  selectUserType,
} from "@/lib/features/user/userDataSlice";
import { postforApprovalAsync } from "@/lib/features/approvals/ApprovalSlice";
import { toast } from "react-toastify";
import PropertySwiper from "./PropertySwiper";

interface Property {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
}

interface PropertyCardProps {
  property: Property;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 1200,
  bgcolor: "background.paper",
  border: "2px solid #FF830E",
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
};

const PropertyCard = (item: any): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isLoggedIn = useAppSelector(selectLoggedIn);
  const userId = useAppSelector(selectUserId);
  const requestedEmailId = useAppSelector(selectEmailId);
  const userType = useAppSelector(selectUserType);

  const { property } = item;
  const dispatch = useAppDispatch();
  const jwtToken = useAppSelector(selectUserJwt);

  const thumbnailSrc =
    property?.attributes?.property_image?.data[0]?.attributes?.formats?.thumbnail?.url;
  const imgUrl = `${process.env.NEXT_PUBLIC_API_URL}${thumbnailSrc}`;
  const owner = property?.attributes?.owner_name;
  const city = property?.attributes?.city;
  const district = property?.attributes?.district;
  const state = property?.attributes?.state;
  const postedBy = property?.attributes?.posted_by;
  const pinCode = property?.attributes?.pin_code;
  console.log("district",district)

  const carouselImg = property?.attributes?.property_image?.data;
  const isButtonDisabled = !carouselImg || carouselImg.length < 2;

  const requestInfoHandler = () => {
    const requestData = {
      requestedById: userId,
      owner_userId: property?.attributes?.createdby_usedid,
      usertype: property?.attributes?.posted_by,
      product_id: property?.id,
      requestedByEmailId: requestedEmailId,
      jwt: jwtToken,
    };
    dispatch(postforApprovalAsync(requestData));
    toast.success("Request Submitted");
  };

  return (
    <>
      {/* Modal for Gallery */}
      <Modal open={open} onClose={handleClose} className="z-50">
        <Box sx={style}>
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 underline decoration-orange-500 text-center">
              Images posted by {userType}
            </h1>
            <PropertySwiper carouselImg={carouselImg} />
          </div>
        </Box>
      </Modal>

      {/* Property Card */}
      <div className="border border-gray-200 rounded-lg shadow-lg p-5 hover:shadow-xl transition w-full sm:w-[300px] mx-auto">
        <span className="mb-2 inline-block rounded-md bg-orange-500 px-3 py-1 text-xs uppercase text-white">
          Member only
        </span>

        {/* Image Section */}
        <div className="h-[200px] w-full overflow-hidden rounded-md mb-4">
          <Image
            src={imgUrl}
            alt={owner}
            width={300}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Property Details */}
        <div className="space-y-3">
          <div className="border-y border-gray-300 py-2">
            <p className="text-sm text-gray-500">Posted by</p>
            <a href="#" className="font-semibold text-black hover:text-blue-600">
              {postedBy}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 1024 1024"
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M512 1012.8c-..." />
            </svg>
            <p className="text-sm font-semibold text-gray-600">
              {district}, {state}, {pinCode}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={requestInfoHandler}
            >
              Contact
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleOpen}
              disabled={isButtonDisabled}
              className={isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}
            >
              View Gallery
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;

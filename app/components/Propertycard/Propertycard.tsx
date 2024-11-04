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
  const emailID = useAppSelector(selectEmailId);

  const [open, setOpen] = useState(false);
  const handleOpen = () =>{
    
    setOpen(true);
    

  }
  const handleClose = () => setOpen(false);

  const isLoggedIn = useAppSelector(selectLoggedIn);
  const userId = useAppSelector(selectUserId);
  const requestedEmailId = useAppSelector(selectEmailId);
  const userType = useAppSelector(selectUserType);

  const { property } = item;
  let property_id = property.id
  const dispatch = useAppDispatch();
  const jwtToken = useAppSelector(selectUserJwt);
  
  const thumbnailSrc =
    property?.property_image[0]?.formats?.thumbnail?.url;
  const imgUrl = `${process.env.NEXT_PUBLIC_API_URL}${thumbnailSrc}`;
  const owner = property?.owner_name;
  const city = property?.city;
  const district = property?.district;

  const state = property?.state;
  const postedBy = property?.posted_by;
  const pinCode = property?.pin_code;
  const area = property?.area;


  const carouselImg = property?.property_image?.data;
  const isButtonDisabled = !carouselImg || carouselImg.length < 2;



  const requestInfoHandler = () => {
    const requestData = {
      requestedById: userId,
      owner_userId: property?.createdby_usedid,
      usertype: property?.posted_by,
      product_id: property?.id,
      requestedByEmailId: requestedEmailId,
      jwt: jwtToken,
    };
    dispatch(postforApprovalAsync(requestData));
    toast.success("Request Submitted");
  };










  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [to, setTo] = useState(requestedEmailId);
  const [subject, setSubject] = useState("24 Hectares Property Details | Basic Plan ");
  const [html, setHtml] = useState('');
  


  const handleSubmit = async (e: { preventDefault: () => void; }) => {

    e.preventDefault();
   if(isLoggedIn){




    const response = await fetch('https://api.24hectares.com/api/email/send', { // Adjust the URL if needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ to, subject, html ,property_id}),
    });

    const data = await response.json();
    
    if (response.ok) {
      setMessage('Email sent successfully!');
      toast.success("Email sent successfully!");
    } else {
      setMessage(`Error sending email: ${data.message}`);
    }

   }
   else{
    toast.warn("Please Login To Request ")
    
   }


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
             
            </svg>
            <p className="text-sm font-semibold text-gray-600">
              {area},{district}, {state}, {pinCode}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={(e)=>handleSubmit(e)}
            >
              Request Details
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

'use client'
import Image from 'next/image';
import Modal from '@mui/material/Modal';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectLoggedIn, selectUserId, selectUserJwt } from '@/lib/features/user/userDataSlice';
import { postforApprovalAsync } from '@/lib/features/approvals/ApprovalSlice';
import { toast } from 'react-toastify';
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
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  
  const PropertyCard = (item:any):any => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let isLoggedIn = useAppSelector(selectLoggedIn);
    let userId = useAppSelector(selectUserId);


    const  {property , id } = item

    console.log("any" ,  property?.attributes)
    const dispatch = useAppDispatch();
    let jwtToken = useAppSelector(selectUserJwt);

    let thumbnailSrc = property?.attributes?.property_image?.data[0]?.attributes?.formats
    ?.thumbnail?.url    
    let imgUrl = `${process.env.NEXT_PUBLIC_API_URL}${thumbnailSrc}`
    let owner = property?.attributes?.owner_name
   let city = property?.attributes?.city
   let state = property?.attributes?.state
  let postedBy = property?.attributes?.posted_by
  let pinCode =  property?.attributes?.pin_code

  const requestInfoHandler = (data: any) => {
    const requestData = {
      requestedById: userId,
      owner_userId: property?.attributes?.createdby_usedid,
      usertype: property?.attributes?.posted_by,
      product_id: property?.id,
      jwt: jwtToken,
    };
    console.log(requestData)
    dispatch(postforApprovalAsync(requestData));
    toast.success("Request Submitted", data);
  };
    

  return (<>  

    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
        <h1>Hi all</h1>
    </Box>
  </Modal>
    <div className="bg-white p-4 rounded-lg shadow-md flex">
      <img
        src={imgUrl}
        alt={owner}
        width={250}
        height={180}
        className="rounded-md object-cover"
      />
      <div className="ml-4 flex-grow">
      <span className="rounded-md bg-orange-400 px-2 py-1 text-xs uppercase text-white">
                  Member only
                </span>
        <h3 className="text-xl font-semibold">Posed By : {postedBy}</h3>
        {/* <p className="text-sm text-gray-600">{postedBy}</p> */}
        <p className="text-lg font-semibold mt-2 mb-2">{pinCode}</p>
        <p className="text-lg font-semibold mt-2  mb-2">{city},{state}</p>
        <button className="mt-4 px-4 py-2 bg-[#9EB5C8] text-white rounded hover:bg-blue-900" onClick={()=>requestInfoHandler(property)}>
          Contact
        </button>
        <Button onClick={handleOpen}>Open modal</Button>
      </div>
    </div> </>
  );
};

export default PropertyCard;

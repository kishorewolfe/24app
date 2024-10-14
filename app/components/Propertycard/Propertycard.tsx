'use client'
import Image from 'next/image';
import Modal from '@mui/material/Modal';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectEmailId, selectLoggedIn, selectUserId, selectUserJwt, selectUserType } from '@/lib/features/user/userDataSlice';
import { postforApprovalAsync } from '@/lib/features/approvals/ApprovalSlice';
import { toast } from 'react-toastify';
import useEmblaCarousel from 'embla-carousel-react';
import PropertySwiper from './PropertySwiper';
import { BorderAll } from '@mui/icons-material';
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
    width: 1200,
    bgcolor: 'background.paper',
    border: '2px solid #FF830E',
    boxShadow: 24,
    p: 4,
    borderRadius: 10, // Add rounded corners
  };
  
  
  const PropertyCard = (item:any):any => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let isLoggedIn = useAppSelector(selectLoggedIn);
    let userId = useAppSelector(selectUserId);
    let requestedEmailId = useAppSelector(selectEmailId)
    let userType = useAppSelector(selectUserType)

    const [emblaRef] = useEmblaCarousel()

    const  {property , id } = item

    console.log("any" ,  property?.attributes)
    const dispatch = useAppDispatch();
    let jwtToken = useAppSelector(selectUserJwt);
    let imageList: any[] = []

    let thumbnailSrc = property?.attributes?.property_image?.data[0]?.attributes?.formats
    ?.thumbnail?.url    
    let imgUrl = `${process.env.NEXT_PUBLIC_API_URL}${thumbnailSrc}`
    let owner = property?.attributes?.owner_name
   let city = property?.attributes?.city
   let state = property?.attributes?.state
  let postedBy = property?.attributes?.posted_by
  let pinCode =  property?.attributes?.pin_code

  const [modal ,setModal ] = useState(false)

  // const imageHandler = ()=>{
  //   property?.attributes?.property_image?.map((img: { attributes: any; })=>{
  //     imageList.push(img.attributes)

  //   })
  //   console.log("imageHandler" , imageList)
  // }
  // property?.attributes?.property_image?.map((img: { attributes: any; })=>{
  //   console.log("imageHandler" , img)

  // })
  const carouselImg = property?.attributes?.property_image?.data;

  // Check if the button should be disabled
  const isButtonDisabled = !carouselImg || carouselImg.length < 2;

  const requestInfoHandler = (data: any) => {
    const requestData = {
      requestedById: userId,
      owner_userId: property?.attributes?.createdby_usedid,
      usertype: property?.attributes?.posted_by,
      product_id: property?.id,
      requestedByEmailId:requestedEmailId,
      jwt: jwtToken,
    };
    console.log(requestData)
    dispatch(postforApprovalAsync(requestData));
    toast.success("Request Submitted", data);
  };

  useEffect(()=>{
    

  },[])
    

  return (<>  

    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
   
  >
    <Box sx={style}>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px' }}>
      {/* Modern Living Room */}
      <div>
      <div className="flex flex-col justify-center items-center my-16">
      <h1 className="text-5xl font-bold text-blue-900 leading-tight underline decoration-orange-500">Images posted by the {userType}</h1>
      </div>
            <PropertySwiper carouselImg = {carouselImg}/>
      </div>


    </div>
        </Box>
      </Modal>
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
        <button className="mt-4 mr-4 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-950" onClick={()=>requestInfoHandler(property)}>
          Contact
        </button>
        <Button onClick={handleOpen}
         disabled={isButtonDisabled} 
         className={` btn ${isButtonDisabled ? 'btn-disabled' : ''}`}
         variant='outlined'
        
        >View Gallery</Button>
      </div>
    </div> </>
  );
};

export default PropertyCard;

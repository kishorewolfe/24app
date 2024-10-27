import { listingPostAsync } from "@/lib/features/listing/ListingSlice";
import {
  selectUserId,
  selectUserJwt,
  selectUserType,
} from "@/lib/features/user/userDataSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { locationData } from "../Location/Locationdata";

type Props = {};

const ProfileTabFormOne = (props: Props) => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [districts, setDistricts] = useState<string[]>([]);

  // Handle state selection
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value;
    setSelectedState(state);

    // Find the selected state's districts
    const selectedStateData = locationData.find((item) => item.state === state);
    setDistricts(selectedStateData?.districts || []);
  };
  const [jwtData, setJwtData] = useState("");
  const [image, setImage] = useState(null);
  const [docu, setDocu] = useState(null);

  const [tokenVerify, setTokenVerify] = useState(false);
  let jwt = useAppSelector(selectUserJwt);
  let userId = useAppSelector(selectUserId);
  let userType = useAppSelector(selectUserType);
  let dispatch = useAppDispatch();
  const formDataObj = new FormData();
  const formDocDataObj = new FormData();
  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      setJwtData(data);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const jwtAuthHandler = () => {
    if (jwtData === jwt) {
      setTokenVerify(true);
    } else {
      setTokenVerify(false);
    }
  };

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };
  const handleDocChange = (e: any) => {
    setDocu(e.target.files[0]);
  };

  // const handleImageSubmit = async (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();

  //   // Append image to form data
  //   if (image) {
  //     formDataObj.append('files', image);
  //   }

  //   try {
  //     // Step 1: Upload the image to Strapi
  //     const uploadResponse = await fetch(`https://typical-book-7f88c7bcc2.strapiapp.com/api/upload`, {
  //       method: 'POST',
  //       body: formDataObj,
  //     });

  //     if (!uploadResponse.ok) {
  //       throw new Error('Failed to upload image');
  //     }

  //     const uploadedImage = await uploadResponse.json();
  //     const imageId = uploadedImage[0]?.id;


  //     // Step 2: Submit form data with image reference to Strapi

  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  const onSubmit = (data: any) => {
    jwtAuthHandler();

    data.createdby_usedid = userId;
    data.posted_by = userType;
    if (image) {
      formDataObj.append("files", image);
    }
    if (docu) {
      formDocDataObj.append("files", docu);
    }

    if (tokenVerify) {
      dispatch(listingPostAsync({ data, jwt, formDataObj, formDocDataObj }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Property owner name
        </label>

        <input
          type="text"
          id="name"
          placeholder="Owner Name"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          {...register("owner_name", { required: true, maxLength: 80 })}
        />
        {errors.owner_name && <span>This field is required</span>}
      </div>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Property Heirs details
        </label>
        <input
          type="text"
          id="name"
          placeholder="Heirs details"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          {...register("heirs_details", { required: true, maxLength: 80 })}
        />
      </div>
      {errors.heirsDetails && <span>This field is required</span>}
      <div className="mb-5">
        <label
          htmlFor="phone"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          placeholder="Enter your phone number"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          {...register("phone_number", { required: true, maxLength: 80 })}
        />
      </div>
      {errors.phone_number && <span>This Phone field is required</span>}

      <div className="mb-5">
        <label
          htmlFor="Geo Location"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Geo Location
        </label>
        <input
          type="text"
          id="Geo Location"
          placeholder="Enter your Geo Location"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          {...register("geo_location", { required: true, maxLength: 80 })}
        />
      </div>
      {errors.geo_location && <span>This Geo Location field is required</span>}

      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          {...register("email", { required: true, maxLength: 80 })}
        />
      </div>
      {errors.phone && <span>This Email field is required</span>}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Full Address
        </label>
        <div className="mb-5">
          <input
            type="text"
            id="area"
            placeholder="Enter Full Address"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            {...register("address", { required: true, maxLength: 80 })}
          />
        </div>
      </div>
      {errors.address && <span>This Address field is required</span>}

      <div className="flex items-center justify-center ">
        <div className="mx-auto w-full ">
          <div className="mb-5 ">
            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
              Address Details
            </label>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <input
                    type="text"
                    id="city"
                    placeholder="Enter city"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("city", { required: true, maxLength: 80 })}
                  />
                </div>
              </div>
              {errors.city && <span>This City field is required</span>}
       

              <div className="w-full px-3 sm:w-1/2">
      {/* State Dropdown */}
      <div className="mb-5">
        <select
          id="state"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          {...register("state", { required: true })}
          onChange={handleStateChange}
        >
          <option value="">Select a state</option>
          {locationData.map((item, index) => (
            <option key={index} value={item.state}>
              {item.state}
            </option>
          ))}
        </select>
      </div>
      {errors.state && <span>This state field is required</span>}

      {/* District Dropdown */}
      <div className="mb-5">
        <select
          id="district"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          {...register("district", { required: true })}
          disabled={!selectedState}
        >
          <option value="">Select a district</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>
      {errors.district && <span>This district field is required</span>}
    </div>

            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Door Number
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter your Patta number"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              {...register("door_number", { required: true, maxLength: 80 })}
            />
          </div>
          {errors.property_type && <span>This Property Type field is required</span>}
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Property Type
            </label>

            <select
              {...register("property_type", { required: true })}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-m"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Others">Others</option>
            </select>
          </div>
          {errors.door_number && (
            <span>This Door Number Code field is required</span>
          )}
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Property Patta number
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter your Patta number"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              {...register("patta_number", { required: true, maxLength: 80 })}
            />
          </div>
          {errors.patta_number && (
            <span>This Patta Number Code field is required</span>
          )}
          <div className="mb-5 flex">
            <div>
              <label
                htmlFor="length"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Length
              </label>
              <input
                type="number"
                id="length"
                placeholder="Enter Length (eg: 45 )"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register("length", { required: true, maxLength: 80 })}
              />
            </div>
            <div className="ml-10">
              <label
                htmlFor="breadth"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Breadth
              </label>
              <input
                type="number"
                id="breadth"
                placeholder="Enter  Breadth (eg: 65 )"
                className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register("breadth", { required: true, maxLength: 80 })}
              />
            </div>
          </div>
          {errors.patta_number && (
            <span>This Patta Number Code field is required</span>
          )}
          <div className="mb-5">
            <label
              htmlFor="Document number"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Property Document number
            </label>
            <input
              type="text"
              id=" Document number"
              placeholder="Enter your Document number"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              {...register("document_number", {
                required: true,
                maxLength: 80,
              })}
            />
          </div>
          {errors.document_number && (
            <span>This Document number field is required</span>
          )}
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Upload Document
            </label>
            <input
              type="file"
              placeholder="Upload your PDF"
              className="w-full rounded-md border hover:shadow-form  border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={handleDocChange}
            />
          </div>
          {errors.property_doc && <span>This Doucument is required</span>}
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Upload Image
            </label>
            <input
              type="file"
              placeholder="Upload your Image"
              className="w-full rounded-md border hover:shadow-form  border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={handleImageChange}
            />
          </div>
          {errors.property_image && (
            <span>This Image Doucument is required</span>
          )}
          \
        </div>
      </div>
      <Button variant="contained" type="submit">
        Creating Listing
      </Button>
    </form>
  );
};

export default ProfileTabFormOne;

import { listingPostAsync, selectStatusListing } from "@/lib/features/listing/ListingSlice";
import {
  selectUserId,
  selectUserJwt,
  selectUserType,
} from "@/lib/features/user/userDataSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { locationData } from "../Location/Locationdata";
import { propertyTypeData } from "./PropertyTypeData";
import { toast, ToastContainer } from "react-toastify";

type Props = {};

const ProfileTabFormOne = (props: Props) => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string>("");
  const [realEstate, setRealEstate] = useState<string[]>([]);

  // Handle state selection
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value;
    setSelectedState(state);

    // Find the selected state's districts
    const selectedStateData = locationData.find((item) => item.state === state);
    setDistricts(selectedStateData?.districts || []);
  };

  const handleStateForPropertyTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const property_type = event.target.value;
    setPropertyType(property_type);

    // Find the selected state's districts
    const selectedPropertyData = propertyTypeData.find(
      (item) => item.category === property_type
    );
    setRealEstate(selectedPropertyData?.types || []);
  };

  const [jwtData, setJwtData] = useState("");
  const [docu, setDocu] = useState(null);

  const [tokenVerify, setTokenVerify] = useState(false);
  let jwt = useAppSelector(selectUserJwt);
  let userId = useAppSelector(selectUserId);
  let userType = useAppSelector(selectUserType);
  let loading = useAppSelector(selectStatusListing);

  let dispatch = useAppDispatch();
  const formDataObj = new FormData();
  const formDocDataObj = new FormData();
  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      setJwtData(data);
    }
  }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  const jwtAuthHandler = () => {
    if (jwtData === jwt) {
      setTokenVerify(true);
    } else {
      setTokenVerify(false);
    }
  };

  const [images, setImages] = useState<any[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert the FileList to an array and update the state
      const filesArray = Array.from(e.target.files);
    setImages(filesArray); // Convert FileList to an array
    console.log('Selected files:', filesArray);
    console.log('Selected files:', images);
    }
  };
  const handleDocChange = (e: any) => {
    setDocu(e.target.files[0]);
  };
  
  const onSubmit = (data: any) => {
    jwtAuthHandler();
  
    data.createdby_usedid = userId;
    data.posted_by = userType;
    data.publishedAt  =  new Date().toISOString()
  
    // Append each image file to the FormData
    images.forEach((image, index) => {
      console.log("image",image)
      formDataObj.append(`files`, image);
      console.log("formDataObj",formDataObj.getAll("files"))

    });

    console.log(formDataObj)
  
    if (docu) {
      formDocDataObj.append("files", docu);
    }
  
    if (tokenVerify) {
      dispatch(listingPostAsync({ data, jwt, formDataObj ,formDocDataObj}))
      .then(() => {
        setTimeout(() => {
          toast.success("Listing created successfully!");
          reset();
        }, 1000);
      })
      .catch(() => toast.error("Failed to create listing. Please try again."));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
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

      <div className="mb-5">
        <label
          htmlFor="pincode"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Pin Code
        </label>
        <div className="mb-5">
          <input
            type="text"
            id="area"
            placeholder="Enter pin code"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            {...register("pin_code", { required: true, maxLength: 80 })}
          />
        </div>
      </div>
      {errors.pin_code && <span>This Pin Code field is required</span>}

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
                {errors.city && <span>This City field is required</span>}
              </div>

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
                {errors.district && (
                  <span>This district field is required</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mx-auto w-full ">
          <div className="mb-5 ">
            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
              Property Type
            </label>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <select
                    id="property_type"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("property_type", { required: true })}
                    onChange={handleStateForPropertyTypeChange}
                  >
                    <option value="">Select a Property Type</option>
                    {propertyTypeData.map((item, index) => (
                      <option key={index} value={item.category}>
                        {item.category}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.property_type && <span>This field is required</span>}

                {/* District Dropdown */}
                <div className="mb-5">
                  <select
                    id="real_estate_type"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("real_estate_type", { required: true })}
                    disabled={!propertyType}
                  >
                    <option value="">Select Type</option>
                    {realEstate.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.real_estate_type && (
                  <span>This Real Esate Type field is required</span>
                )}
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
              multiple
            />
          </div>
          {errors.property_image && (
            <span>This Image Doucument is required</span>
          )}
        </div>
      </div>
      <Button variant="contained" type="submit">
        {loading ==="loading"? <CircularProgress/>  : " Create Listing"}
       
      </Button>
      <ToastContainer position="top-right" autoClose={5000} />

    </form>
  );
};

export default ProfileTabFormOne;

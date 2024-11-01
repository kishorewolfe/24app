import axios from "axios";

// A mock function to mimic making an async request for data



      export const postImageOfUser = async (formDataObj:FormData,jwt:any) => {

        const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
          method: 'POST',
          body: formDataObj,
          headers: {
            Authorization:
              `Bearer ${jwt}` ,
              
          }
        });
  
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }
  
        const uploadedImage = await uploadResponse.json();
        const imageId = uploadedImage[0]?.id;
        return imageId;


      }


      
      export const postDocOfUser = async (formDataObj:FormData,jwt:any) => {

        const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
          method: 'POST',
          body: formDataObj,
          headers: {
            Authorization:
              `Bearer ${jwt}` ,
              
          }
        });
  
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }
  
        const uploadedDoc = await uploadResponse.json();
        const docId = uploadedDoc[0]?.id;
        return docId;


      }
      





export const postProprtyOfUser = async (listing:any,jwt:any) => {
  let headerConfig =     
{
   headers: {
     "Content-Type": "application/json",
     Authorization:
       "Bearer " +
       `${jwt}`,
       
   }
 }
 
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements?populate=*`,{data:listing},headerConfig);
  const result =  response;
  return result;
};

export const fetchPropertiesOfAllUser = async () => {
  // let config = {
  //   headers: {
  //     Authorization:
  //       `Bearer ${jwt}`},
  // };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements?fields[0]=owner_name&fields[1]=posted_by&fields[2]=city&fields[3]=state&fields[4]=pin_code&fields[5]=createdby_usedid&fields[6]=district&fields[7]=area&populate[0]=property_image`
  );
  const result = await response?.data;
  return result;
};








export const getFetchProprtyOfUser = async (id:number ,jwt:any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements?filters[createdby_usedid][$eq]=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +{jwt}
      },
    }
  );
  const result = await response.json();
  return result;
};

export const fetchPropertyListingsByCity = async (district: string) => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements`;
  // let config = {
  //   headers: {
  //     Authorization:
  //       `Bearer ${jwt}`},
  // };

  const url = `${API_URL}?filters[district][$eq]=${encodeURIComponent(
    district
  )}&fields[0]=owner_name&fields[1]=posted_by&fields[2]=city&fields[3]=state&fields[4]=pin_code&fields[5]=createdby_usedid&fields[6]=district&fields[7]=area&populate[0]=property_image`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching property listings:", error);
    return null;
  }
};


export const fetchPropertyListingsByArea = async (area: string) => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements`;

  const url = `${API_URL}?filters[area][$eq]=${encodeURIComponent(
    area
  )}&fields[0]=owner_name&fields[1]=posted_by&fields[2]=city&fields[3]=state&fields[4]=pin_code&fields[5]=createdby_usedid&fields[6]=district&fields[7]=area&populate[0]=property_image`;
 
  // let config = {
  //   headers: {
  //     Authorization:
  //       `Bearer ${jwt}`},
  // };
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching property listings:", error);
    return null;
  }
};


export const fetchPropertyListingsByLandTypeAndPropertyType = async (property: string, type: string) => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements`;

  const url = `${API_URL}?filters[property_type][$eq]=${encodeURIComponent(
     type
  )}&filters[real_estate_type][$eq]=${encodeURIComponent(
    property
  )}&fields[0]=owner_name&fields[1]=posted_by&fields[2]=city&fields[3]=state&fields[4]=pin_code&fields[5]=createdby_usedid&fields[6]=district&fields[7]=area&populate[0]=property_image`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch property listings");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

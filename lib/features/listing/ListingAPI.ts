import axios from "axios";

// A mock function to mimic making an async request for data



export const postImagesOfUser = async (formDataObj: FormData, jwt: any) => {
  console.log("formDataObj",formDataObj)
  const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
    method: 'POST',
    body: formDataObj,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!uploadResponse.ok) {
    throw new Error('Failed to upload images');
  }

  const uploadedImages = await uploadResponse.json();
  const imageIds = uploadedImages.map((image: any) => image.id); // Extract the IDs of the uploaded images
  return imageIds;
};



      
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
 
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements`,{data:listing},headerConfig);
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements/findsomeproperties`
  );
  const result = await response?.data;
  return result;
};








export const getFetchProprtyOfUser = async (id:number ,jwt:any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements/findsomeproperties?createdby_usedid]=${id}`,
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
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements/findsomeproperties?district=${district}`;

  try {
    const response = await fetch(API_URL, {
      method: "GET", // Use GET since we are using query parameters
      headers: {
        "Content-Type": "application/json",
      },
    });

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
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements/findsomeproperties?area=${area}`;

 
  // let config = {
  //   headers: {
  //     Authorization:
  //       `Bearer ${jwt}`},
  // };
  try {
    const response = await fetch(API_URL);
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
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements/findsomeproperties?property_type=${type}&real_estate_type=${property}`;


  try {
    const response = await fetch(API_URL);
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

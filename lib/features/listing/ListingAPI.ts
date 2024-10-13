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
 console.log("result" ,result)
  return result;
};

export const fetchPropertiesOfAllUser = async (jwt:any) => {
  let config = {
    headers: {
      Authorization:
        `Bearer ${jwt}`},
  };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements?fields[0]=owner_name&fields[1]=posted_by&fields[2]=city&fields[3]=state&fields[4]=pin_code&fields[5]=createdby_usedid&populate[0]=property_image`,config
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

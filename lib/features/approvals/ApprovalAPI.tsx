import axios from "axios";

// A mock function to mimic making an async request for data




 const headerConfig =     
     {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "3fbe850885adc035ff9bb9f1025807f99a4d8f36438b5d9ad9c80896f1969aa43a179b70379c4456897",
            
        }
      }


      export const postImageOfUser = async (formDataObj:FormData,jwt:any) => {

        const uploadResponse = await fetch(`https://typical-book-7f88c7bcc2.strapiapp.com/api/upload`, {
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

        const uploadResponse = await fetch(`https://typical-book-7f88c7bcc2.strapiapp.com/api/upload`, {
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
      





export const postforApproval = async (listing:any,jwt:any) => {
  let config = {
    headers: {
      Authorization:
        `Bearer ${jwt}`},
  };
 
  const response = await axios.post("https://typical-book-7f88c7bcc2.strapiapp.com/api/approvals",{data:listing},config);
  const result =  response;

  return result;
};

export const getProprtyApprovals = async (userId:any,jwt:any) => {
  let config = {
    headers: {
      Authorization:
        `Bearer ${jwt}`},
  };
  const response = await axios.get(
    `https://typical-book-7f88c7bcc2.strapiapp.com/api/approvals?filters[owner_userId][$eq]=${userId}`,config
  );
  const result = await response?.data;

  return result;
};



//fetchPostOfUserID
export const fetchPostOfUserID = async (userId:any,jwt:any) => {
  let config = {
    headers: {
      Authorization:
        `Bearer ${jwt}`},
  };
  const response = await axios.get(
    `https://typical-book-7f88c7bcc2.strapiapp.com/api/property-listing-requirements/${userId}`,config
  );
  const result = await response?.data;
 
  return result;
};




export const getFetchProprtyOfUser = async (id:number ,jwt:any) => {
  const response = await fetch(
    `https://typical-book-7f88c7bcc2.strapiapp.com/api/property-listing-requirements?filters[createdby_usedid][$eq]=${id}`,
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

let config = {
  headers: {
    Authorization:
      "Bearer " +
      "3fbe8508855761fc870318f45a8aaf2e28aea4daa735b1bdb9debadc035ff9ba33f6c7c06bf4f715dbb66ba8aaa05a5b599b72e59b4fb54907de3cb43a249b5dc6fa6c0afb7ca7d53eb9f105f340c69adfbfe7df378720e3b021acb2baf09913bf5c0425807f99a4d8f36438b5d9ad9c80896f1969aa43a179b70379c4456897",
  },
};

export const fetchData = async () => {
  await axios
    .get(
      "https://typical-book-7f88c7bcc2.strapiapp.com/api/property-listing-requirements?populate=*",
      config
    )
    .then((response) => {
    });
};
    
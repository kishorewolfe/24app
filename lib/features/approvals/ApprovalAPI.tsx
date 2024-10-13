import axios from "axios";
export const postforApproval = async (listing:any,jwt:any) => {
  let config = {
    headers: {
      Authorization:
        `Bearer ${jwt}`},
  };
 
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/approvals`,{data:listing},config);
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/approvals?filters[owner_userId][$eq]=${userId}`,config
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements/${userId}`,config
  );
  const result = await response?.data;
 
  return result;
};





import axios from "axios";


export const getSubscriptionOfUser = async (id:number ,jwt:any) => {
  let config = {
    headers: {
      Authorization:
      `Bearer ${jwt}`},
  };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements?filters[createdby_usedid][$eq]=${id}`,config
  );
  const result = await response?.data;
  return result;
};


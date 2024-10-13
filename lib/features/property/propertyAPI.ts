import axios from "axios";

// A mock function to mimic making an async request for data
export const postProprtyOfUser = async (amount = 1) => {
  const response = await fetch("http://localhost:3000/api/counter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const result: { data: number } = await response.json();
  return result;
};

export const getFetchProprtyOfUser = async (id:number ,jwt:any) => {
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




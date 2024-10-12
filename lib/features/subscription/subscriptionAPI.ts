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
    `https://typical-book-7f88c7bcc2.strapiapp.com/api/property-listing-requirements?filters[createdby_usedid][$eq]=${id}`,config
  );
  const result = await response?.data;
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
      "https://typical-book-7f88c7bcc2.strapiapp.com?populate=*",
      config
    )
    .then((response) => {
    });
};

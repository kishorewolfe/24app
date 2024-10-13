import axios from "axios";

// A mock function to mimic making an async request for data


export const postProprtyOfUser = async (amount = 1) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/counter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const result: { data: number } = await response.json();
  return result;
};

export const getFetchProprtyOfUser = async (id:number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements?filters[createdby_usedid][$eq]=27`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +"3fbe8508855761fc870318f45a8aaf2e28aea4daa735b1bdb9debadc035ff9ba33f6c7c06bf4f715dbb66ba8aaa05a5b599b72e59b4fb54907de3cb43a249b5dc6fa6c0afb7ca7d53eb9f105f340c69adfbfe7df378720e3b021acb2baf09913bf5c0425807f99a4d8f36438b5d9ad9c80896f1969aa43a179b70379c4456897"
      },
    }
  );
  const result = await response?.data;
  return result;
};


const headerConfig =     
{
   headers: {
     "Content-Type": "application/json",
   }
 }


export const postLoginUser = async (data:any) => {

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/`,{
      identifier: data?.identifier, 
      password:  data?.password,    
    },{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const result =  response;

    const { jwt, user } = response.data;
    
    localStorage.setItem('token', jwt);

   
    return result;
  };
  export const postCreateNewUser = async (data:any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
      {
        email:data?.email,
        username:data?.username,
        password:data?.password,
         FullName: data?.FullName,
        typeofuser: data?.typeofuser,
      
      }
    ,headerConfig);
    const result =  response;
    return result;
  };
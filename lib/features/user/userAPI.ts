import axios from "axios";




const headerConfig =     
{
   headers: {
     "Content-Type": "application/json",
   }
 }


 export const postLoginUser = async (data: any) => {
  const response = await axios.post(`http://localhost:1337/api/auth/local/`, {
    identifier: data?.identifier,
    password: data?.password,
  });

  const { jwt, user } = response.data;

  localStorage.setItem('token', jwt);

  return { jwt, user };
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
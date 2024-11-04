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

export const getFetchProprtyOfUser = async (id: any, jwt: any) => {
  let config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements?filters[createdby_usedid][$eq]=${id}`,
    config
  );
  const result = await response?.data;
  return result;
};

export const getFeaturedListing = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements/featured/all`
  );
  const result = await response;
  return result;
};

//https://api.24hectares.com/api/property-listing-requirements?filters[createdby_usedid][$eq]=1&pagination[pageSize]=0

export const getCountOfPropertiesPostedByUser = async (id: any, jwt: any) => {
  let config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements?filters[createdby_usedid][$eq]=${id}&pagination[pageSize]=0`,
    config
  );
  const result = await response;
  return result;
};

// Define a type for the monthly count response
interface MonthlyCount {
  [key: number]: number; // Maps month (1-12) to count
}

export const fetchMonthlyDataResidential = async (createdby_usedid: any, jwt: any): Promise<MonthlyCount> => {
  let config = {
    method: 'POST', // Change to POST
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json', // Set content type
    },
    body: JSON.stringify({ createdby_usedid }), // Send createdby_usedid in the body
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements/fetch-monthly-data/residential`,
      config // Use the config object
    );


    // Ensure the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data; // Return the aggregated count
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error so the thunk can handle it
  }
};


export const fetchMonthlyDataCommercial = async (createdby_usedid: any, jwt: any): Promise<MonthlyCount> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements/fetch-monthly-data/commercial`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`, // Include JWT token for authentication
        },
        body: JSON.stringify({ createdby_usedid }), // Send the createdby_usedid in the body
      }
    );

    // Ensure the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data; // Return the aggregated count
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error so the thunk can handle it
  }
};

///

export const fetchTotalCountOfProperties = async (createdby_usedid: any, jwt: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/property-listing-requirements/fetch-data/count`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`, // Include JWT token for authentication
        },
        body: JSON.stringify({ createdby_usedid }), // Send the createdby_usedid in the body
      }
    );

    // Ensure the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data; // Return the aggregated count
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error so the thunk can handle it
  }
};
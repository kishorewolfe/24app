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
    `${process.env.NEXT_PUBLIC_API_URL}/api/featureds?populate=*`
  );
  const result = await response?.data;
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

export const fetchMonthlyDataResidential = async (): Promise<MonthlyCount> => {
  try {
    const response = await fetch(
      "https://api.24hectares.com/api/property-listing-requirements?filters[createdby_usedid][$eq]=1&filters[property_type][$eq]=Residential&pagination[withCount]=true&fields[0]=createdAt"
    );

    // Ensure the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Initialize acc with months and set initial counts to 0
    const monthlyCount: MonthlyCount = {
      "1": 0, // January
      "2": 0, // February
      "3": 0, // March
      "4": 0, // April
      "5": 0, // May
      "6": 0, // June
      "7": 0, // July
      "8": 0, // August
      "9": 0, // September
      "10": 0, // October
      "11": 0, // November
      "12": 0, // December
    };

    // Aggregate count by month
    data.data.forEach((item: { attributes: { createdAt: string } }) => {
      const month = new Date(item.attributes.createdAt).getMonth() + 1; // Get month as 1-12
      monthlyCount[month] = (monthlyCount[month] || 0) + 1; // Increment the count for the month
    });

    return monthlyCount; // Return the aggregated count
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error so the thunk can handle it
  }
};

export const fetchMonthlyDataCommercial = async (): Promise<MonthlyCount> => {
  try {
    const response = await fetch(
      "https://api.24hectares.com/api/property-listing-requirements?filters[createdby_usedid][$eq]=1&filters[property_type][$eq]=Commercial&pagination[withCount]=true&fields[0]=createdAt"
    );

    // Ensure the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Initialize acc with months and set initial counts to 0
    const monthlyCount: MonthlyCount = {
      "1": 0, // January
      "2": 0, // February
      "3": 0, // March
      "4": 0, // April
      "5": 0, // May
      "6": 0, // June
      "7": 0, // July
      "8": 0, // August
      "9": 0, // September
      "10": 0, // October
      "11": 0, // November
      "12": 0, // December
    };

    // Aggregate count by month
    data.data.forEach((item: { attributes: { createdAt: string } }) => {
      const month = new Date(item.attributes.createdAt).getMonth() + 1; // Get month as 1-12
      monthlyCount[month] = (monthlyCount[month] || 0) + 1; // Increment the count for the month
    });

    return monthlyCount; // Return the aggregated count
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error so the thunk can handle it
  }
};

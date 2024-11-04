import { createAppSlice } from "@/lib/createAppSlice";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import {
  postProprtyOfUser,
  getFetchProprtyOfUser,
  getFeaturedListing,
  getCountOfPropertiesPostedByUser,
  fetchMonthlyDataResidential,
  fetchMonthlyDataCommercial,
  fetchTotalCountOfProperties,
} from "./propertyAPI";
// Define a type for the monthly count response
interface MonthlyCount {
  [key: number]: number; // Maps month (1-12) to count
}

interface PropertyState {
  listing: any[];
  featured: any[];
  status: "idle" | "loading" | "success" | "failed";
  featuredStatus: "idle" | "loading" | "success" | "failed";
  propertiesCount: any[];
  meta: any;
  countStatus: "idle" | "loading" | "success" | "failed";
  ResidentialPropertiesCount: MonthlyCount;
  CommercialPropertiesCount: MonthlyCount;
}


const initialState: PropertyState = {
  listing: [],
  featured: [],
  status: "idle",
  countStatus: "idle",
  featuredStatus: "idle",
  propertiesCount: [],
  meta: null,
  ResidentialPropertiesCount: {},
  CommercialPropertiesCount: {},
};

// Async thunks for fetching data
export const propertyFetchAsync = createAsyncThunk(
  "property/fetch",
  async () => {
    const response = await postProprtyOfUser();
    return response.data;
  }
);

export const getpropertyListingAsync = createAsyncThunk(
  "property/getListing",
  async (args: { userId: string; jwtToken: string }) => {
    const { userId, jwtToken } = args;
    const response = await getFetchProprtyOfUser(userId, jwtToken);

    // Ensure the response contains a valid array or return an empty array as fallback.
    return response.data;
  }
);

//getCountOfPropertiesPostedByUser

export const getCountOfUserPropertiesAsync = createAsyncThunk(
  "property/totalCount",
  async (args: { userId: string; jwtToken: string }) => {
    const { userId, jwtToken } = args;
    const response = await fetchTotalCountOfProperties(userId, jwtToken);
    return response.count;
  }
);

export const getFeaturedListingAsync = createAsyncThunk(
  "property/getFeatured",
  async () => {
    const response = await getFeaturedListing();
    return response.data;
  }
);

export const getCommercialCountAsync = createAsyncThunk<MonthlyCount, { userId: string; jwt: string }>(
  "property/getCommercial",
  async ({ userId, jwt }) => { // Destructure args directly in the function parameters
    const response = await fetchMonthlyDataCommercial(userId, jwt);
    return response;
  }
);

export const getResidentialCountAsync = createAsyncThunk<MonthlyCount ,{ userId: string; jwt: string }>(
  "property/getResidential",
  async ({ userId, jwt }) => { 
  
    const response = await fetchMonthlyDataResidential(userId , jwt);
    return response; // The returned value is now of type MonthlyCount
  }
);


// Creating the slice using `createAppSlice`
export const propertySlice = createAppSlice({
  name: "property",
  initialState,
  reducers: (create) => ({
    incrementByAmount: create.reducer((state, action: PayloadAction<any[]>) => {
      state.listing = action.payload; // Replace the listing directly
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(propertyFetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(propertyFetchAsync.fulfilled, (state, action: any) => {
        state.status = "success";
        state.listing = action?.payload; // Now TypeScript knows this will always be an array
      })
      .addCase(propertyFetchAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getpropertyListingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getpropertyListingAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.listing = action?.payload; // Immutably update
      })
      .addCase(getpropertyListingAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getFeaturedListingAsync.pending, (state) => {
        state.featuredStatus = "loading";
      })
      .addCase(getFeaturedListingAsync.fulfilled, (state, action) => {
        state.featuredStatus = "success";
        state.featured = action?.payload; // Safely update featured data
      })
      .addCase(getFeaturedListingAsync.rejected, (state) => {
        state.featuredStatus = "failed";
      })
      .addCase(getCountOfUserPropertiesAsync.pending, (state) => {
        state.countStatus = "loading";
      })
      .addCase(
        getCountOfUserPropertiesAsync.fulfilled,
        (state, action: any) => {
          state.countStatus = "success";
          state.meta = action?.payload; // Now TypeScript knows this will always be an array
        }
      )
      .addCase(getCountOfUserPropertiesAsync.rejected, (state) => {
        state.countStatus = "failed";
      })
      .addCase(getCommercialCountAsync.pending, (state) => {
        state.countStatus = "loading";
      })
      .addCase(getCommercialCountAsync.fulfilled, (state, action: PayloadAction<MonthlyCount>) => {
        state.countStatus = "success";

        state.CommercialPropertiesCount = action?.payload; // Now TypeScript knows this will always be an array
      })
      .addCase(getCommercialCountAsync.rejected, (state) => {
        state.countStatus = "failed";
      })
      .addCase(getResidentialCountAsync.pending, (state) => {
        state.countStatus = "loading";
      })
      .addCase(getResidentialCountAsync.fulfilled, (state, action: PayloadAction<MonthlyCount>) => {
        state.countStatus = "success";
        state.ResidentialPropertiesCount = action?.payload; // Assuming you want to replace this with the monthly counts
      })
      .addCase(getResidentialCountAsync.rejected, (state) => {
        state.countStatus = "failed";
      });
  },
  selectors: {
    selectPropertyListing: (state: PropertyState) => state.listing,
    selectStatusListing: (state: PropertyState) => state.status,
    selectFeaturedListing: (state: PropertyState) => state.featured,
    selectPropertyCount: (state: PropertyState) => state.meta,
    selectResidentialCount: (state: PropertyState) =>
      state.ResidentialPropertiesCount,
    selectCommercialCount: (state: PropertyState) =>
      state.CommercialPropertiesCount,
  },
});

//getCountOfPropertiesPostedByUser

// Exporting actions and selectors
export const { incrementByAmount } = propertySlice.actions;
export const {
  selectPropertyListing,
  selectStatusListing,
  selectFeaturedListing,
  selectPropertyCount,
  selectCommercialCount,
  selectResidentialCount,
} = propertySlice.selectors;

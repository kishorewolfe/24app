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
  fetchCommercialDataPieChartCount,
  fetchAllPropertiesPostedByMe,
  fetchAllImagesPropertiesPostedByMe,
} from "./propertyAPI";
// Define a type for the monthly count response


interface PropertyState {
  listing: any[];
  featured: any[];
  ownProperties:any[];
  imageProperty:any[];
  status: "idle" | "loading" | "success" | "failed";
  featuredStatus: "idle" | "loading" | "success" | "failed";
  propertiesCount: any[];
  meta: any;
  countStatus: "idle" | "loading" | "success" | "failed";
  ResidentialPropertiesCount: number[];
  CommercialPropertiesCount: number[];
  commericialCountPieChart:any[]
}


const initialState: PropertyState = {
  listing: [],
  ownProperties:[],
  featured: [],
  imageProperty:[],
  status: "idle",
  countStatus: "idle",
  featuredStatus: "idle",
  propertiesCount: [],
  meta: null,
  ResidentialPropertiesCount: [0,0,0,0,0,0,0,0,0,0,0,0,],
  CommercialPropertiesCount:  [0,0,0,0,0,0,0,0,0,0,0,0,],
  commericialCountPieChart:[]
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

export const getCommercialCountAsync = createAsyncThunk<number[], { userId: string; jwt: string }>(
  "property/getCommercial",
  async ({ userId, jwt }) => { // Destructure args directly in the function parameters
    const response = await fetchMonthlyDataCommercial(userId, jwt);
    return response;
  }
);


export const getResidentialCountAsync = createAsyncThunk<number[], { userId: string; jwt: string }>(
  "property/getResidential",
  async ({ userId, jwt }) => { 
    const response = await fetchMonthlyDataResidential(userId, jwt);
    return response; // This could be any type or specific response format
  }
);




///property-listing-requirements/fetch-data/commercialcount
export const getCommercialPieChartCountAsync = createAsyncThunk<any ,{ userId: string; jwt: string }>(
  "property/getCommercialPieChart",
  async ({ userId, jwt }) => { 
  
    const response = await fetchCommercialDataPieChartCount(userId , jwt);
    return response; // The returned value is now of type MonthlyCount
  }
);
export const getAllPropertiesPostedByMeAsync = createAsyncThunk<any ,{ userId: string; jwt: string }>(
  "property/getAllProperties",
  async ({ userId, jwt }) => { 
  
    const response = await fetchAllPropertiesPostedByMe(userId , jwt);
    return response?.data; // The returned value is now of type MonthlyCount
  }
);




export const getAllPropertiesImagesPostedByMeAsync = createAsyncThunk<any ,{ createdby_usedid: string; id:string; jwt: string }>(
  "property/getAllPropertiesImages",
  async ({ createdby_usedid,id, jwt }) => { 
  
    const response = await fetchAllImagesPropertiesPostedByMe(createdby_usedid ,id, jwt);
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
      .addCase(getCommercialCountAsync.fulfilled, (state, action: PayloadAction<number[]>) => {
        state.countStatus = "success";

       state.CommercialPropertiesCount = action?.payload; // Now TypeScript knows this will always be an array
      })
      .addCase(getCommercialCountAsync.rejected, (state) => {
        state.countStatus = "failed";
      })
      .addCase(getResidentialCountAsync.pending, (state) => {
        state.countStatus = "loading";
      })
      .addCase(getResidentialCountAsync.fulfilled, (state, action: PayloadAction<number[]>) => {
        state.countStatus = "success";
        state.ResidentialPropertiesCount = action?.payload;
      })
      .addCase(getResidentialCountAsync.rejected, (state) => {
        state.countStatus = "failed";
      }).addCase(getCommercialPieChartCountAsync.pending, (state) => {
        state.countStatus = "loading";
      })
      .addCase(getCommercialPieChartCountAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.countStatus = "success";
        state.commericialCountPieChart = action?.payload; // Assuming you want to replace this with the monthly counts
      })
      .addCase(getAllPropertiesPostedByMeAsync.pending, (state) => {
        state.countStatus = "loading";
      })
      .addCase(getAllPropertiesPostedByMeAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.countStatus = "success";
        state.ownProperties = action?.payload; // Assuming you want to replace this with the monthly counts
      })
      .addCase(getAllPropertiesPostedByMeAsync.rejected, (state) => {
        state.countStatus = "failed";
      }).addCase(getAllPropertiesImagesPostedByMeAsync.pending, (state) => {
        state.countStatus = "loading";
      })
      .addCase(getAllPropertiesImagesPostedByMeAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.countStatus = "success";
        state.imageProperty = action?.payload; // Assuming you want to replace this with the monthly counts
      })
      .addCase(getAllPropertiesImagesPostedByMeAsync.rejected, (state) => {
        state.countStatus = "failed";
      });
  },
  selectors: {
    selectPropertyListing: (state: PropertyState) => state.listing,
    selectStatusListing: (state: PropertyState) => state.status,
    selectFeaturedListing: (state: PropertyState) => state.featured,
    selectPropertyCount: (state: PropertyState) => state.meta,
    selectResidentialCount: (state: PropertyState) =>
      state.ResidentialPropertiesCount  || [],
    selectCommercialCount: (state: PropertyState) =>
      state.CommercialPropertiesCount  || [],
    selectCommercialPeiCount: (state: PropertyState) =>
      state.commericialCountPieChart,
    selectAllProperties: (state: PropertyState) =>
      state.ownProperties  || [],
    selectImageProperty: (state: PropertyState) =>
      state.imageProperty  || [],
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
  selectResidentialCount,selectCommercialPeiCount,selectAllProperties,selectImageProperty
} = propertySlice.selectors;

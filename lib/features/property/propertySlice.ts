import { createAppSlice } from "@/lib/createAppSlice";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import {
  postProprtyOfUser,
  getFetchProprtyOfUser,
  getFeaturedListing,
} from "./propertyAPI";

// Initial state with clear typing.
interface PropertyState {
  listing: any[];
  featured: any[];
  status: "idle" | "loading" | "failed";
  featuredStatus: "idle" | "loading" | "success" | "failed";
}

const initialState: PropertyState = {
  listing: [],
  featured: [],
  status: "idle",
  featuredStatus: "idle",
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
    return Array.isArray(response.data) ? response.data : [];
  }
);


export const getFeaturedListingAsync = createAsyncThunk(
  "property/getFeatured",
  async () => {
    const response = await getFeaturedListing();
    return response.data;
  }
);

// Creating the slice using `createAppSlice`
export const propertySlice = createAppSlice({
  name: "property",
  initialState,
  reducers: (create) => ({
    incrementByAmount: create.reducer(
      (state, action: PayloadAction<any[]>) => {
        state.listing = action.payload; // Replace the listing directly
      }
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(propertyFetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(propertyFetchAsync.fulfilled, (state, action:any) => {
        state.status = "idle";
        state.listing = action.payload; // Now TypeScript knows this will always be an array
      })
      .addCase(propertyFetchAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getpropertyListingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getpropertyListingAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.listing = state.listing; // Immutably update
      })
      .addCase(getpropertyListingAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getFeaturedListingAsync.pending, (state) => {
        state.featuredStatus = "loading";
      })
      .addCase(getFeaturedListingAsync.fulfilled, (state, action) => {
        state.featuredStatus = "success";
        state.featured = action?.payload ; // Safely update featured data
      })
      .addCase(getFeaturedListingAsync.rejected, (state) => {
        state.featuredStatus = "failed";
      });
  },
  selectors: {
    selectPropertyListing: (state: PropertyState) => state.listing,
    selectStatusListing: (state: PropertyState) => state.status,
    selectFeaturedListing: (state: PropertyState) => state.featured,
  },
});

// Exporting actions and selectors
export const { incrementByAmount } = propertySlice.actions;
export const {
  selectPropertyListing,
  selectStatusListing,
  selectFeaturedListing,
} = propertySlice.selectors;

import { createAppSlice } from "@/lib/createAppSlice";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { postProprtyOfUser, getFetchProprtyOfUser } from "./propertyAPI";

// export interface propertySliceState {
//   listing: [];
//   status: "idle" | "loading" | "failed";
// }

const initialState: any = {
  listing:[],
  status: "idle",
};



// If you are not using async thunks you can use the standalone `createSlice`.
export const propertySlice = createAppSlice({
  name: "property",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    incrementByAmount: create.reducer((state, action: PayloadAction<any>) => {
      state.listing = action?.payload;
    }),
    
        propertyFetchAsync: create.asyncThunk(
      async () => {
        const response = await postProprtyOfUser();
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<any>) => {
          state.status = "idle";
          state.listing = action?.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    getpropertyListingAsync: create.asyncThunk(
      async (args:any) => {
        const {userId ,jwtToken} = args
        const response = await getFetchProprtyOfUser(userId,jwtToken);
     
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<any>) => {
      
          state.status = "idle";
          state.listing.push(action?.payload);
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),

  selectors: {
    selectPropertyListing: (property) => property.listing,
    selectStatusListing: (property) => property.status,
  },
});

export const {
  incrementByAmount,
  propertyFetchAsync,
  getpropertyListingAsync,
} = propertySlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectPropertyListing, selectStatusListing } = propertySlice.selectors;


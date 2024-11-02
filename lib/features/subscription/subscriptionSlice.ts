import { createAppSlice } from "@/lib/createAppSlice";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import {  getSubscriptionOfUser } from "./subscriptionAPI";

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
    
   
  }),

  selectors: {
    selectPropertyListing: (property) => property.listing,
    selectStatusListing: (property) => property.status,
  },
});

export const {
  incrementByAmount,

} = propertySlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectPropertyListing, selectStatusListing } = propertySlice.selectors;


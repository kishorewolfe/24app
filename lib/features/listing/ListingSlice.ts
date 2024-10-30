import { createAppSlice } from "@/lib/createAppSlice";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { fetchPropertiesOfAllUser, fetchPropertyListingsByArea, fetchPropertyListingsByCity, getFetchProprtyOfUser, postDocOfUser, postImageOfUser, postProprtyOfUser } from "./ListingAPI";
// export interface propertySliceState {
//   listing: [];
//   status: "idle" | "loading" | "failed";
// }

const initialState: any = {
  listingDetails:[],
  status: "idle",
};



// If you are not using async thunks you can use the standalone `createSlice`.
export const listingSlice = createAppSlice({
  name: "listing",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    incrementByAmount: create.reducer((state, action: PayloadAction<any>) => {
      state.listing = action?.payload;
    }),
    
    listingPostAsync: create.asyncThunk(async (args:any) => {

      const {data,jwt,formDataObj,formDocDataObj} = args
        const imageId = await postImageOfUser(formDataObj,jwt)
        const docId = await postDocOfUser(formDocDataObj,jwt)
        data.property_image = imageId
        data.property_doc = docId
        const response = await postProprtyOfUser(data,jwt);
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
        const {id ,jwt}= args
        const response = await getFetchProprtyOfUser(id,jwt);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<any>) => {
          state.status = "idle";
          state.listing =action?.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),


    getAllpropertiesListingAsync: create.asyncThunk(
      async (args:any) => {
        const { jwt }= args
     
        const response = await fetchPropertiesOfAllUser(jwt);
       
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
    getAllpropertiesListingForCityAsync: create.asyncThunk(
      async (args:any) => {
        const { jwt ,district }= args
     
        const response = await fetchPropertyListingsByCity(jwt,district);
       
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
    getAllpropertiesListingForAreaAsync: create.asyncThunk(
      async (args:any) => {
        const { jwt ,area }= args
     
        const response = await fetchPropertyListingsByArea(jwt,area);
       
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
  }),

  selectors: {
    selectPropertyListing: (property) => property.listing,
    selectStatusListing: (property) => property.status,
  },
});

export const {
  incrementByAmount,
  listingPostAsync,
  getpropertyListingAsync,
  getAllpropertiesListingAsync,getAllpropertiesListingForCityAsync,getAllpropertiesListingForAreaAsync
} = listingSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectPropertyListing, selectStatusListing } = listingSlice.selectors;


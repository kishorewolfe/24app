import { createAppSlice } from "@/lib/createAppSlice";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { fetchPostOfUserID, getProprtyApprovals, postforApproval } from "./ApprovalAPI";
// export interface propertySliceState {
//   listing: [];
//   status: "idle" | "loading" | "failed";
// }

const initialState: any = {
  submitted:false,
  status: "idle",
  response:[],
  responseId:"",
  modalpost:[]
};



// If you are not using async thunks you can use the standalone `createSlice`.
export const ApprovalSlice = createAppSlice({
  name: "approval",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    changeStateToEmpty: create.reducer((state, action: PayloadAction<any>) => {
      state.modalpost = [];
    }),
    
    postforApprovalAsync: create.asyncThunk(async (args:any) => {

      const {requestedById,owner_userId,product_id,usertype,jwt} = args
        const postappResponse = await postforApproval({requestedById,owner_userId,product_id,usertype},jwt)
    
        return postappResponse.data;
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
    getApprovalsAsync: create.asyncThunk(
      async (args:any) => {
        const {userId ,jwt}= args
        const response = await getProprtyApprovals(userId,jwt);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<any>) => {
          state.status = "idle";
          state.response =action?.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),


    getPropertiesForApprovalListingAsync: create.asyncThunk(
      async (args:any) => {
        const { id,jwt }= args
       
        const response = await fetchPostOfUserID(id,jwt);
      
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<any>) => {
          
          state.status = "idle";
          state.modalpost = action?.payload;
         
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),

  selectors: {
    selectApprovalsListing: (property) => property.response,
    selectStatusListing: (property) => property.status,
    selecModalPostListing: (property) => property.modalpost,
  },
});

export const {
  postforApprovalAsync,getApprovalsAsync,getPropertiesForApprovalListingAsync,changeStateToEmpty
} = ApprovalSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectApprovalsListing, selectStatusListing,selecModalPostListing } = ApprovalSlice.selectors;


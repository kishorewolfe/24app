import { createAppSlice } from "@/lib/createAppSlice";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { postCreateNewUser, postLoginUser } from "./userAPI";
// export interface propertySliceState {
//   listing: [];
//   status: "idle" | "loading" | "failed";
// }

const initialState: any = {
  userDetails:[],
  status: "idle",
  result:"Not Created",
  newUser:"",
  isLoggedIn:false,
  jwtToken:"",
  userId:"",
userType:""
};



// If you are not using async thunks you can use the standalone `createSlice`.
export const usersDataSlice = createAppSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    incrementByAmount: create.reducer((state, action: PayloadAction<any>) => {
      state.userDetails = action?.payload;
    }),
    userLogout: create.reducer((state, action: PayloadAction<any>) => {
      state.userDetails = [];
      state.isLoggedIn = false;
      state.jwtToken="";
      state.userId="";
      state.userType=""

    }),
    
    getuserLoginAsync: create.asyncThunk(
      async (data:any) => {
        const response = await postLoginUser(data);
        return response.data
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<any>) => {
          state.status = "idle";
          state.result="Created Successfully"
          state.isLoggedIn = true
          
          state.userDetails = action?.payload?.user;
          state.jwtToken = action?.payload?.jwt
          state.userId = action?.payload?.user?.id
          state.userType = action?.payload?.user?.typeofuser
          console.log("userType",action?.payload?.user?.typeofuser)
          
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    postNewUserAsync: create.asyncThunk(
        async (data:any) => {
          const response = await postCreateNewUser(data
          );
          return response.data;
        },
        {
          pending: (state) => {
            state.status = "loading";
          },
          fulfilled: (state, action: PayloadAction<any>) => {
            state.status = "idle";
            state.newUser="Created Successfully"
            //state.userDetails action?.payload;
           
          },
          rejected: (state) => {
            state.status = "isLoggedIn";
          },
        }
      ),
    // getpropertyListingAsync: create.asyncThunk(
    //   async (id:number) => {
    //     const response = await getFetchProprtyOfUser(id);
    //     console.log(response)
    //     return response.data;
    //   },
    //   {
    //     pending: (state) => {
    //       state.status = "loading";
    //     },
    //     fulfilled: (state, action: PayloadAction<any>) => {
    //       console.log(action)
    //       state.status = "idle";
    //       state?.listing.push(action?.payload);
    //     },
    //     rejected: (state) => {
    //       state.status = "failed";
    //     },
    //   }
    // ),
  }),

  selectors: {
    selectStatus: (users) => users.status,
    selectResult: (res) => res.status,
    selectNewUser: (res) => res.newUser,
    selectLoggedIn: (res) => res.isLoggedIn,
    selectUserId: (res) => res.userId,
    selectUserType: (res) => res.userType,
    selectUserJwt: (res)=> res.jwtToken,
    selectUserDetails: (res)=> res.userDetails

  },
});

export const {
  incrementByAmount,
  getuserLoginAsync,
  postNewUserAsync,
  userLogout
 
} = usersDataSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus, selectResult, selectNewUser,selectLoggedIn,selectUserId,selectUserJwt,selectUserDetails,selectUserType } = usersDataSlice.selectors;


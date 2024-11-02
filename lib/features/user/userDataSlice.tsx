import { createAppSlice } from "@/lib/createAppSlice";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { postCreateNewUser, postLoginUser } from "./userAPI";
import localStorage from "redux-persist/lib/storage";
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
userType:"",
userCreated:false,
emailId:"",
username:"",
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
      state.userCreated = false,
      state.emailId="",
      sessionStorage.removeItem("persist:root"),
      localStorage.removeItem("persist:root")




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
          state.emailId = action?.payload?.user?.email
          state.username =  action?.payload?.user?.username
          
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
            state.userCreated = false
          },
          fulfilled: (state, action: PayloadAction<any>) => {
            state.status = "idle";
            state.newUser="Created Successfully"
            state.userCreated = true
            //state.userDetails action?.payload;
           
          },
          rejected: (state) => {
            state.status = "isLoggedIn";
            state.userCreated = false
          },
        }
      ),
  
  }),

  selectors: {
    selectStatus: (users) => users.status,
    selectResult: (res) => res.status,
    selectNewUser: (res) => res.newUser,
    selectLoggedIn: (res) => res.isLoggedIn,
    selectUserId: (res) => res.userId,
    selectEmailId: (res) => res.emailId,
    selectUserType: (res) => res.userType,
    selectUserJwt: (res)=> res.jwtToken,
    selectUserDetails: (res)=> res.userDetails,
    selectUserCreated: (res)=> res.userCreated,
    selectUserName: (res)=> res.username

  },
});

export const {
  incrementByAmount,
  getuserLoginAsync,
  postNewUserAsync,
  userLogout
 
} = usersDataSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUserName,selectEmailId,selectStatus,selectUserCreated, selectResult, selectNewUser,selectLoggedIn,selectUserId,selectUserJwt,selectUserDetails,selectUserType } = usersDataSlice.selectors;


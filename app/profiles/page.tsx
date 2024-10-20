"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import ProfileTabs from "../components/ProfileTabs/ProfileTabs";
import PropertyListingForUsers from "../components/PropertyListingForUsers/PropertyListingForUsers";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import UserPage from "../components/profilePage/profilePage";
import Subscription from "../components/Subscription/Subscription";
import SettingsPage from "../components/settings/SettingsPage";
import { selectLoggedIn } from "@/lib/features/user/userDataSlice";
import ListingLoading from "../components/ListingLoading/ListingLoading";
import { useRouter } from "next/navigation";
import withAuth from "../components/ProtectedRoute/protectedAuth";
import ApprovalPage from "../components/Approval/ApprovalPage";
type Props = {};







const ProfileComponent = () => <div><UserPage></UserPage></div>;
const SecondComponent = () =>  <div><PropertyListingForUsers></PropertyListingForUsers></div>;
const ThirdComponent = () => <div><ProfileTabs></ProfileTabs></div>; 
const FourthComponent = () => <div><Subscription></Subscription></div>;
const FifthComponent = () => <div><SettingsPage></SettingsPage></div>;
const SixthComponent = () => <div><ApprovalPage></ApprovalPage></div>;


const DefaultComponent = () => <div><UserPage></UserPage></div>;

const ProfilesPage = (props: Props) => {
  const[property ,setProperty] = useState(false)
  const[listing ,setListing] = useState(false)
  const dispatch = useAppDispatch();
  //const count = useAppSelector();
  const router = useRouter();
  const uiHandlerTwo =()=>{
    setProperty(true)
   setListing(false)
  }

  let isLoggedIn = useAppSelector(selectLoggedIn);
  useEffect(() => {
    let jwt = localStorage.getItem("token");
    // if(!isLoggedIn){
    //   router.push("/")

    // }

  }, [isLoggedIn]);
  const [componentType, setComponentType] = useState('default');

  // Function to switch between components based on componentType
  const renderComponent = (type :any) => {
    switch (type) {
      case 'user':
        return <ProfileComponent />;
      case 'listing':
        return <SecondComponent />;
      case 'newlisting':
        return <ThirdComponent />;
        case 'subs':
          return <FourthComponent />;
          case 'settings':
          return <FifthComponent />;
          case 'approvals':
            return <SixthComponent />;
      default:
        return <DefaultComponent />;
    }
  }

  return (
    <div className="mt-24">
      <div className="flex h-screen bg-gray-100">
        <div className="hidden md:flex flex-col w-64 bg-gray-800">
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <span className="text-white font-bold uppercase">
              24 Hectors Dashboard
            </span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">
              <div
                 onClick={() => setComponentType('user')}
                className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
                Profile
              </div>
              <div
                onClick={() => setComponentType('listing')}
                
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
                My Listings
              </div>
              <div
               
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
                onClick={() => setComponentType('newlisting')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                  />
                </svg>
                New Property
              </div>

              <div
                onClick={() => setComponentType('subs')}
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>
                Subscription
              </div>

              <div
                onClick={() => setComponentType('settings')}
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Settings
              </div>
              <div
                onClick={() => setComponentType('approvals')}
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
             <svg width="26px" height="26px" className="h-6 w-6 mr-2" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fafafa"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.2926 2.29317C12.683 1.90249 13.3162 1.90225 13.7068 2.29262L16.7115 5.29492C16.8993 5.48257 17.0047 5.7372 17.0046 6.00269C17.0045 6.26817 16.8989 6.52272 16.7109 6.71023L13.7063 9.70792C13.3153 10.098 12.6821 10.0973 12.2921 9.70629C11.902 9.31531 11.9027 8.68215 12.2937 8.29208L13.5785 7.01027C9.07988 7.22996 5.5 10.9469 5.5 15.5C5.5 20.1944 9.30558 24 14 24C18.5429 24 22.254 20.4356 22.4882 15.9515C22.517 15.3999 22.9875 14.9762 23.539 15.005C24.0906 15.0338 24.5143 15.5043 24.4855 16.0558C24.1961 21.5969 19.6126 26 14 26C8.20101 26 3.5 21.299 3.5 15.5C3.5 9.8368 7.98343 5.22075 13.5945 5.00769L12.2932 3.70738C11.9025 3.31701 11.9023 2.68384 12.2926 2.29317Z" fill="#ffffff"></path> <path d="M18.2071 12.2929C18.5976 12.6834 18.5976 13.3166 18.2071 13.7071L13.2071 18.7071C13.0196 18.8946 12.7652 19 12.5 19C12.2348 19 11.9804 18.8946 11.7929 18.7071L9.79289 16.7071C9.40237 16.3166 9.40237 15.6834 9.79289 15.2929C10.1834 14.9024 10.8166 14.9024 11.2071 15.2929L12.5 16.5858L16.7929 12.2929C17.1834 11.9024 17.8166 11.9024 18.2071 12.2929Z" fill="#ffffff"></path> </g></svg>
                Approvals
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto">
          
    

   
          <div className="p-4">

            {isLoggedIn ===true ?( renderComponent(componentType)):(<ListingLoading/>)}
         
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ProfilesPage);

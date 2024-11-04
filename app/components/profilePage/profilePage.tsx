import React, { useEffect } from "react";
import { selectUserDetails, selectUserId, selectUserJwt } from "@/lib/features/user/userDataSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import BasicPie from "./Charts/PieChart";
import Days from "./Charts/Days";
import MontlyData from "./Charts/MontlyData";
import CommercialMonthlyData from "./Charts/CommercialMonthlyData";
import LinesDataChart from "./Charts/LinesDataChart";
import { Paper } from "@mui/material";
import NumberStats from "./NumberStats";
import { getCommercialCountAsync, getResidentialCountAsync, selectCommercialCount, selectPropertyCount, selectResidentialCount } from "@/lib/features/property/propertySlice";

const UserPage = () => {
  let userDetails = useAppSelector(selectUserDetails);
  let jwt = useAppSelector(selectUserJwt);
  let userId = useAppSelector(selectUserId);
  let createdDate = new Date(userDetails?.createdAt)?.toISOString();


  const dispatch = useAppDispatch()

  let commercialCount = useAppSelector(selectCommercialCount);
  let residentialCount = useAppSelector(selectResidentialCount);

  useEffect(()=>{
    dispatch(getCommercialCountAsync({userId,jwt}))
    dispatch(getResidentialCountAsync({userId,jwt}))

  },[])
  

  

  




  






  return (
    <div>
      <div className="p-2 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            {userDetails?.name || "User"}'s Dashboard
          </h2>
          <p className="text-sm text-gray-500">
            Your last login: 21h ago from {userDetails?.location || "unknown"}.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white p-2 rounded shadow">Last 7 days</button>
          <button className="bg-white p-2 rounded shadow">Export</button>
          <button className="bg-white p-2 rounded shadow">Info</button>
        </div>
      </div>
      <NumberStats />

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {/* Sessions By Channel (Pie Chart) */}
        <div className="col-span-1 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Commercial
          </h3>
          <BasicPie />
        </div>

        {/* Events (Line Chart) */}
        <div className="col-span-1 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Properties Posted by Month</h3>
          <LinesDataChart residentialCount={residentialCount} commercialCount={commercialCount}/>
        </div>

        {/* Device Stats */}
        <div className="col-span-1 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Email Stats</h3>
          <p className="text-sm text-gray-500">Uptime: 195 Days, 8 hours</p>
          <p className="text-sm text-gray-500">First Seen: {createdDate}</p>
          <p className="text-sm text-gray-500">Collected Time: {createdDate}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Memory Space</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "70%" }}></div>
            </div>
          </div>
        </div>

        {/* Sales Analytics (Line Chart) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Residential Property Created</h3>
          <MontlyData />
        </div>

        {/* Card Title (Statistics) */}
        <div className="col-span-1 bg-white p-4 rounded-lg shadow">

          <CommercialMonthlyData />
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserPage;

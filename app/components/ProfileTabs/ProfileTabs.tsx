import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProfileTabFormOne from "./ProfileTabFormOne";
import ProfileTabFormTwo from "./ProfileTabFormTwo";
import ProfileTabFormThree from "./ProfileTabFormThree";
import { Button } from "@mui/material";
import ProfileTabFormFour from "./ProfileTabFormFour";
import { postProprtyOfUser } from "@/lib/features/listing/ListingAPI";
type Props = {};

const ProfileTabs = (props: Props) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

 

  return (
    <div>
      {" "}
      <Box sx={{ width: "100%", typography: "body1",padding:"20px" }}>
        <ProfileTabFormOne/>
       
      </Box>
    </div>
  );
};

export default ProfileTabs;

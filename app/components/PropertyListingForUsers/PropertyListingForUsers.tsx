import React, { useState, useEffect, useMemo } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  TextField,
  MenuItem,
  Box,
  Select,
  InputLabel,
  FormControl,
  Stack,
  Paper,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getAllPropertiesImagesPostedByMeAsync,
  getAllPropertiesPostedByMeAsync,
  selectAllProperties,
  selectImageProperty,
} from "@/lib/features/property/propertySlice";
import { selectUserId, selectUserJwt } from "@/lib/features/user/userDataSlice";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropertyImageCard from "./PropertyImageCard";
import Loader from "./Loader";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


interface PropertyRow {
  id: number;
  owner_name: string;
  address: string;
  geo_location: string;
  door_number: string;
  patta_number: string;
  phone_number: string;
  pin_code: string | null;
  state: string;
  email: string;
  city: string;
  area: string;
  district: string;
  breadth: number;
  length: number;
  total_sq_ft?: number;
  property_type: string;
  real_estate_type: string;
  createdAt: string;
  updatedAt: string;
}

const AllMUIListings = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const jwt = useAppSelector(selectUserJwt);
  const allProperties = useAppSelector(selectAllProperties) || [];
  const imageProperties = useAppSelector(selectImageProperty) || [];


console.log("imageProperties",imageProperties)
  //console.log(allProperties?.property_image)

  const [rows, setRows] = useState<PropertyRow[]>([]);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [open, setOpen] = React.useState(false);
  const [currentPropertyId, setCurrentPropertyId] = useState<number | null>(null);

  const openedPropertyIds = useMemo(() => new Set<number>(), []);

  const handleOpen = (createdby_usedid: any, id: any, jwt: any) => {
    setCurrentPropertyId(id);

    // Only fetch images if they haven't been loaded for this property
    if (!openedPropertyIds.has(id)) {
      dispatch(getAllPropertiesImagesPostedByMeAsync({ createdby_usedid, id, jwt }));
      openedPropertyIds.add(id);
    }

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // Fetch data on component mount
    if (userId && jwt) {
      dispatch(getAllPropertiesPostedByMeAsync({ userId, jwt }));
    }
  }, [userId, jwt, dispatch]);

  useEffect(() => {
    // Filter and set data based on search and role filter
    const filteredData = allProperties
      .filter((row) => {
        const matchesSearch = row.district?.toLowerCase().includes(searchText.toLowerCase());
        const matchesRole = roleFilter === "All" || row.property_type === roleFilter;
        return matchesSearch && matchesRole;
      })
      .map((row) => ({ ...row, id: row.id })); // Ensure each row has an id

    setRows(filteredData);
  }, [allProperties, searchText, roleFilter]);

  const handleEdit = (id: number) => {
    alert(`Edit row with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    alert(`Deleted row with ID: ${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "owner_name", headerName: "Owner", width: 80 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "geo_location", headerName: "Location", width: 120 },
    { field: "door_number", headerName: "Door No", width: 80 },
    { field: "patta_number", headerName: "Patta Number", width: 80 },
    { field: "phone_number", headerName: "Phone", width: 120 },
    { field: "pin_code", headerName: "Pin Code", width: 80 },
    { field: "area", headerName: "Area", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "district", headerName: "District", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "breadth", headerName: "Breadth", width: 80 },
    { field: "length", headerName: "Length", width: 80 },
    { field: "total_sq_ft", headerName: "Sq.Feet", width: 100 },
    { field: "property_type", headerName: "Type", width: 100 },
    { field: "real_estate_type", headerName: "SubType", width: 100 },
    { field: "createdAt", headerName: "Created", width: 150 },
    { field: "updatedAt", headerName: "Last Updated", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      sortable: false,
      renderCell: (params: { row: { id: number } }) => (
        <Stack direction="row" spacing={1}>
           <Button        
           variant="contained"
            size="small"
            color="secondary" onClick={()=>handleOpen(userId,params.row.id ,jwt)}>View Images</Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
         
        </Stack>
      ),
    },
  ];


 
const ModalImageData = ()=>{
  return(
    <div>
      
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <PropertyImageCard imageProperties={imageProperties}/>

      </Box>
    </Modal>
  </div>

  )
}



  

  return (
    <Paper>
      <ModalImageData />
      

      <Box sx={{ height: 600, width: "100%", margin: "50px auto" }}>
        <TextField
          label="Search by District"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ marginBottom: 2 }}
          fullWidth
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Filter by Role</InputLabel>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            label="Filter by Role"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Residential">Residential</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          slots={{ toolbar: GridToolbar }}
          pageSizeOptions={[5, 10, 20]}
        />
      </Box>
    </Paper>
  );
};

export default AllMUIListings;

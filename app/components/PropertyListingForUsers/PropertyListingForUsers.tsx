import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  TextField,
  MenuItem,
  Box,
  Select,
  InputLabel,
  FormControl,
  Button,
  Stack,
  Paper,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getpropertyListingAsync,
  selectPropertyListing,
} from "@/lib/features/property/propertySlice";
import { selectUserId, selectUserJwt } from "@/lib/features/user/userDataSlice";


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
  const jwtToken = useAppSelector(selectUserJwt);
  const myListingData = useAppSelector(selectPropertyListing);
  const [rows, setRows] = useState<PropertyRow[]>([]);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  useEffect(() => {
    // Fetch data on component mount
    if (userId && jwtToken) {
      dispatch(getpropertyListingAsync({ userId, jwtToken }));
    }
  }, [userId, jwtToken, dispatch]);

  useEffect(() => {
    // Filter and flatten the data from `myListingData`
    const filteredData = myListingData
      .filter((row) => {
        const matchesSearch = row?.attributes?.district
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        const matchesRole = roleFilter === "All" || row.attributes?.property_type === roleFilter;
        return matchesSearch && matchesRole;
      })
      .map((row) => ({ ...row.attributes, id: row.id }));

    setRows(filteredData);
  }, [myListingData, searchText, roleFilter]);

  const handleEdit = (id: any) => {
    alert(`Edit row with ID: ${id}`);
  };

  const handleDelete = (id: any) => {
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
      width: 200,
      sortable: false,
      renderCell: (params: { row: { id: any; }; }) => (
        <Stack direction="row" spacing={1}>
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

  return (
    <Paper>
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

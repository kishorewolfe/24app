import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  getpropertyListingAsync,
  propertyFetchAsync,
  selectPropertyListing,
} from "@/lib/features/property/propertySlice";
import { incrementAsync } from "@/lib/features/counter/counterSlice";
import { getFetchProprtyOfUser } from "@/lib/features/property/propertyAPI";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { selectLoggedIn, selectUserId, selectUserJwt } from "@/lib/features/user/userDataSlice";

{
  /* <td>{data[i]?.attributes?.owner_name}</td>
<td>{data[i]?.attributes?.heirs_details}</td>
<td>{data[i]?.attributes?.address}</td>
<td>{data[i]?.attributes?.geo_location}</td>
<td>{data[i]?.attributes?.door_number}</td>
<td>{data[i]?.attributes?.posted_by}</td> */
}

interface Data {
  id: number;
  owner_name: string;
  heir_details: string;
  geo_location: string;
  address: number;
  door_number: string;
  posted_by: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

// id: number;
// owner_name: string;
// heir_details: string;
// geo_location:string;
// address: number;
// door_number: string;
// posted_by: string;
const headCells: readonly HeadCell[] = [
  {
    id: "owner_name",
    numeric: false,
    disablePadding: true,
    label: "Owner Name",
  },
  {
    id: "heir_details",
    numeric: true,
    disablePadding: false,
    label: "Heir Details",
  },
  {
    id: "geo_location",
    numeric: true,
    disablePadding: false,
    label: "Geo Location",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "door_number",
    numeric: true,
    disablePadding: false,
    label: "Door number",
  }, //posted_by
  {
    id: "posted_by",
    numeric: true,
    disablePadding: false,
    label: "Posted by",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps {
  numSelected: number;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          My Lisitngs
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default function PropertyListingForUsers() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [jwtData, setJwtData] = React.useState("");

  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useAppDispatch();
  const listingData = useAppSelector(selectPropertyListing);
  const rowsData: Data[][] = [];
  let isLoggedIn = useAppSelector(selectLoggedIn);
  let userId = useAppSelector(selectUserId)
  let jwtToken = useAppSelector(selectUserJwt)


  // Avoid a layout jump when reaching the last page with empty rows.

  // .sort(getComparator(order, orderBy))
  function createData(
    id: number,
    owner_name: string,
    heir_details: string,
    geo_location: string,
    address: number,
    door_number: string,
    posted_by: string
  ): Data {
    return {
      id,
      owner_name,
      heir_details,
      geo_location,
      address,
      door_number,
      posted_by,
    };
  }

  let ans: any[];
  ans = useSelector(selectPropertyListing);

  useEffect(() => {
    dispatch(getpropertyListingAsync({userId ,jwtToken}));
  }, [dispatch,userId ,jwtToken]);
  let totalCount = ans?.length;

  rowsData.push(
    ans?.map((data: any, i) => {
      console.log(
        "dataListing" + JSON.stringify(data?.attributes?.owner_name)
      );
      return createData(
        data?.id,
        data?.attributes?.owner_name,
        data?.attributes?.heirs_details,
        data?.attributes?.address,
        data?.attributes?.geo_location,
        data?.attributes?.door_number,
        data?.attributes?.posted_by
      );
    })
  );


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsData.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rowsData].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  let i = 0;
  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      setJwtData(jwt);
    }
  }, []);





  if(!isLoggedIn && jwtData===""){
    return <h1>Please Login To Continue</h1>
  }


  return (
   <Box sx={{ width: "100%" }}>
   <Paper>
     <div className="bg-gray-200 ">
       <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-20">
         <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
           <div className="space-y-2">
             <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
               <span>Posted By Me</span>
             </div>

             <div className="text-3xl dark:text-gray-100">{totalCount}</div>

             <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
               <span>32k increase</span>

               <svg
                 className="w-4 h-4"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20"
                 fill="currentColor"
                 aria-hidden="true"
               >
                 <path
                   fillRule="evenodd"
                   d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                   clipRule="evenodd"
                 ></path>
               </svg>
             </div>
           </div>
         </div>

         <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
           <div className="space-y-2">
             <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
               <span>Viewed By</span>
             </div>

             <div className="text-3xl dark:text-gray-100">1340</div>

             <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-red-600">
               <span>3% decrease</span>

               <svg
                 className="w-4 h-4"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20"
                 fill="currentColor"
                 aria-hidden="true"
               >
                 <path
                   fillRule="evenodd"
                   d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                   clipRule="evenodd"
                 ></path>
               </svg>
             </div>
           </div>
         </div>

         <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
           <div className="space-y-2">
             <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
               <span>Mails Sent</span>
             </div>

             <div className="text-3xl dark:text-gray-100">3543</div>

             <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
               <span>7% increase</span>

               <svg
                 className="w-4 h-4"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20"
                 fill="currentColor"
                 aria-hidden="true"
               >
                 <path
                   fillRule="evenodd"
                   d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                   clipRule="evenodd"
                 ></path>
               </svg>
             </div>
           </div>
         </div>
       </div>
     </div>
   </Paper>

   <div className="p-8 bg-gray-200 ">
     <TableContainer component={Paper}>
       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
         <TableHead>
           <TableRow>
             <TableCell>ID</TableCell>

             <TableCell align="right">OWner Name</TableCell>
             <TableCell align="right">Heir Details</TableCell>
             <TableCell align="right">Address</TableCell>
             <TableCell align="right">Geo Location</TableCell>
             <TableCell align="right">Door Number</TableCell>
             <TableCell align="right">Posted By</TableCell>
             <TableCell align="right">Action</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {ans?.map((row: any, index: any) => (
             <TableRow
               key={row?.id}
               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
             >
               <TableCell component="th" scope="row">
                 {row?.id}
               </TableCell>
               <TableCell align="right">
                 {row?.attributes?.owner_name}
               </TableCell>
               <TableCell align="right">
                 {row?.attributes?.heirs_details}
               </TableCell>
               <TableCell align="right">
                 {row?.attributes?.address}
               </TableCell>
               <TableCell align="right">
                 {row?.attributes?.geo_location}
               </TableCell>
               <TableCell align="right">
                 {row?.attributes?.door_number}
               </TableCell>
               <TableCell align="right">
                 {row?.attributes?.posted_by}
               </TableCell>
               <TableCell align="right">
                 <Button variant="outlined" color="error">
                   Delete
                 </Button>
               </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
   </div>
 </Box> 
  );
}
function useState(arg0: string): [any, any] {
  throw new Error("Function not implemented.");
}


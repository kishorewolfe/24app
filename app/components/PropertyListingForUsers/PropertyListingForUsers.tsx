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
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { selectLoggedIn, selectUserId, selectUserJwt } from "@/lib/features/user/userDataSlice";
interface Data {
  id: number;
  owner_name: string;
  heir_details: string;
  geo_location: string;
  address: number;
  door_number: string;
  posted_by: string;
}
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
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("id");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useAppDispatch();
  const listingData = useAppSelector(selectPropertyListing);
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const userId = useAppSelector(selectUserId);
  const jwtToken = useAppSelector(selectUserJwt);

  useEffect(() => {
    dispatch(getpropertyListingAsync({ userId, jwtToken }));
  }, [dispatch, userId, jwtToken]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = listingData?.map((data: any) => createData(
    data?.id,
    data?.attributes?.owner_name,
    data?.attributes?.heirs_details,
    data?.attributes?.geo_location,
    data?.attributes?.address,
    data?.attributes?.door_number,
    data?.attributes?.posted_by
  )) || [];

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }
  let totalCount = rows?.length;
  return (
    <>
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
    <Box sx={{ width: "100%" }}>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.owner_name}</TableCell>
                  <TableCell>{row.heir_details}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.geo_location}</TableCell>
                  <TableCell>{row.door_number}</TableCell>
                  <TableCell>{row.posted_by}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary">Update</Button>
                    <Button variant="outlined" color="error" sx={{ marginLeft: 1 }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box></>
  );
}

function createData(
  id: number,
  owner_name: string,
  heir_details: string,
  geo_location: string,
  address: number,
  door_number: string,
  posted_by: string
): Data {
  return { id, owner_name, heir_details, geo_location, address, door_number, posted_by };
}







import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectUserId, selectUserJwt } from '@/lib/features/user/userDataSlice';
import { changeStateToEmpty, getApprovalsAsync, getPropertiesForApprovalListingAsync, selecModalPostListing, selectApprovalsListing } from '@/lib/features/approvals/ApprovalSlice';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
interface Data {
  id: number;
  name: string;
  age: number;
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


// {
//     "id": 9,
//     "attributes": {
//         "requestedById": "2",
//         "owner_userId": "1",
//         "product_id": "3",
//         "createdAt": "2024-09-17T19:07:19.905Z",
//         "updatedAt": "2024-09-17T19:07:19.905Z",
//         "publishedAt": "2024-09-17T19:07:19.894Z"
//     }
//}

const ApprovalPage = () => {
    let jwt = useAppSelector(selectUserJwt)
    let userId = useAppSelector(selectUserId)
    let approvals = useAppSelector(selectApprovalsListing)
    let approvalPostForModal = useAppSelector(selecModalPostListing)
    const dispatch = useAppDispatch()
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id:any) => {
    dispatch(getPropertiesForApprovalListingAsync({id,jwt}))
    setOpen(true)};

  const handleClose = () => {
    dispatch(changeStateToEmpty())

    setOpen(false)
};

  const initialData: any[] = 
    approvals;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleActionClick = (id: number) => {
    toast(`Email Sent Successfully! ${id} `)
  };

  const paginatedData = initialData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(()=>{
    dispatch(getApprovalsAsync({userId,jwt}))

  },[])




//   {
//     "id": 3,
//     "attributes": {
//         "owner_name": "arun",
//         "heirs_details": "user1,user2",
//         "address": "Vadapalani",
//         "geo_location": "https://maps.app.goo.gl/6vk7jdJyG8JVWrMw7",
//         "door_number": "23",
//         "posted_by": "AGENT",
//         "createdby_usedid": "1",
//         "patta_number": "1313",
//         "phone_number": "80000000",
//         "pin_code": "600000",
//         "state": "TN",
//         "email": "arun@gmail.com",
//         "city": "chennai",
//         "createdAt": "2024-09-08T09:00:58.969Z",
//         "updatedAt": "2024-09-14T16:54:03.051Z",
//         "publishedAt": "2024-09-08T09:00:58.953Z"
//     }
// }






  return (
    <>
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
         Owner Name:  {approvalPostForModal?.attributes?.owner_name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
       Address :   {approvalPostForModal?.attributes?.address}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {approvalPostForModal?.attributes?.door_number} {", "}  {approvalPostForModal?.attributes?.city} {", "} 
          {approvalPostForModal?.attributes?.state} {", "}  {approvalPostForModal?.attributes?.pin_code}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Email: {approvalPostForModal?.attributes?.email} {", "}  
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Patta Number: {approvalPostForModal?.attributes?.patta_number} {", "}  
          </Typography>
        </Box>
      </Modal>
    
    
    
      <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Requested By User ID</TableCell>
              <TableCell>Post ID</TableCell>
              <TableCell>Posted By</TableCell>
              <TableCell align="center">View Listing</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row?.attributes?.requestedById}</TableCell>
                <TableCell>{row?.attributes?.product_id}</TableCell>
                <TableCell>{row?.attributes?.usertype}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    // onClick={() => handleActionClick(row.id)}
                    onClick={()=>handleOpen(row?.attributes?.product_id)}
                  >
                    View Post
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleActionClick(row.id)}
                  >
                    Send Mail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={initialData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
    
    
    
    
    
    
    
    
    </>
   
  );
};

export default ApprovalPage;

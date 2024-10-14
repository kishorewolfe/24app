import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px' }}>
      {/* Modern Living Room */}
      <div>
        <h3>Modern Living Room</h3>
        <Image 
          src="/assets/sample/sofa.jpg" 
          alt="Modern minimalist living room" 
          width={300} 
          height={300} 
          priority
        />
      </div>

      {/* Tropical Beach */}
      <div>
        <h3>Tropical Beach</h3>
        <Image 
           src="/assets/sample/tree.jpg" 
          alt="Tropical beach with palm trees and crystal-clear water" 
          width={300} 
          height={300} 
        />
      </div>

      {/* Workspace Setup */}
      <div>
        <h3>Workspace Setup</h3>
        <Image 
          src="/assets/tree/tree.jpg" 
          alt="Flat-lay workspace with a laptop, notebook, and coffee" 
          width={300} 
          height={300} 
        />
      </div>
    </div>
        </Box>
      </Modal>
    </div>
  );
}

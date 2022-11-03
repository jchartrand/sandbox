import React from 'react';
import { QrReader } from 'react-qr-reader';
import { useState } from 'react';
import { Result } from '@zxing/library';
import {
  Box,
  Button,
  Modal,
  Typography,
} from "@mui/material";

type PropsType = {
  onScan: (result: string) => void;
  setErrorMessage: (scanError: boolean) => void;
}

export const ScanModal = ({ onScan, setErrorMessage }: PropsType) => {
  
  const handleScan = (newData?: Result | null, error?: Error | null) => {
    if (newData){
      onScan(newData.getText());
      closeModal();
    }

    if (error){
      // console.log("error");
      setErrorMessage(true)
    }
  }
 
  function closeModal() {
    setOpen(false);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button onClick={handleOpen}>Scan a QR code</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <QrReader 
            onResult={(result, error) => handleScan(result, error)}
            constraints={{facingMode: "environment"}}
          />
        </Box>
      </Modal>

    </Box>
  )
}
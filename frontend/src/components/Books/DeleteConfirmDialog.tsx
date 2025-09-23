import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import {
  Close as CloseIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { DeleteConfirmDialogProps } from '../../types';

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  bookTitle,
  onClose,
  onConfirm
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <DialogTitle sx={{
        fontFamily: 'Literata',
        fontSize: '1.25rem',
        fontWeight: 600,
        pb: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        Delete Book
        <IconButton
          onClick={onClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <WarningIcon sx={{ color: '#ff9800', fontSize: 24, mt: 0.5 }} />
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Are you sure you want to delete this book?
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
              "{bookTitle}"
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
              This action cannot be undone. All associated notes and data will be permanently removed.
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: '#666',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#000',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: '#d32f2f',
            color: 'white',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#b71c1c',
            },
          }}
        >
          Delete Book
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
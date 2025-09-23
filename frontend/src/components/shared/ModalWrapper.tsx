import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  DialogProps
} from '@mui/material';
import {
  Close as CloseIcon
} from '@mui/icons-material';

interface ModalWrapperProps extends Omit<DialogProps, 'open' | 'onClose'> {
  open: boolean;
  onClose: () => void;
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  onClose,
  title,
  actions,
  children,
  showCloseButton = true,
  maxWidth = 'sm',
  ...dialogProps
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
      {...dialogProps}
    >
      <DialogTitle sx={{
        fontFamily: 'Literata',
        fontSize: '1.5rem',
        fontWeight: 600,
        pb: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {title}
        {showCloseButton && (
          <IconButton
            onClick={onClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {children}
      </DialogContent>

      {actions && (
        <DialogActions sx={{ p: 3, pt: 2 }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ModalWrapper;
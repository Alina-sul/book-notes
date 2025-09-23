import React from 'react';
import {
  TextField,
  TextFieldProps
} from '@mui/material';

interface FormFieldProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'standard' | 'outlined' | 'filled';
}

const FormField: React.FC<FormFieldProps> = ({
  variant = 'outlined',
  sx,
  ...props
}) => {
  return (
    <TextField
      variant={variant}
      fullWidth
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#000',
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#000',
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default FormField;
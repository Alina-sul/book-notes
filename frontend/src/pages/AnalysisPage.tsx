import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AnalysisPage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h3" component="h1" sx={{ fontFamily: 'Literata', mb: 2 }}>
          📊 Reading Analysis
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Reading analysis page coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default AnalysisPage;
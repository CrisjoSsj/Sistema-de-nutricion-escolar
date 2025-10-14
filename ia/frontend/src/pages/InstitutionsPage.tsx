import React from 'react';
import { Typography, Box } from '@mui/material';

const InstitutionsPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestión de Instituciones
      </Typography>
      <Typography variant="body1">
        Aquí el superadmin puede crear y gestionar instituciones educativas.
      </Typography>
    </Box>
  );
};

export default InstitutionsPage;
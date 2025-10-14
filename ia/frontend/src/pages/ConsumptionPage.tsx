import React from 'react';
import { Typography, Box } from '@mui/material';

const ConsumptionPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Registro de Consumo
      </Typography>
      <Typography variant="body1">
        Aquí los estudiantes pueden registrar su consumo y los nutriólogos supervisar.
      </Typography>
    </Box>
  );
};

export default ConsumptionPage;
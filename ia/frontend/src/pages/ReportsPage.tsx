import React from 'react';
import { Typography, Box } from '@mui/material';

const ReportsPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reportes y Estadísticas
      </Typography>
      <Typography variant="body1">
        Aquí se pueden generar reportes nutricionales y estadísticas de consumo.
      </Typography>
    </Box>
  );
};

export default ReportsPage;
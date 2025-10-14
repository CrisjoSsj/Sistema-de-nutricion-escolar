import React from 'react';
import { Typography, Box } from '@mui/material';

const StudentsPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestión de Estudiantes
      </Typography>
      <Typography variant="body1">
        Aquí se pueden gestionar los datos biométricos y perfiles de estudiantes.
      </Typography>
    </Box>
  );
};

export default StudentsPage;
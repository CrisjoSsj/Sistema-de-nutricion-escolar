import React from 'react';
import { Typography, Box } from '@mui/material';

const MenusPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestión de Menús
      </Typography>
      <Typography variant="body1">
        Aquí los nutriólogos pueden crear menús base y los estudiantes ver sus menús personalizados.
      </Typography>
    </Box>
  );
};

export default MenusPage;
import React from 'react';
import { Typography, Box } from '@mui/material';

const UsersPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>
      <Typography variant="body1">
        Aquí se pueden gestionar usuarios del sistema (nutriólogos, estudiantes, padres).
      </Typography>
    </Box>
  );
};

export default UsersPage;
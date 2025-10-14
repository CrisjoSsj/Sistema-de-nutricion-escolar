import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Estudiante
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Hola {user?.first_name}. Aquí puedes ver tu menú personalizado y registrar tu consumo.
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tus Funcionalidades
          </Typography>
          <ul>
            <li>Consultar tu menú personalizado del día</li>
            <li>Registrar si consumiste o rechazaste alimentos en el comedor</li>
            <li>Ver tu historial de consumo</li>
            <li>Recibir recomendaciones nutricionales</li>
            <li>Escanear códigos QR para registro rápido</li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentDashboard;
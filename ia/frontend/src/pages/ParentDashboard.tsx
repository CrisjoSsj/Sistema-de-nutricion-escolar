import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Padre de Familia
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Bienvenido {user?.first_name}. Aquí puedes supervisar la alimentación de tu hijo en la escuela.
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Información Disponible
          </Typography>
          <ul>
            <li>Ver menús consumidos por tu hijo en la institución</li>
            <li>Recibir reportes nutricionales semanales/mensuales</li>
            <li>Recibir notificaciones si el niño no consume ciertos grupos alimenticios</li>
            <li>Enviar comentarios al nutriólogo</li>
            <li>Ver tendencias de consumo y recomendaciones</li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ParentDashboard;
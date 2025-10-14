import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const NutritionistDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Nutriólogo
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Bienvenido {user?.first_name}. Desde aquí puedes gestionar menús y supervisar el consumo de los estudiantes.
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Funcionalidades del Nutriólogo
          </Typography>
          <ul>
            <li>Definir menús base para la institución</li>
            <li>Ver porciones automáticamente ajustadas por estudiante</li>
            <li>Supervisar registros de consumo en el comedor</li>
            <li>Acceder a estadísticas de cumplimiento</li>
            <li>Recibir alertas internas</li>
            <li>Generar reportes nutricionales</li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NutritionistDashboard;
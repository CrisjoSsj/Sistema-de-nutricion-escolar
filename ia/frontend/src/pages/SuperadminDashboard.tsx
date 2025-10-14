import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Alert,
} from '@mui/material';
import {
  Business,
  People,
  School,
  TrendingUp,
  Add,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import type { Institution, DashboardStats } from '../types';

const SuperadminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const { user } = useAuth();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // Simulamos datos por ahora hasta que el backend esté funcionando
        setStats({
          total_students: 120,
          total_menus: 15,
          daily_consumption_rate: 85.5,
          weekly_consumption_trend: [],
          food_group_consumption: []
        });
        setInstitutions([
          {
            id: 1,
            name: 'Escuela Primaria El Futuro',
            address: 'Av. Educación 123, Ciudad',
            phone: '+1234567890',
            email: 'contacto@escuelafuturo.edu',
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]);
      } catch (err: any) {
        setError('Error al cargar los datos del dashboard');
        console.error('Dashboard loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Cargando dashboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard Superadministrador
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bienvenido {user?.first_name}. Aquí puedes supervisar todas las instituciones y obtener reportes globales.
        </Typography>
      </Box>

      {/* Estadísticas principales */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Business sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h4" component="div">
                  {institutions.length}
                </Typography>
                <Typography color="text.secondary">
                  Instituciones
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <School sx={{ fontSize: 40, color: 'secondary.main' }} />
              <Box>
                <Typography variant="h4" component="div">
                  {stats?.total_students || 0}
                </Typography>
                <Typography color="text.secondary">
                  Total Estudiantes
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <People sx={{ fontSize: 40, color: 'green' }} />
              <Box>
                <Typography variant="h4" component="div">
                  {stats?.total_menus || 0}
                </Typography>
                <Typography color="text.secondary">
                  Total Menús
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TrendingUp sx={{ fontSize: 40, color: 'blue' }} />
              <Box>
                <Typography variant="h4" component="div">
                  {stats?.daily_consumption_rate ? `${stats.daily_consumption_rate.toFixed(1)}%` : '0%'}
                </Typography>
                <Typography color="text.secondary">
                  Consumo Promedio
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Lista de instituciones */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Instituciones Registradas
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                console.log('Crear nueva institución');
              }}
            >
              Nueva Institución
            </Button>
          </Box>
          
          {institutions.length === 0 ? (
            <Typography color="text.secondary">
              No hay instituciones registradas
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {institutions.map((institution) => (
                <Card key={institution.id} variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {institution.name}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {institution.address}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Button size="small" variant="outlined">
                        Ver Detalles
                      </Button>
                      <Button size="small" variant="outlined">
                        Reportes
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Acciones rápidas */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Card sx={{ flex: 1, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Acciones Rápidas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button variant="outlined" fullWidth>
                Generar Reporte Global
              </Button>
              <Button variant="outlined" fullWidth>
                Gestionar Instituciones
              </Button>
              <Button variant="outlined" fullWidth>
                Ver Estadísticas Avanzadas
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Alertas del Sistema
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Alert severity="info">
                Sistema funcionando correctamente
              </Alert>
              <Alert severity="warning">
                3 instituciones requieren actualización de menús
              </Alert>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SuperadminDashboard;
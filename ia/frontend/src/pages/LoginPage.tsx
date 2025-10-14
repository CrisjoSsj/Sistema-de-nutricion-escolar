import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Restaurant,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { LoginRequest } from '../types';

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: keyof LoginRequest) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    setError(''); // Limpiar error al escribir
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ minWidth: 400, borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Restaurant
                sx={{
                  fontSize: 48,
                  color: 'primary.main',
                  mb: 2,
                }}
              />
              <Typography component="h1" variant="h4" gutterBottom>
                Sistema de Nutrición Escolar
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                Gestión integral de alimentación en instituciones educativas
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={credentials.email}
                onChange={handleInputChange('email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleInputChange('password')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Usuarios de prueba:
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                <strong>Superadmin:</strong> admin@sistema.com / admin123
              </Typography>
              <Typography variant="caption" display="block">
                <strong>Nutriólogo:</strong> nutri@escuela.com / nutri123
              </Typography>
              <Typography variant="caption" display="block">
                <strong>Estudiante:</strong> estudiante@escuela.com / est123
              </Typography>
              <Typography variant="caption" display="block">
                <strong>Padre:</strong> padre@correo.com / padre123
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;
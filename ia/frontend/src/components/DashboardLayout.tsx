import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Business,
  People,
  School,
  Restaurant,
  Assessment,
  ExitToApp,
  Person,
  ChevronLeft,
  Notifications,
  BarChart,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

const drawerWidth = 240;

interface MenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
  roles: string[];
}

const menuItems: MenuItem[] = [
  {
    text: 'Dashboard',
    icon: <Dashboard />,
    path: '/dashboard',
    roles: ['superadmin', 'nutritionist', 'student', 'parent'],
  },
  {
    text: 'Instituciones',
    icon: <Business />,
    path: '/institutions',
    roles: ['superadmin'],
  },
  {
    text: 'Usuarios',
    icon: <People />,
    path: '/users',
    roles: ['superadmin', 'nutritionist'],
  },
  {
    text: 'Estudiantes',
    icon: <School />,
    path: '/students',
    roles: ['superadmin', 'nutritionist'],
  },
  {
    text: 'Menús',
    icon: <Restaurant />,
    path: '/menus',
    roles: ['superadmin', 'nutritionist', 'student'],
  },
  {
    text: 'Consumo',
    icon: <BarChart />,
    path: '/consumption',
    roles: ['nutritionist', 'student'],
  },
  {
    text: 'Reportes',
    icon: <Assessment />,
    path: '/reports',
    roles: ['superadmin', 'nutritionist', 'parent'],
  },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const getRoleLabel = (role: string) => {
    const roleLabels: { [key: string]: string } = {
      superadmin: 'Superadministrador',
      nutritionist: 'Nutriólogo',
      student: 'Estudiante',
      parent: 'Padre de Familia',
    };
    return roleLabels[role] || role;
  };

  const filteredMenuItems = menuItems.filter((item) =>
    user ? item.roles.includes(user.role) : false
  );

  const drawer = (
    <div>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Restaurant color="primary" />
          <Typography variant="h6" noWrap component="div" color="primary">
            NutriEscolar
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {filteredMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) {
                  setMobileOpen(false);
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Sistema de Nutrición Escolar
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            
            <IconButton onClick={handleMenuClick} color="inherit">
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                {user?.first_name.charAt(0)}
              </Avatar>
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {user?.first_name} {user?.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {getRoleLabel(user?.role || '')}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Mi Perfil
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToApp fontSize="small" />
                </ListItemIcon>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          backgroundColor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
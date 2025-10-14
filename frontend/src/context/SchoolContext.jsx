import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';

const SchoolContext = createContext();

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool debe ser usado dentro de SchoolProvider');
  }
  return context;
};

export const SchoolProvider = ({ children }) => {
  const { user } = useAuth();
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Información de la empresa (nivel corporativo)
  const defaultCompanyInfo = {
    name: 'NutriEscolar Corp',
    description: 'Sistema integral de nutrición escolar',
    website: 'www.nutriescolar.com',
    email: 'info@nutriescolar.com',
    phone: '+57 300 123 4567',
    address: 'Calle 100 #45-67, Bogotá, Colombia',
    socialMedia: {
      facebook: 'facebook.com/nutriescolar',
      twitter: '@nutriescolar',
      instagram: '@nutriescolar'
    }
  };

  // Base de datos mock de escuelas con su información personalizada
  const schoolsDatabase = {
    'escuela-primaria-1': {
      id: 'escuela-primaria-1',
      name: 'Escuela Primaria Umiña',
      shortName: 'Umiña',
      logo: '/logos/umina-logo.svg', // Ruta del logo
      colors: {
        primary: '#2563eb',
        secondary: '#059669',
        accent: '#dc2626'
      },
      contact: {
        director: 'Dra. Ana García',
        email: 'contacto@umina.edu.co',
        phone: '+57 300 111 2233',
        address: 'Av. Principal 123, Umiña, Colombia'
      },
      description: 'Educación integral para el desarrollo de nuestros niños',
      motto: 'Creciendo juntos hacia el futuro',
      level: 'Primaria',
      studentsCount: 450,
      foundedYear: 1985
    },
    'escuela-secundaria-central': {
      id: 'escuela-secundaria-central',
      name: 'Colegio Central',
      shortName: 'Central',
      logo: '/logos/central-logo.svg',
      colors: {
        primary: '#7c3aed',
        secondary: '#0891b2',
        accent: '#ea580c'
      },
      contact: {
        director: 'Prof. Carlos Mendoza',
        email: 'admin@central.edu.co',
        phone: '+57 300 444 5566',
        address: 'Calle 45 #678, Ciudad Central'
      },
      description: 'Formando líderes del mañana',
      motto: 'Excelencia académica y valores',
      level: 'Secundaria',
      studentsCount: 680,
      foundedYear: 1972
    },
    'instituto-tecnico-norte': {
      id: 'instituto-tecnico-norte',
      name: 'Instituto Técnico del Norte',
      shortName: 'ITN',
      logo: '/logos/itn-logo.svg',
      colors: {
        primary: '#059669',
        secondary: '#7c2d12',
        accent: '#9333ea'
      },
      contact: {
        director: 'Ing. María Fernández',
        email: 'direccion@itn.edu.co',
        phone: '+57 300 777 8899',
        address: 'Boulevard Norte 890, Zona Norte'
      },
      description: 'Tecnología e innovación al servicio de la educación',
      motto: 'Preparando profesionales del futuro',
      level: 'Técnica',
      studentsCount: 320,
      foundedYear: 1995
    }
  };

  // Función para obtener información de la escuela basada en el usuario
  const getSchoolInfo = async (userId, userSchool) => {
    try {
      setIsLoading(true);
      
      // Simular llamada a API - en la realidad esto vendría del backend
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Determinar qué escuela mostrar basado en el usuario
      let schoolKey = 'escuela-primaria-1'; // Por defecto
      
      if (userSchool) {
        // Mapear el nombre de la escuela del usuario a nuestra base de datos
        if (userSchool.includes('Central')) {
          schoolKey = 'escuela-secundaria-central';
        } else if (userSchool.includes('Técnico') || userSchool.includes('Norte')) {
          schoolKey = 'instituto-tecnico-norte';
        } else if (userSchool.includes('Umiña') || userSchool.includes('Primaria #1')) {
          schoolKey = 'escuela-primaria-1';
        }
      }
      
      const school = schoolsDatabase[schoolKey];
      if (school) {
        setSchoolInfo(school);
      }
      
      setCompanyInfo(defaultCompanyInfo);
      
    } catch (error) {
      console.error('Error al cargar información de la escuela:', error);
      // Usar información por defecto en caso de error
      setSchoolInfo(schoolsDatabase['escuela-primaria-1']);
      setCompanyInfo(defaultCompanyInfo);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar información cuando el usuario cambie
  useEffect(() => {
    if (user) {
      getSchoolInfo(user.id, user.school);
    } else {
      setSchoolInfo(null);
      setCompanyInfo(defaultCompanyInfo);
      setIsLoading(false);
    }
  }, [user]);

  // Función para actualizar el tema visual basado en los colores de la escuela
  const applySchoolTheme = (colors) => {
    if (colors && document.documentElement) {
      document.documentElement.style.setProperty('--school-primary', colors.primary);
      document.documentElement.style.setProperty('--school-secondary', colors.secondary);
      document.documentElement.style.setProperty('--school-accent', colors.accent);
    }
  };

  // Aplicar tema cuando la información de la escuela cambie
  useEffect(() => {
    if (schoolInfo?.colors) {
      applySchoolTheme(schoolInfo.colors);
    }
  }, [schoolInfo]);

  const value = {
    schoolInfo,
    companyInfo,
    currentSchool: schoolInfo, // Alias para compatibilidad
    isLoading,
    refreshSchoolInfo: () => {
      if (user) {
        getSchoolInfo(user.id, user.school);
      }
    },
    // Función helper para obtener el logo con fallback
    getSchoolLogo: () => {
      return schoolInfo?.logo || '/logos/default-school.png';
    },
    // Función helper para obtener colores con fallback
    getSchoolColors: () => {
      return schoolInfo?.colors || {
        primary: '#2563eb',
        secondary: '#059669',
        accent: '#dc2626'
      };
    }
  };

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  );
};
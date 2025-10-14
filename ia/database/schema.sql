-- Sistema de Nutrición Escolar - Esquema de Base de Datos para Supabase

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de instituciones
CREATE TABLE institutions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(120),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('superadmin', 'nutritionist', 'student', 'parent')) NOT NULL,
    institution_id INTEGER REFERENCES institutions(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de estudiantes
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    student_code VARCHAR(20) UNIQUE NOT NULL,
    birth_date DATE NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F')) NOT NULL,
    weight DECIMAL(5,2), -- en kg
    height DECIMAL(5,2), -- en cm
    grade VARCHAR(20) NOT NULL,
    section VARCHAR(10),
    allergies TEXT,
    special_diet TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de relación padre-estudiante (many-to-many)
CREATE TABLE parent_student (
    parent_id INTEGER REFERENCES users(id),
    student_id INTEGER REFERENCES students(id),
    PRIMARY KEY (parent_id, student_id)
);

-- Tabla de alimentos
CREATE TABLE foods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    food_group VARCHAR(20) CHECK (food_group IN ('proteins', 'carbohydrates', 'vegetables', 'fruits', 'dairy', 'fats')) NOT NULL,
    calories_per_100g DECIMAL(6,2) NOT NULL,
    proteins_per_100g DECIMAL(6,2) NOT NULL,
    carbs_per_100g DECIMAL(6,2) NOT NULL,
    fats_per_100g DECIMAL(6,2) NOT NULL,
    base_portion_g DECIMAL(6,2) NOT NULL, -- Porción base en gramos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de menús
CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    meal_type VARCHAR(20) CHECK (meal_type IN ('breakfast', 'lunch', 'snack')) NOT NULL,
    institution_id INTEGER REFERENCES institutions(id) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de relación menú-alimento
CREATE TABLE menu_foods (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER REFERENCES menus(id) NOT NULL,
    food_id INTEGER REFERENCES foods(id) NOT NULL,
    base_portion_g DECIMAL(6,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de consumo
CREATE TABLE consumption (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) NOT NULL,
    menu_id INTEGER REFERENCES menus(id) NOT NULL,
    consumption_date DATE NOT NULL,
    meal_type VARCHAR(20) CHECK (meal_type IN ('breakfast', 'lunch', 'snack')) NOT NULL,
    foods_consumed JSONB NOT NULL, -- [{"food_id": int, "status": "consumed/rejected/partial", "portion_consumed_g": float}]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, menu_id, consumption_date, meal_type)
);

-- Tabla de notificaciones
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) CHECK (type IN ('info', 'warning', 'alert', 'success')) DEFAULT 'info',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de reportes generados
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    generated_by INTEGER REFERENCES users(id) NOT NULL,
    report_type VARCHAR(50) NOT NULL,
    parameters JSONB,
    file_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_institution ON users(institution_id);
CREATE INDEX idx_students_user ON students(user_id);
CREATE INDEX idx_students_code ON students(student_code);
CREATE INDEX idx_consumption_student ON consumption(student_id);
CREATE INDEX idx_consumption_date ON consumption(consumption_date);
CREATE INDEX idx_menu_foods_menu ON menu_foods(menu_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_institutions_updated_at BEFORE UPDATE ON institutions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_foods_updated_at BEFORE UPDATE ON foods FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_menus_updated_at BEFORE UPDATE ON menus FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar datos de prueba

-- Institución de prueba
INSERT INTO institutions (name, address, phone, email) VALUES 
('Escuela Primaria El Futuro', 'Av. Educación 123, Ciudad', '+1234567890', 'contacto@escuelafuturo.edu');

-- Usuario superadmin
INSERT INTO users (email, password, first_name, last_name, role) VALUES 
('admin@sistema.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewFaFJLAyYi1yXRK', 'Super', 'Admin', 'superadmin');

-- Usuario nutriólogo
INSERT INTO users (email, password, first_name, last_name, role, institution_id) VALUES 
('nutri@escuela.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewFaFJLAyYi1yXRK', 'María', 'González', 'nutritionist', 1);

-- Usuario estudiante
INSERT INTO users (email, password, first_name, last_name, role, institution_id) VALUES 
('estudiante@escuela.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewFaFJLAyYi1yXRK', 'Juan', 'Pérez', 'student', 1);

-- Usuario padre
INSERT INTO users (email, password, first_name, last_name, role, institution_id) VALUES 
('padre@correo.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewFaFJLAyYi1yXRK', 'Carlos', 'Pérez', 'parent', 1);

-- Estudiante
INSERT INTO students (user_id, student_code, birth_date, gender, weight, height, grade, section) VALUES 
(3, 'EST001', '2015-05-15', 'M', 25.5, 120.0, '3ro', 'A');

-- Relación padre-estudiante
INSERT INTO parent_student (parent_id, student_id) VALUES (4, 1);

-- Alimentos de prueba
INSERT INTO foods (name, food_group, calories_per_100g, proteins_per_100g, carbs_per_100g, fats_per_100g, base_portion_g) VALUES 
('Arroz blanco', 'carbohydrates', 130, 2.7, 28, 0.3, 80),
('Pollo a la plancha', 'proteins', 165, 31, 0, 3.6, 100),
('Brócoli', 'vegetables', 34, 2.8, 7, 0.4, 100),
('Manzana', 'fruits', 52, 0.3, 14, 0.2, 150),
('Leche entera', 'dairy', 42, 3.4, 5, 1, 200),
('Aceite de oliva', 'fats', 884, 0, 0, 100, 10);

-- Menú de prueba
INSERT INTO menus (name, description, meal_type, institution_id) VALUES 
('Almuerzo Balanceado', 'Menú nutritivo con todos los grupos alimenticios', 'lunch', 1);

-- Alimentos del menú
INSERT INTO menu_foods (menu_id, food_id, base_portion_g) VALUES 
(1, 1, 80),  -- Arroz
(1, 2, 100), -- Pollo
(1, 3, 100), -- Brócoli
(1, 4, 150); -- Manzana

-- Habilitar RLS (Row Level Security) para mayor seguridad
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE consumption ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad básicas (se pueden personalizar según necesidades)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Students can view own data" ON students FOR SELECT USING (auth.uid()::text = user_id::text);

-- Comentarios para documentación
COMMENT ON TABLE institutions IS 'Instituciones educativas registradas en el sistema';
COMMENT ON TABLE users IS 'Usuarios del sistema con diferentes roles';
COMMENT ON TABLE students IS 'Perfiles de estudiantes con datos biométricos';
COMMENT ON TABLE foods IS 'Catálogo de alimentos con información nutricional';
COMMENT ON TABLE menus IS 'Menús base creados por nutriólogos';
COMMENT ON TABLE consumption IS 'Registro de consumo de alimentos por estudiantes';
COMMENT ON TABLE notifications IS 'Notificaciones del sistema para usuarios';
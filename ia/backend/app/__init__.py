from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta
import os

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    
    # Configuración
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///nutrition_system.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-string')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
    
    # Inicializar extensiones
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    
    # Registrar blueprints
    from app.routes.auth import auth_bp
    from app.routes.institutions import institutions_bp
    from app.routes.users import users_bp
    from app.routes.menus import menus_bp
    from app.routes.students import students_bp
    from app.routes.consumption import consumption_bp
    from app.routes.reports import reports_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(institutions_bp, url_prefix='/api/institutions')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(menus_bp, url_prefix='/api/menus')
    app.register_blueprint(students_bp, url_prefix='/api/students')
    app.register_blueprint(consumption_bp, url_prefix='/api/consumption')
    app.register_blueprint(reports_bp, url_prefix='/api/reports')
    
    # Crear tablas
    with app.app_context():
        db.create_all()
        
        # Crear usuario superadmin por defecto
        from app.models.user import User
        from app.utils.auth import hash_password
        
        superadmin = User.query.filter_by(email='admin@sistema.com').first()
        if not superadmin:
            superadmin = User(
                email='admin@sistema.com',
                password=hash_password('admin123'),
                first_name='Super',
                last_name='Admin',
                role='superadmin',
                is_active=True
            )
            db.session.add(superadmin)
            db.session.commit()
            print("Usuario superadmin creado: admin@sistema.com / admin123")
    
    return app
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    FLASK_ENV = os.environ.get('FLASK_ENV') or 'development'
    DEBUG = os.environ.get('FLASK_DEBUG') or True
    
    # Database
    DATABASE_URL = os.environ.get('DATABASE_URL') or 'sqlite:///wagewise.db'
    
    # File upload
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    UPLOAD_FOLDER = 'data/uploads'
    
    # Model storage
    MODEL_FOLDER = 'models/saved'
    
    # CORS
    CORS_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000'] 
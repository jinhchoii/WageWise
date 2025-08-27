from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Import API routes
from api.predict import predict_bp
from api.models import models_bp
from api.training import training_bp
from api.data import data_bp

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configure CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Configure app
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
    
    # Register blueprints
    app.register_blueprint(predict_bp, url_prefix='/api')
    app.register_blueprint(models_bp, url_prefix='/api')
    app.register_blueprint(training_bp, url_prefix='/api')
    app.register_blueprint(data_bp, url_prefix='/api')
    
    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'message': 'WageWise API is running'
        })
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000) 
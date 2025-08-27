from flask import Blueprint, request, jsonify
import os
import joblib
from models.salary_predictor import SalaryPredictor

models_bp = Blueprint('models', __name__)

@models_bp.route('/models', methods=['GET'])
def get_models():
    """
    Get information about available models
    """
    try:
        predictor = SalaryPredictor()
        models_info = predictor.get_models_info()
        
        return jsonify({
            'success': True,
            'models': models_info,
            'total_models': len(models_info)
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to get models info',
            'message': str(e)
        }), 500

@models_bp.route('/models/<model_name>/info', methods=['GET'])
def get_model_info(model_name):
    """
    Get detailed information about a specific model
    """
    try:
        predictor = SalaryPredictor()
        model_info = predictor.get_model_info(model_name)
        
        if not model_info:
            return jsonify({'error': f'Model {model_name} not found'}), 404
        
        return jsonify({
            'success': True,
            'model': model_info
        })
        
    except Exception as e:
        return jsonify({
            'error': f'Failed to get info for model {model_name}',
            'message': str(e)
        }), 500

@models_bp.route('/models/compare', methods=['POST'])
def compare_models():
    """
    Compare performance of different models
    """
    try:
        data = request.get_json()
        
        if not data or 'test_data' not in data:
            return jsonify({'error': 'Test data required'}), 400
        
        test_data = data['test_data']
        predictor = SalaryPredictor()
        
        # Compare models on test data
        comparison_results = predictor.compare_models(test_data)
        
        return jsonify({
            'success': True,
            'comparison': comparison_results
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Model comparison failed',
            'message': str(e)
        }), 500

@models_bp.route('/models/feature-importance', methods=['GET'])
def get_feature_importance():
    """
    Get feature importance for the best performing model
    """
    try:
        predictor = SalaryPredictor()
        feature_importance = predictor.get_feature_importance()
        
        return jsonify({
            'success': True,
            'feature_importance': feature_importance
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to get feature importance',
            'message': str(e)
        }), 500

@models_bp.route('/models/performance', methods=['GET'])
def get_model_performance():
    """
    Get performance metrics for all models
    """
    try:
        predictor = SalaryPredictor()
        performance_metrics = predictor.get_performance_metrics()
        
        return jsonify({
            'success': True,
            'performance': performance_metrics
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to get performance metrics',
            'message': str(e)
        }), 500 
from flask import Blueprint, request, jsonify
import pandas as pd
import os
from models.salary_predictor import SalaryPredictor
from data.data_processor import DataProcessor

training_bp = Blueprint('training', __name__)

@training_bp.route('/train', methods=['POST'])
def train_models():
    """
    Train all models with new data
    """
    try:
        data = request.get_json()
        
        if not data or 'data' not in data:
            return jsonify({'error': 'Training data required'}), 400
        
        # Process the training data
        data_processor = DataProcessor()
        processed_data = data_processor.process_data(data['data'])
        
        # Train models
        predictor = SalaryPredictor()
        training_results = predictor.train_models(processed_data)
        
        return jsonify({
            'success': True,
            'message': 'Models trained successfully',
            'training_results': training_results
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Training failed',
            'message': str(e)
        }), 500

@training_bp.route('/train/incremental', methods=['POST'])
def incremental_training():
    """
    Incrementally train models with new data
    """
    try:
        data = request.get_json()
        
        if not data or 'data' not in data:
            return jsonify({'error': 'Training data required'}), 400
        
        # Process the training data
        data_processor = DataProcessor()
        processed_data = data_processor.process_data(data['data'])
        
        # Incremental training
        predictor = SalaryPredictor()
        training_results = predictor.incremental_training(processed_data)
        
        return jsonify({
            'success': True,
            'message': 'Incremental training completed',
            'training_results': training_results
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Incremental training failed',
            'message': str(e)
        }), 500

@training_bp.route('/train/hyperparameter-tuning', methods=['POST'])
def hyperparameter_tuning():
    """
    Perform hyperparameter tuning for models
    """
    try:
        data = request.get_json()
        
        if not data or 'model_name' not in data:
            return jsonify({'error': 'Model name required'}), 400
        
        model_name = data['model_name']
        tuning_data = data.get('tuning_data', None)
        
        predictor = SalaryPredictor()
        tuning_results = predictor.hyperparameter_tuning(model_name, tuning_data)
        
        return jsonify({
            'success': True,
            'message': 'Hyperparameter tuning completed',
            'tuning_results': tuning_results
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Hyperparameter tuning failed',
            'message': str(e)
        }), 500

@training_bp.route('/train/status', methods=['GET'])
def get_training_status():
    """
    Get the current training status
    """
    try:
        predictor = SalaryPredictor()
        status = predictor.get_training_status()
        
        return jsonify({
            'success': True,
            'training_status': status
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to get training status',
            'message': str(e)
        }), 500

@training_bp.route('/train/cancel', methods=['POST'])
def cancel_training():
    """
    Cancel ongoing training
    """
    try:
        predictor = SalaryPredictor()
        result = predictor.cancel_training()
        
        return jsonify({
            'success': True,
            'message': 'Training cancelled successfully',
            'result': result
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to cancel training',
            'message': str(e)
        }), 500 
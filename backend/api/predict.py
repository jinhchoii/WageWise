from flask import Blueprint, request, jsonify
import joblib
import numpy as np
import pandas as pd
from models.salary_predictor import SalaryPredictor
import os

predict_bp = Blueprint('predict', __name__)

# Initialize the salary predictor
predictor = SalaryPredictor()

@predict_bp.route('/predict', methods=['POST'])
def predict_salary():
    """
    Predict salary based on input features
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Extract features from request
        features = {
            'experience_years': float(data.get('experience_years', 0)),
            'education_level': data.get('education_level', 'Bachelor'),
            'job_title': data.get('job_title', 'Software Engineer'),
            'company_size': data.get('company_size', 'Medium'),
            'location': data.get('location', 'United States'),
            'industry': data.get('industry', 'Technology'),
            'remote_work': data.get('remote_work', False)
        }
        
        # Validate required fields
        if features['experience_years'] < 0:
            return jsonify({'error': 'Experience years must be non-negative'}), 400
        
        # Make prediction
        prediction_result = predictor.predict_salary(features)
        
        return jsonify({
            'success': True,
            'prediction': prediction_result['predicted_salary'],
            'confidence': prediction_result['confidence'],
            'model_used': prediction_result['model_name'],
            'features': features,
            'prediction_range': {
                'min': prediction_result['predicted_salary'] * 0.8,
                'max': prediction_result['predicted_salary'] * 1.2
            }
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Prediction failed',
            'message': str(e)
        }), 500

@predict_bp.route('/predict/batch', methods=['POST'])
def predict_batch():
    """
    Predict salaries for multiple records
    """
    try:
        data = request.get_json()
        
        if not data or 'records' not in data:
            return jsonify({'error': 'No records provided'}), 400
        
        records = data['records']
        if not isinstance(records, list):
            return jsonify({'error': 'Records must be a list'}), 400
        
        predictions = []
        for record in records:
            try:
                features = {
                    'experience_years': float(record.get('experience_years', 0)),
                    'education_level': record.get('education_level', 'Bachelor'),
                    'job_title': record.get('job_title', 'Software Engineer'),
                    'company_size': record.get('company_size', 'Medium'),
                    'location': record.get('location', 'United States'),
                    'industry': record.get('industry', 'Technology'),
                    'remote_work': record.get('remote_work', False)
                }
                
                prediction_result = predictor.predict_salary(features)
                predictions.append({
                    'features': features,
                    'predicted_salary': prediction_result['predicted_salary'],
                    'confidence': prediction_result['confidence'],
                    'model_used': prediction_result['model_name']
                })
                
            except Exception as e:
                predictions.append({
                    'features': record,
                    'error': str(e)
                })
        
        return jsonify({
            'success': True,
            'predictions': predictions,
            'total_records': len(records),
            'successful_predictions': len([p for p in predictions if 'error' not in p])
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Batch prediction failed',
            'message': str(e)
        }), 500 
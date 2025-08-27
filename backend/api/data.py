from flask import Blueprint, request, jsonify
import pandas as pd
import os
import json
from werkzeug.utils import secure_filename
from data.data_processor import DataProcessor

data_bp = Blueprint('data', __name__)

# Configure upload folder
UPLOAD_FOLDER = 'data/uploads'
ALLOWED_EXTENSIONS = {'csv', 'xlsx', 'json'}

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@data_bp.route('/upload', methods=['POST'])
def upload_data():
    """
    Upload training data file
    """
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)
            
            # Process the uploaded file
            data_processor = DataProcessor()
            data_info = data_processor.analyze_file(filepath)
            
            return jsonify({
                'success': True,
                'message': 'File uploaded successfully',
                'filename': filename,
                'filepath': filepath,
                'data_info': data_info
            })
        else:
            return jsonify({'error': 'Invalid file type'}), 400
            
    except Exception as e:
        return jsonify({
            'error': 'File upload failed',
            'message': str(e)
        }), 500

@data_bp.route('/data/summary', methods=['GET'])
def get_data_summary():
    """
    Get summary statistics of available data
    """
    try:
        data_processor = DataProcessor()
        summary = data_processor.get_data_summary()
        
        return jsonify({
            'success': True,
            'data_summary': summary
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to get data summary',
            'message': str(e)
        }), 500

@data_bp.route('/data/preview', methods=['GET'])
def preview_data():
    """
    Preview the training data
    """
    try:
        limit = request.args.get('limit', 10, type=int)
        data_processor = DataProcessor()
        preview = data_processor.preview_data(limit)
        
        return jsonify({
            'success': True,
            'preview': preview
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to preview data',
            'message': str(e)
        }), 500

@data_bp.route('/data/validate', methods=['POST'])
def validate_data():
    """
    Validate training data quality
    """
    try:
        data = request.get_json()
        
        if not data or 'data' not in data:
            return jsonify({'error': 'Data required'}), 400
        
        data_processor = DataProcessor()
        validation_results = data_processor.validate_data(data['data'])
        
        return jsonify({
            'success': True,
            'validation_results': validation_results
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Data validation failed',
            'message': str(e)
        }), 500

@data_bp.route('/data/clean', methods=['POST'])
def clean_data():
    """
    Clean and preprocess training data
    """
    try:
        data = request.get_json()
        
        if not data or 'data' not in data:
            return jsonify({'error': 'Data required'}), 400
        
        data_processor = DataProcessor()
        cleaned_data = data_processor.clean_data(data['data'])
        
        return jsonify({
            'success': True,
            'message': 'Data cleaned successfully',
            'cleaned_data': cleaned_data,
            'cleaning_stats': data_processor.get_cleaning_stats()
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Data cleaning failed',
            'message': str(e)
        }), 500

@data_bp.route('/data/features', methods=['GET'])
def get_feature_info():
    """
    Get information about available features
    """
    try:
        data_processor = DataProcessor()
        feature_info = data_processor.get_feature_info()
        
        return jsonify({
            'success': True,
            'feature_info': feature_info
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to get feature info',
            'message': str(e)
        }), 500

@data_bp.route('/data/export', methods=['POST'])
def export_data():
    """
    Export processed data
    """
    try:
        data = request.get_json()
        
        if not data or 'format' not in data:
            return jsonify({'error': 'Export format required'}), 400
        
        export_format = data['format']
        data_processor = DataProcessor()
        export_result = data_processor.export_data(export_format)
        
        return jsonify({
            'success': True,
            'message': 'Data exported successfully',
            'export_result': export_result
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Data export failed',
            'message': str(e)
        }), 500 
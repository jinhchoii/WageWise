import pandas as pd
import numpy as np
import os
import json
from typing import Dict, List, Any, Optional
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder
import warnings
warnings.filterwarnings('ignore')

class DataProcessor:
    def __init__(self):
        self.data = None
        self.cleaning_stats = {}
        self.feature_info = {}
        self.uploaded_files = []
        
        # Expected columns for salary prediction
        self.expected_columns = [
            'experience_years', 'education_level', 'job_title', 
            'company_size', 'location', 'industry', 'remote_work', 'salary'
        ]
        
        # Categorical columns
        self.categorical_columns = [
            'education_level', 'job_title', 'company_size', 
            'location', 'industry', 'remote_work'
        ]
        
        # Numerical columns
        self.numerical_columns = ['experience_years', 'salary']
    
    def process_data(self, data: Any) -> pd.DataFrame:
        """Process and prepare data for training"""
        try:
            if isinstance(data, dict):
                # Convert dict to DataFrame
                df = pd.DataFrame([data])
            elif isinstance(data, list):
                # Convert list of dicts to DataFrame
                df = pd.DataFrame(data)
            elif isinstance(data, pd.DataFrame):
                df = data.copy()
            else:
                raise ValueError("Data must be dict, list, or DataFrame")
            
            # Store the data
            self.data = df
            
            # Process the data
            df = self._clean_data(df)
            df = self._validate_data(df)
            df = self._engineer_features(df)
            
            return df
            
        except Exception as e:
            raise Exception(f"Data processing failed: {str(e)}")
    
    def analyze_file(self, filepath: str) -> Dict[str, Any]:
        """Analyze uploaded file and return information"""
        try:
            # Determine file type and read
            if filepath.endswith('.csv'):
                df = pd.read_csv(filepath)
            elif filepath.endswith('.xlsx'):
                df = pd.read_excel(filepath)
            elif filepath.endswith('.json'):
                df = pd.read_json(filepath)
            else:
                raise ValueError("Unsupported file format")
            
            # Store file info
            file_info = {
                'filename': os.path.basename(filepath),
                'filepath': filepath,
                'rows': len(df),
                'columns': len(df.columns),
                'column_names': list(df.columns),
                'data_types': df.dtypes.to_dict(),
                'missing_values': df.isnull().sum().to_dict(),
                'file_size': os.path.getsize(filepath)
            }
            
            # Check if it's valid salary data
            file_info['is_valid_salary_data'] = self._is_valid_salary_data(df)
            
            # Store the data
            self.data = df
            
            return file_info
            
        except Exception as e:
            raise Exception(f"File analysis failed: {str(e)}")
    
    def _is_valid_salary_data(self, df: pd.DataFrame) -> bool:
        """Check if the data contains valid salary prediction features"""
        required_columns = ['salary']
        optional_columns = ['experience_years', 'education_level', 'job_title']
        
        # Check if salary column exists
        if 'salary' not in df.columns:
            return False
        
        # Check if at least some optional columns exist
        existing_optional = sum(1 for col in optional_columns if col in df.columns)
        if existing_optional < 1:
            return False
        
        return True
    
    def _clean_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Clean the data by handling missing values and outliers"""
        df_clean = df.copy()
        
        # Handle missing values
        for col in df_clean.columns:
            if df_clean[col].isnull().sum() > 0:
                if col in self.categorical_columns:
                    # Fill categorical missing values with mode
                    mode_value = df_clean[col].mode()[0] if len(df_clean[col].mode()) > 0 else 'Unknown'
                    df_clean[col] = df_clean[col].fillna(mode_value)
                elif col in self.numerical_columns:
                    # Fill numerical missing values with median
                    median_value = df_clean[col].median()
                    df_clean[col] = df_clean[col].fillna(median_value)
        
        # Handle outliers in numerical columns
        for col in self.numerical_columns:
            if col in df_clean.columns:
                Q1 = df_clean[col].quantile(0.25)
                Q3 = df_clean[col].quantile(0.75)
                IQR = Q3 - Q1
                lower_bound = Q1 - 1.5 * IQR
                upper_bound = Q3 + 1.5 * IQR
                
                # Cap outliers instead of removing them
                df_clean[col] = df_clean[col].clip(lower=lower_bound, upper=upper_bound)
        
        # Store cleaning statistics
        self.cleaning_stats = {
            'original_rows': len(df),
            'cleaned_rows': len(df_clean),
            'missing_values_filled': df.isnull().sum().sum(),
            'outliers_capped': len(df) - len(df_clean)
        }
        
        return df_clean
    
    def _validate_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Validate data quality and consistency"""
        df_valid = df.copy()
        
        # Validate experience years
        if 'experience_years' in df_valid.columns:
            df_valid['experience_years'] = df_valid['experience_years'].clip(lower=0, upper=50)
        
        # Validate salary
        if 'salary' in df_valid.columns:
            df_valid['salary'] = df_valid['salary'].clip(lower=1000, upper=1000000)
        
        # Standardize categorical values
        if 'education_level' in df_valid.columns:
            education_mapping = {
                'high school': 'High School',
                'bachelor': 'Bachelor',
                'master': 'Master',
                'phd': 'PhD',
                'doctorate': 'PhD'
            }
            df_valid['education_level'] = df_valid['education_level'].str.lower().map(
                lambda x: education_mapping.get(x, x)
            )
        
        if 'company_size' in df_valid.columns:
            size_mapping = {
                'small': 'Small',
                'medium': 'Medium',
                'large': 'Large',
                'startup': 'Small',
                'enterprise': 'Large'
            }
            df_valid['company_size'] = df_valid['company_size'].str.lower().map(
                lambda x: size_mapping.get(x, x)
            )
        
        return df_valid
    
    def _engineer_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Engineer new features for better prediction"""
        df_engineered = df.copy()
        
        # Create experience categories
        if 'experience_years' in df_engineered.columns:
            df_engineered['experience_category'] = pd.cut(
                df_engineered['experience_years'],
                bins=[0, 2, 5, 10, 20, 50],
                labels=['Junior', 'Mid', 'Senior', 'Expert', 'Veteran']
            )
        
        # Create salary categories
        if 'salary' in df_engineered.columns:
            df_engineered['salary_category'] = pd.cut(
                df_engineered['salary'],
                bins=[0, 50000, 100000, 150000, 200000, 1000000],
                labels=['Low', 'Medium', 'High', 'Very High', 'Extreme']
            )
        
        # Create location categories (simplified)
        if 'location' in df_engineered.columns:
            df_engineered['region'] = df_engineered['location'].apply(self._categorize_location)
        
        return df_engineered
    
    def _categorize_location(self, location: str) -> str:
        """Categorize location into regions"""
        if pd.isna(location):
            return 'Unknown'
        
        location_lower = str(location).lower()
        
        if any(region in location_lower for region in ['california', 'cali', 'ca']):
            return 'West Coast'
        elif any(region in location_lower for region in ['new york', 'ny', 'new jersey', 'nj']):
            return 'Northeast'
        elif any(region in location_lower for region in ['texas', 'tx', 'florida', 'fl']):
            return 'South'
        elif any(region in location_lower for region in ['illinois', 'il', 'ohio', 'oh']):
            return 'Midwest'
        else:
            return 'Other'
    
    def get_data_summary(self) -> Dict[str, Any]:
        """Get summary statistics of the data"""
        if self.data is None:
            return {}
        
        summary = {
            'total_records': len(self.data),
            'total_features': len(self.data.columns),
            'missing_values': self.data.isnull().sum().to_dict(),
            'data_types': self.data.dtypes.to_dict()
        }
        
        # Numerical summary
        numerical_summary = {}
        for col in self.numerical_columns:
            if col in self.data.columns:
                numerical_summary[col] = {
                    'mean': float(self.data[col].mean()),
                    'median': float(self.data[col].median()),
                    'std': float(self.data[col].std()),
                    'min': float(self.data[col].min()),
                    'max': float(self.data[col].max())
                }
        
        summary['numerical_summary'] = numerical_summary
        
        # Categorical summary
        categorical_summary = {}
        for col in self.categorical_columns:
            if col in self.data.columns:
                categorical_summary[col] = {
                    'unique_values': int(self.data[col].nunique()),
                    'top_values': self.data[col].value_counts().head(5).to_dict()
                }
        
        summary['categorical_summary'] = categorical_summary
        
        return summary
    
    def preview_data(self, limit: int = 10) -> Dict[str, Any]:
        """Preview the data with specified limit"""
        if self.data is None:
            return {}
        
        preview = {
            'head': self.data.head(limit).to_dict('records'),
            'tail': self.data.tail(limit).to_dict('records'),
            'sample': self.data.sample(min(limit, len(self.data))).to_dict('records')
        }
        
        return preview
    
    def validate_data(self, data: Any) -> Dict[str, Any]:
        """Validate data quality"""
        try:
            df = self.process_data(data)
            
            validation_results = {
                'is_valid': True,
                'total_records': len(df),
                'missing_values': df.isnull().sum().sum(),
                'duplicate_records': df.duplicated().sum(),
                'data_types': df.dtypes.to_dict(),
                'warnings': []
            }
            
            # Check for potential issues
            if validation_results['missing_values'] > 0:
                validation_results['warnings'].append(f"Found {validation_results['missing_values']} missing values")
            
            if validation_results['duplicate_records'] > 0:
                validation_results['warnings'].append(f"Found {validation_results['duplicate_records']} duplicate records")
            
            # Check salary distribution
            if 'salary' in df.columns:
                salary_stats = df['salary'].describe()
                if salary_stats['std'] < 1000:
                    validation_results['warnings'].append("Salary variance seems low - check data quality")
            
            return validation_results
            
        except Exception as e:
            return {
                'is_valid': False,
                'error': str(e)
            }
    
    def clean_data(self, data: Any) -> pd.DataFrame:
        """Clean and preprocess data"""
        return self.process_data(data)
    
    def get_cleaning_stats(self) -> Dict[str, Any]:
        """Get statistics about data cleaning"""
        return self.cleaning_stats
    
    def get_feature_info(self) -> Dict[str, Any]:
        """Get information about available features"""
        if self.data is None:
            return {}
        
        feature_info = {}
        
        for col in self.data.columns:
            col_info = {
                'name': col,
                'data_type': str(self.data[col].dtype),
                'missing_values': int(self.data[col].isnull().sum()),
                'unique_values': int(self.data[col].nunique())
            }
            
            if col in self.numerical_columns:
                col_info['type'] = 'numerical'
                col_info['range'] = {
                    'min': float(self.data[col].min()),
                    'max': float(self.data[col].max())
                }
            elif col in self.categorical_columns:
                col_info['type'] = 'categorical'
                col_info['top_values'] = self.data[col].value_counts().head(5).to_dict()
            else:
                col_info['type'] = 'other'
            
            feature_info[col] = col_info
        
        return feature_info
    
    def export_data(self, format: str = 'csv') -> Dict[str, Any]:
        """Export processed data"""
        if self.data is None:
            return {'error': 'No data to export'}
        
        try:
            export_dir = 'data/exports'
            os.makedirs(export_dir, exist_ok=True)
            
            timestamp = pd.Timestamp.now().strftime('%Y%m%d_%H%M%S')
            
            if format.lower() == 'csv':
                filename = f'salary_data_{timestamp}.csv'
                filepath = os.path.join(export_dir, filename)
                self.data.to_csv(filepath, index=False)
            elif format.lower() == 'json':
                filename = f'salary_data_{timestamp}.json'
                filepath = os.path.join(export_dir, filename)
                self.data.to_json(filepath, orient='records', indent=2)
            elif format.lower() == 'excel':
                filename = f'salary_data_{timestamp}.xlsx'
                filepath = os.path.join(export_dir, filename)
                self.data.to_excel(filepath, index=False)
            else:
                return {'error': f'Unsupported export format: {format}'}
            
            return {
                'success': True,
                'filename': filename,
                'filepath': filepath,
                'format': format,
                'records_exported': len(self.data)
            }
            
        except Exception as e:
            return {'error': f'Export failed: {str(e)}'} 
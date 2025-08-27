import joblib
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.preprocessing import StandardScaler, LabelEncoder
import xgboost as xgb
import os
import pickle
from typing import Dict, List, Any, Optional

class SalaryPredictor:
    def __init__(self):
        self.models = {}
        self.scalers = {}
        self.label_encoders = {}
        self.feature_names = []
        self.model_performance = {}
        self.is_training = False
        
        # Initialize models
        self._initialize_models()
        
        # Load pre-trained models if available
        self._load_models()
    
    def _initialize_models(self):
        """Initialize the machine learning models"""
        self.models = {
            'linear_regression': LinearRegression(),
            'random_forest': RandomForestRegressor(n_estimators=100, random_state=42),
            'xgboost': xgb.XGBRegressor(n_estimators=100, random_state=42)
        }
        
        # Initialize scalers and encoders
        for model_name in self.models.keys():
            self.scalers[model_name] = StandardScaler()
            self.label_encoders[model_name] = {}
    
    def _load_models(self):
        """Load pre-trained models from disk"""
        models_dir = 'models/saved'
        if os.path.exists(models_dir):
            for model_name in self.models.keys():
                model_path = os.path.join(models_dir, f'{model_name}.pkl')
                scaler_path = os.path.join(models_dir, f'{model_name}_scaler.pkl')
                encoder_path = os.path.join(models_dir, f'{model_name}_encoders.pkl')
                
                if os.path.exists(model_path):
                    try:
                        self.models[model_name] = joblib.load(model_path)
                        if os.path.exists(scaler_path):
                            self.scalers[model_name] = joblib.load(scaler_path)
                        if os.path.exists(encoder_path):
                            self.label_encoders[model_name] = joblib.load(encoder_path)
                    except Exception as e:
                        print(f"Error loading model {model_name}: {e}")
    
    def _save_models(self):
        """Save trained models to disk"""
        models_dir = 'models/saved'
        os.makedirs(models_dir, exist_ok=True)
        
        for model_name, model in self.models.items():
            try:
                # Save model
                joblib.dump(model, os.path.join(models_dir, f'{model_name}.pkl'))
                
                # Save scaler
                if model_name in self.scalers:
                    joblib.dump(self.scalers[model_name], os.path.join(models_dir, f'{model_name}_scaler.pkl'))
                
                # Save encoders
                if model_name in self.label_encoders:
                    joblib.dump(self.label_encoders[model_name], os.path.join(models_dir, f'{model_name}_encoders.pkl'))
                    
            except Exception as e:
                print(f"Error saving model {model_name}: {e}")
    
    def _preprocess_features(self, features: Dict[str, Any], model_name: str) -> np.ndarray:
        """Preprocess features for prediction"""
        # Convert features to DataFrame
        df = pd.DataFrame([features])
        
        # Encode categorical variables
        if model_name in self.label_encoders:
            for col, encoder in self.label_encoders[model_name].items():
                if col in df.columns:
                    df[col] = encoder.transform(df[col])
        
        # Convert to numpy array
        features_array = df.values
        
        # Scale features
        if model_name in self.scalers:
            features_array = self.scalers[model_name].transform(features_array)
        
        return features_array
    
    def predict_salary(self, features: Dict[str, Any]) -> Dict[str, Any]:
        """Predict salary using the best performing model"""
        try:
            # Use the best performing model (default to random forest)
            best_model_name = 'random_forest'
            if self.model_performance:
                best_model_name = max(self.model_performance.keys(), 
                                   key=lambda x: self.model_performance[x].get('r2_score', 0))
            
            # Preprocess features
            processed_features = self._preprocess_features(features, best_model_name)
            
            # Make prediction
            model = self.models[best_model_name]
            prediction = model.predict(processed_features)[0]
            
            # Calculate confidence (simple approach - can be enhanced)
            confidence = 0.85  # Placeholder - could be based on model uncertainty
            
            return {
                'predicted_salary': float(prediction),
                'confidence': confidence,
                'model_name': best_model_name,
                'features_used': list(features.keys())
            }
            
        except Exception as e:
            raise Exception(f"Prediction failed: {str(e)}")
    
    def train_models(self, training_data: pd.DataFrame) -> Dict[str, Any]:
        """Train all models with the provided data"""
        if self.is_training:
            raise Exception("Training already in progress")
        
        self.is_training = True
        
        try:
            # Prepare data
            X, y = self._prepare_training_data(training_data)
            
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            
            training_results = {}
            
            for model_name, model in self.models.items():
                print(f"Training {model_name}...")
                
                # Train model
                model.fit(X_train, y_train)
                
                # Make predictions
                y_pred = model.predict(X_test)
                
                # Calculate metrics
                mse = mean_squared_error(y_test, y_pred)
                r2 = r2_score(y_test, y_pred)
                mae = mean_absolute_error(y_test, y_pred)
                
                # Store performance
                self.model_performance[model_name] = {
                    'mse': mse,
                    'r2_score': r2,
                    'mae': mae,
                    'rmse': np.sqrt(mse)
                }
                
                training_results[model_name] = {
                    'status': 'success',
                    'metrics': self.model_performance[model_name]
                }
            
            # Save models
            self._save_models()
            
            return {
                'status': 'success',
                'models_trained': list(self.models.keys()),
                'performance': self.model_performance
            }
            
        except Exception as e:
            raise Exception(f"Training failed: {str(e)}")
        finally:
            self.is_training = False
    
    def _prepare_training_data(self, data: pd.DataFrame) -> tuple:
        """Prepare training data by encoding categorical variables and scaling"""
        # Separate features and target
        if 'salary' in data.columns:
            y = data['salary']
            X = data.drop('salary', axis=1)
        else:
            raise ValueError("Training data must contain 'salary' column")
        
        # Encode categorical variables
        for col in X.select_dtypes(include=['object']).columns:
            for model_name in self.models.keys():
                if model_name not in self.label_encoders:
                    self.label_encoders[model_name] = {}
                
                le = LabelEncoder()
                X[col] = le.fit_transform(X[col])
                self.label_encoders[model_name][col] = le
        
        # Convert to numpy arrays
        X = X.values
        y = y.values
        
        # Scale features for each model
        for model_name in self.models.keys():
            scaler = StandardScaler()
            X_scaled = scaler.fit_transform(X)
            self.scalers[model_name] = scaler
        
        # Return scaled features (use first model's scaler for now)
        return X_scaled, y
    
    def get_models_info(self) -> List[Dict[str, Any]]:
        """Get information about available models"""
        models_info = []
        
        for model_name, model in self.models.items():
            info = {
                'name': model_name,
                'type': type(model).__name__,
                'is_trained': hasattr(model, 'coef_') or hasattr(model, 'feature_importances_'),
                'performance': self.model_performance.get(model_name, {})
            }
            models_info.append(info)
        
        return models_info
    
    def get_model_info(self, model_name: str) -> Optional[Dict[str, Any]]:
        """Get detailed information about a specific model"""
        if model_name not in self.models:
            return None
        
        model = self.models[model_name]
        info = {
            'name': model_name,
            'type': type(model).__name__,
            'is_trained': hasattr(model, 'coef_') or hasattr(model, 'feature_importances_'),
            'performance': self.model_performance.get(model_name, {}),
            'parameters': model.get_params() if hasattr(model, 'get_params') else {}
        }
        
        return info
    
    def compare_models(self, test_data: pd.DataFrame) -> Dict[str, Any]:
        """Compare performance of different models on test data"""
        try:
            X, y = self._prepare_training_data(test_data)
            
            comparison_results = {}
            
            for model_name, model in self.models.items():
                if hasattr(model, 'predict'):
                    y_pred = model.predict(X)
                    
                    mse = mean_squared_error(y, y_pred)
                    r2 = r2_score(y, y_pred)
                    mae = mean_absolute_error(y, y_pred)
                    
                    comparison_results[model_name] = {
                        'mse': mse,
                        'r2_score': r2,
                        'mae': mae,
                        'rmse': np.sqrt(mse)
                    }
            
            return comparison_results
            
        except Exception as e:
            raise Exception(f"Model comparison failed: {str(e)}")
    
    def get_feature_importance(self) -> Dict[str, Any]:
        """Get feature importance for the best performing model"""
        if not self.model_performance:
            return {}
        
        best_model_name = max(self.model_performance.keys(), 
                           key=lambda x: self.model_performance[x].get('r2_score', 0))
        
        model = self.models[best_model_name]
        
        if hasattr(model, 'feature_importances_'):
            importance = model.feature_importances_
        elif hasattr(model, 'coef_'):
            importance = np.abs(model.coef_)
        else:
            return {}
        
        # Create feature importance dictionary
        feature_importance = {}
        for i, imp in enumerate(importance):
            feature_name = f'feature_{i}' if i < len(self.feature_names) else f'feature_{i}'
            feature_importance[feature_name] = float(imp)
        
        return {
            'model': best_model_name,
            'feature_importance': feature_importance
        }
    
    def get_performance_metrics(self) -> Dict[str, Any]:
        """Get performance metrics for all models"""
        return self.model_performance
    
    def get_training_status(self) -> Dict[str, Any]:
        """Get current training status"""
        return {
            'is_training': self.is_training,
            'models_trained': len([m for m in self.models.values() 
                                 if hasattr(m, 'coef_') or hasattr(m, 'feature_importances_')]),
            'total_models': len(self.models)
        }
    
    def incremental_training(self, new_data: pd.DataFrame) -> Dict[str, Any]:
        """Incrementally train models with new data"""
        # For now, just retrain with all data
        # Could be enhanced to implement true incremental learning
        return self.train_models(new_data)
    
    def hyperparameter_tuning(self, model_name: str, tuning_data: pd.DataFrame = None) -> Dict[str, Any]:
        """Perform hyperparameter tuning for a specific model"""
        # Placeholder for hyperparameter tuning
        # Could implement GridSearchCV or RandomizedSearchCV
        return {
            'status': 'not_implemented',
            'message': 'Hyperparameter tuning not yet implemented'
        }
    
    def cancel_training(self) -> Dict[str, Any]:
        """Cancel ongoing training"""
        if self.is_training:
            self.is_training = False
            return {'status': 'cancelled', 'message': 'Training cancelled'}
        else:
            return {'status': 'no_training', 'message': 'No training in progress'} 
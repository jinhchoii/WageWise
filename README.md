# WageWise - Salary Prediction Using Regression

A full-stack web application that predicts salary based on various features using machine learning regression models.

## Features

- **Salary Prediction**: Predict salary based on experience, education, location, and other factors
- **Multiple ML Models**: Linear Regression, Random Forest, and XGBoost
- **Interactive Dashboard**: Beautiful charts and visualizations
- **Data Management**: Upload, view, and manage training data
- **Model Comparison**: Compare different regression models' performance
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend
- **Python 3.8+**
- **Flask**: Web framework
- **Scikit-learn**: Machine learning library
- **Pandas & NumPy**: Data manipulation
- **SQLite**: Database
- **Flask-CORS**: Cross-origin resource sharing

### Frontend
- **React 18**: Frontend framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Chart.js**: Data visualization
- **Axios**: HTTP client
- **React Router**: Navigation

### Machine Learning
- **Linear Regression**: Baseline model
- **Random Forest**: Ensemble method
- **XGBoost**: Gradient boosting
- **Feature Engineering**: Data preprocessing
- **Model Evaluation**: Metrics and validation

## Project Structure

```
WageWise/
├── backend/                 # Flask API
│   ├── app.py             # Main Flask application
│   ├── models/            # ML models and training
│   ├── data/              # Data processing
│   ├── api/               # API routes
│   └── requirements.txt   # Python dependencies
├── frontend/              # React application
│   ├── src/               # Source code
│   ├── public/            # Public assets
│   └── package.json       # Node dependencies
├── data/                  # Sample datasets
├── models/                # Trained ML models
└── README.md             # This file
```

## Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints

- `POST /api/predict` - Predict salary
- `GET /api/models` - Get available models
- `POST /api/train` - Train models
- `GET /api/metrics` - Get model performance metrics
- `POST /api/upload` - Upload training data

## Features in Detail

### 1. Salary Prediction
- Input: Experience, education, location, company size, etc.
- Output: Predicted salary with confidence interval
- Support for multiple ML models

### 2. Data Management
- Upload CSV files with salary data
- Data validation and preprocessing
- Feature engineering capabilities

### 3. Model Training
- Automatic model training on new data
- Hyperparameter tuning
- Cross-validation

### 4. Analytics Dashboard
- Model performance comparison
- Feature importance analysis
- Data distribution charts
- Prediction accuracy metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details 
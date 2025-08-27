# WageWise Setup Guide

This guide will help you set up and run the WageWise salary prediction application.

## Prerequisites

- **Python 3.8+** installed on your system
- **Node.js 16+** and npm installed on your system
- **Git** for cloning the repository

## Quick Start

### Option 1: Using Batch Files (Windows)

1. **Start Backend Server:**
   - Double-click `start_backend.bat`
   - Wait for the virtual environment setup and dependencies installation
   - The Flask server will start on `http://localhost:5000`

2. **Start Frontend (in a new terminal):**
   - Double-click `start_frontend.bat`
   - Wait for npm dependencies to install
   - The React app will open in your browser at `http://localhost:3000`

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start Flask server:**
   ```bash
   python app.py
   ```

   The backend will be available at `http://localhost:5000`

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

   The frontend will open in your browser at `http://localhost:3000`

## Project Structure

```
WageWise/
├── backend/                 # Flask API backend
│   ├── app.py             # Main Flask application
│   ├── api/               # API route blueprints
│   ├── models/            # ML model classes
│   ├── data/              # Data processing classes
│   ├── requirements.txt   # Python dependencies
│   └── config.py          # Configuration settings
├── frontend/              # React frontend
│   ├── src/               # Source code
│   ├── public/            # Public assets
│   ├── package.json       # Node dependencies
│   └── tailwind.config.js # Tailwind CSS config
├── data/                  # Sample datasets
├── models/                # Trained ML models (auto-created)
├── start_backend.bat      # Windows backend starter
├── start_frontend.bat     # Windows frontend starter
└── README.md             # Project documentation
```

## API Endpoints

Once the backend is running, you can access these endpoints:

- `GET /api/health` - Health check
- `POST /api/predict` - Predict salary
- `GET /api/models` - Get available models
- `POST /api/train` - Train models
- `GET /api/metrics` - Get model performance
- `POST /api/upload` - Upload training data

## Features

### 1. Salary Prediction
- Input: Experience, education, job title, company size, location, industry, remote work
- Output: Predicted salary with confidence interval
- Multiple ML models: Linear Regression, Random Forest, XGBoost

### 2. Data Management
- Upload CSV, Excel, or JSON files
- Data validation and preprocessing
- Feature engineering capabilities

### 3. Model Training
- Automatic model training on new data
- Model performance comparison
- Feature importance analysis

### 4. Analytics Dashboard
- Model performance metrics
- Data insights and visualizations
- Real-time statistics

## Troubleshooting

### Common Issues

1. **Port already in use:**
   - Backend: Change port in `backend/app.py` (line 58)
   - Frontend: Change port in `frontend/package.json` scripts

2. **Python dependencies not found:**
   - Ensure virtual environment is activated
   - Reinstall requirements: `pip install -r requirements.txt`

3. **Node modules not found:**
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

4. **CORS errors:**
   - Check that backend is running on port 5000
   - Verify frontend proxy setting in `package.json`

### Backend Issues

- **Import errors:** Ensure all Python files are in correct directories
- **Model loading errors:** Check that `models/saved` directory exists
- **Data processing errors:** Verify sample data format in `data/sample_salary_data.csv`

### Frontend Issues

- **Build errors:** Check TypeScript compilation errors
- **Styling issues:** Ensure Tailwind CSS is properly configured
- **API calls failing:** Verify backend server is running and accessible

## Development

### Adding New Features

1. **Backend:**
   - Add new routes in `backend/api/` directory
   - Create new model classes in `backend/models/`
   - Update `backend/app.py` to register new blueprints

2. **Frontend:**
   - Add new pages in `frontend/src/pages/`
   - Create new components in `frontend/src/components/`
   - Update routing in `frontend/src/App.tsx`

### Testing

- **Backend:** Use tools like Postman or curl to test API endpoints
- **Frontend:** Use browser developer tools to debug React components

## Production Deployment

For production deployment:

1. **Backend:**
   - Use production WSGI server (Gunicorn, uWSGI)
   - Set environment variables for production
   - Use production database (PostgreSQL, MySQL)

2. **Frontend:**
   - Build production version: `npm run build`
   - Serve static files from web server (Nginx, Apache)
   - Configure proper CORS settings

## Support

If you encounter issues:

1. Check the console/terminal for error messages
2. Verify all prerequisites are installed
3. Ensure ports are not blocked by firewall
4. Check that all dependencies are properly installed

## License

This project is licensed under the MIT License. 
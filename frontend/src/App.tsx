import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Simple placeholder components for now
const Home = () => (
  <div className="text-center py-16">
    <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to WageWise</h1>
    <p className="text-xl text-gray-600 mb-8">AI-powered salary prediction using machine learning</p>
    <div className="bg-primary-600 text-white px-8 py-3 rounded-lg inline-block">
      Get Started with Salary Prediction
    </div>
  </div>
);

// Full Salary Prediction Component
const Predict = () => {
  const [formData, setFormData] = useState({
    experience_years: 2,
    education_level: 'Bachelor',
    job_title: 'Software Engineer',
    company_size: '51-500',
    location: '',
    industry: 'Technology',
    remote_work: false
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call for now
    setTimeout(() => {
      const mockPrediction = {
        predicted_salary: Math.floor(Math.random() * 100000) + 50000,
        confidence: 0.85,
        model_used: 'Random Forest',
        prediction_range: {
          min: 45000,
          max: 120000
        }
      };
      setPrediction(mockPrediction);
      setLoading(false);
    }, 1500);
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Salary Prediction</h1>
        <p className="text-xl text-gray-600">
          Enter your details below to get an AI-powered salary prediction
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Prediction Form */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label">Years of Experience</label>
              <input
                type="number"
                name="experience_years"
                value={formData.experience_years}
                onChange={handleInputChange}
                min="0"
                max="50"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="form-label">Education Level</label>
              <select
                name="education_level"
                value={formData.education_level}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="High School">High School</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div>
              <label className="form-label">Job Title</label>
              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g., Software Engineer"
                required
              />
            </div>

            <div>
              <label className="form-label">Company Size</label>
              <select
                name="company_size"
                value={formData.company_size}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="0-50">0-50 employees</option>
                <option value="51-500">51-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1001-5000">1001-5000 employees</option>
                <option value="5001-10000">5001-10000 employees</option>
                <option value="10000+">10000+ employees</option>
              </select>
            </div>

            <div>
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g., San Francisco, CA or London, UK"
                required
              />
            </div>

            <div>
              <label className="form-label">Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Design">Design</option>
                <option value="Research">Research</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="remote_work"
                checked={formData.remote_work}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label className="ml-2 text-sm text-gray-700">Remote Work</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Predicting...' : 'Predict Salary'}
            </button>
          </form>
        </div>

        {/* Prediction Results */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Prediction Results</h2>
          
          {prediction ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {formatSalary(prediction.predicted_salary)}
                </div>
                <p className="text-gray-600">Predicted Annual Salary</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Prediction Range</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Minimum: {formatSalary(prediction.prediction_range.min)}</span>
                  <span className="text-gray-600">Maximum: {formatSalary(prediction.prediction_range.max)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Confidence Level:</span>
                  <span className="font-semibold text-gray-900">{(prediction.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Model Used:</span>
                  <span className="font-semibold text-gray-900">{prediction.model_used}</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">💡 Tips</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• This prediction is based on current market data</li>
                  <li>• Consider negotiating within the predicted range</li>
                  <li>• Factors like company culture and benefits may affect actual offers</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-lg">Fill out the form to get your salary prediction</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
      <p className="text-xl text-gray-600">
        Monitor model performance and data insights
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="card text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Predictions</h3>
        <p className="text-3xl font-bold text-primary-600">1,247</p>
        <p className="text-sm text-gray-600">+12% from last month</p>
      </div>
      <div className="card text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Model Accuracy</h3>
        <p className="text-3xl font-bold text-green-600">94.2%</p>
        <p className="text-sm text-gray-600">Best: Random Forest</p>
      </div>
      <div className="card text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Users</h3>
        <p className="text-3xl font-bold text-blue-600">892</p>
        <p className="text-sm text-gray-600">+8% from last week</p>
      </div>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Model Performance</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Random Forest</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">94%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">XGBoost</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '91%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">91%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Linear Regression</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">87%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Feature Importance</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Experience Years</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">85%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Education Level</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">72%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Location</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">68%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DataManagement = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [salaryData, setSalaryData] = useState({
    experience_years: 2,
    education_level: 'Bachelor',
    job_title: '',
    company_size: '51-500',
    location: '',
    industry: 'Technology',
    remote_work: false,
    salary: ''
  });
  const [contributionStatus, setContributionStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSalaryData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSalaryContribution = () => {
    if (!salaryData.job_title || !salaryData.salary) {
      setContributionStatus('Please fill in all required fields');
      return;
    }

    setContributionStatus('Contributing salary data...');
    
    // Simulate API call to save salary data
    setTimeout(() => {
      setContributionStatus('Thank you! Your salary data has been contributed successfully.');
      // Reset form
      setSalaryData({
        experience_years: 2,
        education_level: 'Bachelor',
        job_title: '',
        company_size: '51-500',
        location: '',
        industry: 'Technology',
        remote_work: false,
        salary: ''
      });
    }, 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadStatus('');
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first');
      return;
    }
    
    setUploadStatus('Uploading...');
    
    // Simulate file upload
    setTimeout(() => {
      setUploadStatus('File uploaded successfully!');
      setSelectedFile(null);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Data Management</h1>
        <p className="text-xl text-gray-600">
          Upload, validate, and manage your training data
        </p>
      </div>

      {/* Salary Contribution Form */}
      <div className="card mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contribute Your Salary Data</h2>
        <p className="text-gray-600 mb-6">
          Help improve our salary predictions by contributing your actual salary data. This information will be used to train our models and provide more accurate predictions for everyone.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Job Title *</label>
            <input
              type="text"
              name="job_title"
              value={salaryData.job_title}
              onChange={handleInputChange}
              className="input-field"
              placeholder="e.g., Software Engineer, Data Scientist"
              required
            />
          </div>
          
          <div>
            <label className="form-label">Annual Salary (USD) *</label>
            <input
              type="number"
              name="salary"
              value={salaryData.salary}
              onChange={handleInputChange}
              className="input-field"
              placeholder="e.g., 75000"
              min="10000"
              max="1000000"
              required
            />
          </div>
          
          <div>
            <label className="form-label">Years of Experience</label>
            <input
              type="number"
              name="experience_years"
              value={salaryData.experience_years}
              onChange={handleInputChange}
              min="0"
              max="50"
              className="input-field"
            />
          </div>
          
          <div>
            <label className="form-label">Education Level</label>
            <select
              name="education_level"
              value={salaryData.education_level}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="High School">High School</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Company Size</label>
            <select
              name="company_size"
              value={salaryData.company_size}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="0-50">0-50 employees</option>
              <option value="51-500">51-500 employees</option>
              <option value="501-1000">501-1000 employees</option>
              <option value="1001-5000">1001-5000 employees</option>
              <option value="5001-10000">5001-10000 employees</option>
              <option value="10000+">10000+ employees</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={salaryData.location}
              onChange={handleInputChange}
              className="input-field"
              placeholder="e.g., San Francisco, CA or London, UK"
            />
          </div>
          
          <div>
            <label className="form-label">Industry</label>
            <select
              name="industry"
              value={salaryData.industry}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Design">Design</option>
              <option value="Research">Research</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="remote_work"
              checked={salaryData.remote_work}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label className="ml-2 text-sm text-gray-700">Remote Work</label>
          </div>
        </div>
        
        {contributionStatus && (
          <div className={`mt-4 p-3 rounded-lg ${
            contributionStatus.includes('Thank you') 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : contributionStatus.includes('Contributing')
              ? 'bg-blue-50 border border-blue-200 text-blue-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {contributionStatus}
          </div>
        )}
        
        <button
          onClick={handleSalaryContribution}
          disabled={contributionStatus.includes('Contributing')}
          className="btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Contribute Salary Data
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Data</h2>
          <div className="space-y-6">
            <div>
              <label className="form-label">Select File</label>
              <input
                type="file"
                accept=".csv,.xlsx,.json"
                onChange={handleFileChange}
                className="input-field"
              />
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: CSV, Excel, JSON
              </p>
            </div>
            
            {selectedFile && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  <strong>Selected:</strong> {selectedFile.name}
                </p>
                <p className="text-sm text-blue-600">
                  Size: {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            )}
            
            {uploadStatus && (
              <div className={`p-3 rounded-lg ${
                uploadStatus.includes('successfully') 
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : uploadStatus.includes('Uploading')
                  ? 'bg-blue-50 border border-blue-200 text-blue-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {uploadStatus}
              </div>
            )}
            
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploadStatus === 'Uploading...'}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload and Process
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Records:</span>
              <span className="font-semibold">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Features:</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated:</span>
              <span className="font-semibold">2 hours ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data Quality:</span>
              <span className="font-semibold text-green-600">Excellent</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">User Contributions:</span>
              <span className="font-semibold text-primary-600">+15 today</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Recent Uploads</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">salary_data_2024.csv</span>
                <span className="text-gray-500">2 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">tech_salaries.xlsx</span>
                <span className="text-gray-500">1 day ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">finance_data.json</span>
                <span className="text-gray-500">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModelTraining = () => {
  const [trainingStatus, setTrainingStatus] = useState({
    linear_regression: 'Ready',
    random_forest: 'Ready',
    xgboost: 'Ready'
  });
  const [isTraining, setIsTraining] = useState(false);

  const handleStartTraining = () => {
    setIsTraining(true);
    
    // Simulate training process
    const models = ['linear_regression', 'random_forest', 'xgboost'];
    let currentModel = 0;
    
    const trainNextModel = () => {
      if (currentModel >= models.length) {
        setIsTraining(false);
        return;
      }
      
      const model = models[currentModel];
      setTrainingStatus(prev => ({ ...prev, [model]: 'Training...' }));
      
      setTimeout(() => {
        setTrainingStatus(prev => ({ ...prev, [model]: 'Completed' }));
        currentModel++;
        trainNextModel();
      }, 3000);
    };
    
    trainNextModel();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Model Training</h1>
        <p className="text-xl text-gray-600">
          Train and manage your machine learning models
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Train Models</h2>
          <div className="space-y-6">
            <div>
              <label className="form-label">Training Data</label>
              <select className="input-field">
                <option>Use latest dataset (1,247 records)</option>
                <option>Select specific dataset</option>
              </select>
            </div>
            
            <div>
              <label className="form-label">Models to Train</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  Linear Regression
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  Random Forest
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  XGBoost
                </label>
              </div>
            </div>
            
            <button
              onClick={handleStartTraining}
              disabled={isTraining}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTraining ? 'Training in Progress...' : 'Start Training'}
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Training Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Linear Regression:</span>
              <span className={`font-semibold ${
                trainingStatus.linear_regression === 'Completed' ? 'text-green-600' :
                trainingStatus.linear_regression === 'Training...' ? 'text-blue-600' :
                'text-gray-600'
              }`}>
                {trainingStatus.linear_regression === 'Completed' ? '✓ Completed' :
                 trainingStatus.linear_regression === 'Training...' ? '🔄 Training...' :
                 'Ready'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Random Forest:</span>
              <span className={`font-semibold ${
                trainingStatus.random_forest === 'Completed' ? 'text-green-600' :
                trainingStatus.random_forest === 'Training...' ? 'text-blue-600' :
                'text-gray-600'
              }`}>
                {trainingStatus.random_forest === 'Completed' ? '✓ Completed' :
                 trainingStatus.random_forest === 'Training...' ? '🔄 Training...' :
                 'Ready'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">XGBoost:</span>
              <span className={`font-semibold ${
                trainingStatus.xgboost === 'Completed' ? 'text-green-600' :
                trainingStatus.xgboost === 'Training...' ? 'text-blue-600' :
                'text-gray-600'
              }`}>
                {trainingStatus.xgboost === 'Completed' ? '✓ Completed' :
                 trainingStatus.xgboost === 'Training...' ? '🔄 Training...' :
                 'Ready'}
              </span>
            </div>
          </div>
          
          {isTraining && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Training Progress</h3>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                     style={{ width: `${Object.values(trainingStatus).filter(s => s === 'Completed').length / 3 * 100}%` }}>
                </div>
              </div>
              <p className="text-sm text-blue-800 mt-2">
                {Object.values(trainingStatus).filter(s => s === 'Completed').length} of 3 models completed
              </p>
            </div>
          )}
          
          {!isTraining && Object.values(trainingStatus).every(s => s === 'Completed') && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">🎉 Training Complete!</h3>
              <p className="text-sm text-green-800">
                All models have been trained successfully. You can now use them for salary predictions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple navigation
const Navbar = () => (
  <nav className="bg-white shadow-sm border-b border-gray-200">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        <div className="text-xl font-bold text-gray-900">WageWise</div>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-600 hover:text-primary-600">Home</a>
          <a href="/predict" className="text-gray-600 hover:text-primary-600">Predict</a>
          <a href="/dashboard" className="text-gray-600 hover:text-primary-600">Dashboard</a>
          <a href="/data" className="text-gray-600 hover:text-primary-600">Data</a>
          <a href="/training" className="text-gray-600 hover:text-primary-600">Training</a>
        </div>
      </div>
    </div>
  </nav>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/data" element={<DataManagement />} />
            <Route path="/training" element={<ModelTraining />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 
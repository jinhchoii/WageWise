import axios from 'axios';
import React, { useState } from 'react';

interface PredictionForm {
  experience_years: number;
  education_level: string;
  job_title: string;
  company_size: string;
  location: string;
  industry: string;
  remote_work: boolean;
}

interface PredictionResult {
  predicted_salary: number;
  confidence: number;
  model_used: string;
  features_used: string[];
  prediction_range: {
    min: number;
    max: number;
  };
}

const Predict: React.FC = () => {
  const [formData, setFormData] = useState<PredictionForm>({
    experience_years: 2,
    education_level: 'Bachelor',
    job_title: 'Software Engineer',
    company_size: 'Medium',
    location: 'California',
    industry: 'Technology',
    remote_work: false,
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const educationLevels = ['High School', 'Bachelor', 'Master', 'PhD'];
  const companySizes = ['Small', 'Medium', 'Large'];
  const industries = ['Technology', 'Finance', 'Healthcare', 'Design', 'Research', 'Other'];
  const locations = ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Ohio', 'New Jersey', 'Other'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/predict', formData);
      setPrediction(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (salary: number) => {
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
                {educationLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
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
                {companySizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
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
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
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
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

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
                  <span className="font-semibold text-gray-900 capitalize">{prediction.model_used.replace('_', ' ')}</span>
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

export default Predict; 
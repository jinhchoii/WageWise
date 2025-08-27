import React from 'react';

const ModelTraining: React.FC = () => {
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
                <option>Use latest dataset</option>
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
            <button className="btn-primary w-full">
              Start Training
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Training Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Linear Regression:</span>
              <span className="text-green-600 font-semibold">✓ Trained</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Random Forest:</span>
              <span className="text-green-600 font-semibold">✓ Trained</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">XGBoost:</span>
              <span className="text-blue-600 font-semibold">Training...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelTraining; 
import React from 'react';

const Dashboard: React.FC = () => {
  return (
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
};

export default Dashboard; 
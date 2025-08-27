import React from 'react';

const DataManagement: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Data Management</h1>
        <p className="text-xl text-gray-600">
          Upload, validate, and manage your training data
        </p>
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
                className="input-field"
              />
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: CSV, Excel, JSON
              </p>
            </div>
            <button className="btn-primary w-full">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement; 
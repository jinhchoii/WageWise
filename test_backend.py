#!/usr/bin/env python3
"""
Simple test script to verify the WageWise backend API is working
"""

import requests
import json
import time

def test_backend():
    base_url = "http://localhost:5000"
    
    print("🧪 Testing WageWise Backend API...")
    print("=" * 50)
    
    # Test 1: Health Check
    print("\n1. Testing Health Check...")
    try:
        response = requests.get(f"{base_url}/api/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend. Is the server running?")
        return False
    
    # Test 2: Get Models
    print("\n2. Testing Get Models...")
    try:
        response = requests.get(f"{base_url}/api/models")
        if response.status_code == 200:
            print("✅ Get models passed")
            models = response.json()
            print(f"   Found {models.get('total_models', 0)} models")
        else:
            print(f"❌ Get models failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Get models error: {e}")
    
    # Test 3: Salary Prediction
    print("\n3. Testing Salary Prediction...")
    test_data = {
        "experience_years": 5,
        "education_level": "Master",
        "job_title": "Data Scientist",
        "company_size": "Large",
        "location": "California",
        "industry": "Technology",
        "remote_work": True
    }
    
    try:
        response = requests.post(f"{base_url}/api/predict", json=test_data)
        if response.status_code == 200:
            print("✅ Salary prediction passed")
            result = response.json()
            if result.get('success'):
                salary = result.get('prediction', 0)
                confidence = result.get('confidence', 0)
                model = result.get('model_used', 'Unknown')
                print(f"   Predicted Salary: ${salary:,.0f}")
                print(f"   Confidence: {confidence:.1%}")
                print(f"   Model Used: {model}")
            else:
                print("   ❌ Prediction failed in response")
        else:
            print(f"❌ Salary prediction failed: {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Salary prediction error: {e}")
    
    # Test 4: Get Model Performance
    print("\n4. Testing Get Model Performance...")
    try:
        response = requests.get(f"{base_url}/api/models/performance")
        if response.status_code == 200:
            print("✅ Get model performance passed")
            perf = response.json()
            if perf.get('success'):
                print("   Model performance data retrieved")
            else:
                print("   ❌ Performance data retrieval failed")
        else:
            print(f"❌ Get model performance failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Get model performance error: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 Backend testing completed!")
    print("\nTo start using the application:")
    print("1. Backend is running on: http://localhost:5000")
    print("2. Frontend should be started with: npm start (in frontend directory)")
    print("3. Open browser to: http://localhost:3000")
    
    return True

if __name__ == "__main__":
    print("🚀 Starting WageWise Backend Tests...")
    print("Make sure the backend server is running on http://localhost:5000")
    print("If not, run: python backend/app.py")
    print()
    
    # Wait a moment for user to read
    time.sleep(2)
    
    test_backend() 
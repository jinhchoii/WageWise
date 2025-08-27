@echo off
echo Starting WageWise Backend Server...
echo.

cd backend

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing dependencies...
pip install -r requirements.txt

echo Starting Flask server...
python app.py

pause 
@echo off
echo Cleaning WageWise Frontend...
echo.

cd frontend

echo Removing node_modules and package-lock.json...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo Installing dependencies fresh...
npm install

echo Starting React development server...
npm start

pause 
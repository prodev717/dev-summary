@echo off
cd backend
start cmd /k py main.py
cd ..
cd frontend
start cmd /k npm run dev
cd ..
end
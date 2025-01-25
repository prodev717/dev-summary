@echo off
cd backend
start cmd /k py main.py
cd ..
cd frontend
start cmd /k npm run dev -- --host 0.0.0.0
cd ..
end
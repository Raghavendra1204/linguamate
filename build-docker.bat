@echo off
echo ====================================================
echo Building & Pushing Docker Image for HindiMate AI
echo Repository: raghavendra1169/hindimate:01
echo ====================================================

docker build -t raghavendra1169/hindimate:01 -t raghavendra1169/hindimate:latest .

if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Docker Image Built Successfully!
    echo Pushing to Docker Hub...
    docker push raghavendra1169/hindimate:01
    docker push raghavendra1169/hindimate:latest
    echo [COMPLETE] Pushed to raghavendra1169/hindimate!
) else (
    echo [ERROR] Docker build failed. Please ensure Docker Desktop is installed and running.
)
pause

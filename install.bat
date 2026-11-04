@echo off
echo ===================================
echo  Dierentuin van Pim - Installatie
echo ===================================
echo.
echo Bezig met installeren van benodigde bestanden...
echo Dit kan een paar minuten duren.
echo.
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Er ging iets mis. Heb je Node.js geinstalleerd?
    echo Download het van https://nodejs.org
    pause
    exit /b 1
)
echo.
echo Klaar! Je kunt nu start.bat dubbelklikken om te spelen.
pause

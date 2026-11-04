@echo off
echo ===================================
echo  Dierentuin van Pim wordt gestart
echo ===================================
echo.
echo De browser wordt zo geopend...
echo Sluit dit zwarte venster om te stoppen.
echo.
start "" http://localhost:5173
call npm run dev

@echo off
:: Přepne pracovní adresář do složky, kde leží tento .bat soubor
pushd "%~dp0"

echo Startuji PHP server...
:: Spustíme PHP na pozadí.
:: Teď už nemusíme řešit %~dp0 v cestě, protože jsme "uvnitř" té složky.
start "SlideshowServer" /B "php\php.exe" -S localhost:8080 -t "www"

echo Server bezi na http://localhost:8080
echo Pro ukonceni zavri toto okno.

:: 2. Pockame vterinu a pustime Chrome
timeout /t 1 /nobreak >nul
start chrome --app="http://localhost:8080"

:: 3. Nechame okno otevrene, aby ho uzivatel mohl manualne zavrit (a tim zabit server)
pause
taskkill /f /im php.exe >nul 2>&1
exit
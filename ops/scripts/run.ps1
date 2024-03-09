./php/php.exe -S localhost:8080
Start-Process -FilePath chrome.exe -ArgumentList '--start-fullscreen "localhost:8080/app"'

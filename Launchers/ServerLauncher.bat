@ECHO OFF 

cd ..\WebShop\WebShopFrontEnd\
if not exist "node_modules\" call npm i
start cmd.exe /k "call npm run serve"
cd .\..\..\WebShopBackend\
if not exist "node_modules\" call npm i
start cmd.exe /k "call npm start"
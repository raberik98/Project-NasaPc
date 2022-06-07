@ECHO OFF 

cd C:\
if not exist "data\" mkdir data
cd C:\data\
if not exist "db\" mkdir db
cd C:\Program Files\MongoDB\Server\5.0\bin
start cmd.exe /k "call mongod"
echo Waiting for mongod to start...
timeout /t 5 /nobreak
cd C:\Program Files\MongoDB\Tools\100\bin
start cmd.exe /C "call mongorestore --host 127.0.0.1 --db NasaPC "%userprofile%\Desktop\WebShopProject\Database\NasaPCDump""
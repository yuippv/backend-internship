pm2 stop all ; 
pm2 delete all ; 
git pull ; 
touch .env;
echo 'export DB_CONNECTION=mongodb+srv://vonderintern21:vonderintern112@cluster0.7v210.mongodb.net/test' >> .env
echo 'export Secret_Key = "secretApp"' >> .env
npm install ; 
pm2 start "npm start" ;
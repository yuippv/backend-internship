pm2 stop all ; 
pm2 delete all ; 
git pull ; 
rm -rf .env
touch .env;
echo '${DB}' >> .env
echo '${Secret_Key}' >> .env
npm install ; 
pm2 start "npm start" ;
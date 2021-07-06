pm2 stop all  
pm2 delete all  
git pull  
rm -rf .env
touch .env
echo "DB_CONNECTION="$DB:/.circleci/config.yml"" >> .env
echo "Secret_Key="$SK"" >> .env
npm install 
pm2 start "npm start" 
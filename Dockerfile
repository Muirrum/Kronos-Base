RUN apt-get nodejs && apt-get install npm && npm install pm2
CMD pm2 start OtmasBot/main.js
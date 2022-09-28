cd C:\dev\facilitaai-api
call git pull
call npm i
call docker-compose up -d --remove-orphans
call npx prisma migrate dev --name %DATE:~10,4%%DATE:~4,2%%DATE:~7,2%%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%
npm run start:dev
# Instruções
 - Usar node 14
 - Documentação do swagger `http://localhost:3333/api/v1`
 - Instalar o postgres com as seguintes configurações:
   - usuario: postgres
   - senha: root
   - porta: 5432
 - `npm i`
 - Sincronizar estrutura do banco `npx prisma migrate dev`. Para produção, rodar: `npx prisma migrate reset`
 - Cria os primeiros registros no banco `npm run seed`
 - `npm run start:dev`
 - Extensões sugeridas (VSCode)
  - Prisma
  - Prisma Insider
- Comandos úteis
 - `npx prisma format` - Mapeia e identa o schema.prisma
 -`npx prisma studio` - acesso ao banco de dados pelo Prisma Studio
 - `git push heroku main` deploy

# Deploy
 - Database: https://api.elephantsql.com/console/697f8810-9e8e-4e22-bcd6-e47c84f70d7a/browser?
 - API: https://dashboard.render.com/web/srv-ccp0f7qen0hrldblgb0g
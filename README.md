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
 - URL: https://facilitaai-api.onrender.com
 - Database: https://data.heroku.com/datastores/804df876-de25-4767-8abb-150758d44a7b#
 - API: https://dashboard.render.com/web/srv-ccp0f7qen0hrldblgb0g
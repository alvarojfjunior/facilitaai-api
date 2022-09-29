# Instruções
 - Usar node 14
 - Documentação do swagger `http://localhost:3333/api/v1`
 - Instalar o postgres com as seguintes configurações:
   - usuario: postgres
   - senha: root
   - porta: 5432
 - `npm i`
 - Run `npx prisma generate`
 - Run migrations in dev: `npx prisma migrate dev --name migration_name`. 
 - Run migrations in production: `npx prisma migrate deploy`
 - Reset migrations database: `npx prisma migrate reset`
 - Cria os primeiros registros no banco `npm run seed`
 - `npm run start:dev`
 - Extensões sugeridas (VSCode)
  - Prisma
  - Prisma Insider
- Comandos úteis
 - `npx prisma format` - Mapeia e identa o schema.prisma
 - `npx prisma studio` - acesso ao banco de dados pelo Prisma Studio
 - `git push heroku main` deploy

# Deploy AWS
 - `ssh -i utils/key-par-access.pem ec2-user@34.204.2.93`
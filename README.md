# Instruções
 - Usar node 14
 - Documentação do swagger `http://localhost:3333/api/v1`
 - Instalar o postgres com as seguintes configurações:
   - usuario: postgres
   - senha: root
   - porta: 5432
 - `npm i`
 - Sincronizar estrutura do banco `npx prisma migrate dev`
 - Cria os primeiros registros no banco `npm run seed`
 - `npm run start:dev`
 - Extensões sugeridas (VSCode)
  - Prisma
  - Prisma Insider
- Comandos úteis
 - `npx prisma format` - Mapeia e identa o schema.prisma
 -`npx prisma studio` - acesso ao banco de dados pelo Prisma Studio

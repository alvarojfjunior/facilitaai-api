const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
    const numeros = [5, 50, 40, 30, 10, 2];
    const numero = Math.floor(Math.random() * numeros.length);
    console.log(numeros[numero]); // resultado aleatório


   /*  const openAttendance = await prisma.attendance.findMany({
        include: {
          _count: {
            select: {
                where: { AND: [{ user_id: 1 }, { end: null }]},
                select: {
                    sim_chat: true
                }
            }
          }
        }
      }); */
    
      const res = await prisma.attendance.findMany({
        include: {
            _count: {
                select: {
                    user_id: true
                }
            }
        }
      })
    
    console.log(res)
})();
//insert into "User"("name", "email", "password", "type") values('josé', 'ze@test.com', '123', 'ADM') RETURNING id
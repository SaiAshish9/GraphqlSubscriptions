import { Prisma } from 'prisma-binding'


const prisma = new Prisma({
   typeDefs:'src/generated/prisma.graphql',
   endpoints:'192.168.99.100:4466'
})
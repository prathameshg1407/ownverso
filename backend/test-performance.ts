// test-performance.ts
console.time('prisma-connect');
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
await prisma.$connect();
console.timeEnd('prisma-connect');

console.time('simple-query');
await prisma.user.findFirst();
console.timeEnd('simple-query');

console.time('redis-ping');
// your redis client ping
console.timeEnd('redis-ping');
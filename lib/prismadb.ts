// import { PrismaClient } from "@prisma/client";
// import { createClient } from "@libsql/client";
// import { PrismaLibSQL } from "@prisma/adapter-libsql";

// const libsql = createClient({
//   url: `${process.env.TURSO_DATABASE_URL}`,
//   authToken: `${process.env.TURSO_AUTH_TOKEN}`,
// });

// declare global {
//   var prisma: PrismaClient | undefined;
//   var adapter: PrismaLibSQL | undefined;
// }

// const adapter = globalThis.adapter || new PrismaLibSQL(libsql);
// const prismadb = globalThis.prisma || new PrismaClient({ adapter });

// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = prismadb;
//   globalThis.adapter = adapter;
// }

// export default prismadb;

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;

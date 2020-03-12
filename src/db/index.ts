import pgPromise, { IMain, IDatabase } from 'pg-promise';
import pg from 'pg-promise/typescript/pg-subset';

export const pgp: IMain = pgPromise({
  /* Initialization Options */
});

export const db: IDatabase<pg.IClient> = pgp({
  connectionString: process.env.DB_URL as string,
  idleTimeoutMillis: 0,
  max: 20
});

// export const createdb = async (): Promise<IDatabase<pg.IClient>> => {
//   return pgp({
//     connectionString: process.env.DB_URL as string,
//     idleTimeoutMillis: 0,
//     max: 20
//   });
// };

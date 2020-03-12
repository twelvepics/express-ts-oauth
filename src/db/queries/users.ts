import { db, pgp } from '../../db';
import { User } from '../models';
import { users as sql } from '../../db/sql';
// debug
import debug from 'debug';
const dbg = debug('myapp:users:queries');

const getAll = async (): Promise<User[]> => {
  return db.any('SELECT * FROM users');
};

// http://vitaly-t.github.io/pg-promise/helpers.html#.insert
const create = async (user: User): Promise<User> => {
  ////////////////////////////////////////////
  // const { first_name, last_name, email, phone } = user;
  // return db.one(sql.create, [first_name, last_name, email, phone]);
  ////////////////////////////////////////////
  // OR
  ////////////////////////////////////////////
  // return (
  //   db.one(
  //     'INSERT INTO users VALUES (${first_name}, ${last_name}, ${email}, ${phone}) RETURNING *'
  //   ),
  //   user
  // );
  ////////////////////////////////////////////
  // OR
  ////////////////////////////////////////////

  const query = pgp.helpers.insert(user, undefined, 'users') + ' RETURNING *';
  dbg(query);
  return await db.one(query);
};

const findById = async (uuid: string): Promise<User | null> => {
  return db.oneOrNone('SELECT * FROM users WHERE user_id = $1', uuid);
};

const findByName = async (
  first_name: string,
  last_name: string
): Promise<User | null> => {
  return db.oneOrNone(
    'SELECT * FROM users WHERE first_name = $1 AND last_name = $2',
    [first_name, last_name]
  );
};

// http://vitaly-t.github.io/pg-promise/helpers.html#.update
const update = async (
  uuid: string,
  data: { [key: string]: any }
): Promise<User | null> => {
  const cs = new pgp.helpers.ColumnSet(Object.keys(data), { table: 'users' });
  const condition = pgp.as.format(' WHERE user_id = $1', uuid);
  const query = pgp.helpers.update(data, cs) + condition + ' RETURNING *';
  dbg(query);
  return await db.oneOrNone(query);
};

export { getAll, create, findById, findByName, update };

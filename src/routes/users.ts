import { Router } from 'express';
import {
  getAll,
  create,
  findById,
  findByName,
  update
} from '../db/queries/users';
import { User } from '../db/models';
// debug
import debug from 'debug';
const dbg = debug('myapp:users');

var router = Router();

/* LIST all users. */
router.get('', async (req, res, next) => {
  try {
    const users = await getAll();
    res.send(users);
  } catch (err) {
    dbg(err);
  }
});

/* CREATE an user */
router.post('', async (req, res, next) => {
  try {
    const _user = req.body;
    const user = await create(_user);
    res.send(user);
  } catch (err) {
    dbg(err);
  }
});

/* GET an user */
router.get('/:uuid', async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const user = await findById(uuid);
    // if user
    res.send(user);
  } catch (err) {
    dbg(err);
  }
});

/* UPDATE an user */
router.put('/:uuid', async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const data = req.body;
    const user_id = await update(uuid, data);
    // if user
    res.send({ done: user_id });
  } catch (err) {
    dbg(err);
  }
});

export { router };

import { Router } from 'express';
import { User } from '../db/models';
// debug
import debug from 'debug';
const dbg = debug('myapp:users');

var router = Router();

/* GET all users. */
router.get('/', async (req, res, next) => {
  res.send({ home: 'Sweet Home' });
});

export { router };

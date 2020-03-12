import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import http from 'http';
// debug
import debug from 'debug';
const dbg = debug('myapp:server');

// routes
import { router as homeRouter } from './routes/home';
import { router as usersRouter } from './routes/users';

var app = express();

// libs
app.use(cors()); // dev only needs options in prod
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', homeRouter);
app.use('/users', usersRouter);

/////////////////////////////
// dbg(process.env.PORT);
// dbg(typeof process.env.PORT);
// dbg(process.env.NODE_ENV);
/////////////////////////////

const normalizePort = (val: string): number => {
  return parseInt(val, 10);
};
var port = normalizePort(process.env.PORT || '3000');

// may be async later if required
const startHttpServer = (): void => {
  try {
    const server = http.createServer(app);
    server.listen(port);
    dbg(`Server started on port ${port}`);
  } catch (error) {
    dbg(error);
    throw error;
  }
};

startHttpServer();

///////////////////////////////////////////////////////
// KEEP
///////////////////////////////////////////////////////

// const startHttpServer = async (): Promise<void> => {
//   try {
//     // await or whatever for db inited here
//     dbg(db);
//     const users = await db.any('SELECT * FROM users');
//     dbg(users);
//     const server = http.createServer(app);
//     server.listen(port);
//     dbg(`Server started on port ${port}`);
//   } catch (error) {
//     dbg(error);
//     throw error;
//   }
// };

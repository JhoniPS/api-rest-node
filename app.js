import dotenv from 'dotenv';
import { resolve } from 'path';

import express from 'express';
import aluno from './src/routes/aluno';
import user from './src/routes/user';
import login from './src/routes/login';
import photo from './src/routes/photo';

import './src/database';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/alunos/', aluno);
    this.app.use('/users/', user);
    this.app.use('/login/', login);
    this.app.use('/photo/', photo);
  }
}

export default new App().app;

import { Router } from 'express';
import routes from './routes';
import { v1Component } from '../component';

class UsersComponent implements v1Component {
  constructor(public base: string, public routes: Router) {}
}

export default new UsersComponent('users', routes());

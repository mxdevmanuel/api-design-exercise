import { Router } from 'express';
import routes from './routes';
import { v1Component } from '../component';

class TicketsComponent implements v1Component {
  constructor(public base: string, public routes: Router) {}
}

export default new TicketsComponent('tickets', routes());

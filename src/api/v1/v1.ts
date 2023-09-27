import { Router } from 'express';
import { v1Component } from './components';

export class V1 {
  constructor() {}

  private _router = Router();

  public get router(): Router {
    return this._router;
  }

  public register(component: v1Component) {
    const base = component.base.startsWith('/') ? component.base : `/${component.base}`;
    this.router.use(base, component.routes);
  }
}

import { RouteCallback } from 'routerjs';

const withView = (View: any) => (fn: RouteCallback): RouteCallback => (req) => {
  return fn(req);
};

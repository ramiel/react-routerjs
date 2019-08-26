import { RouteCallback } from 'routerjs';

const withView = (View: any, target: string = 'main') => (
  fn: RouteCallback,
): RouteCallback => (req, context) => {
  context.__ROUTE_VIEWS__ = {
    ...context.__ROUTE_VIEWS__,
    [target]: View,
  };
  return fn(req, context);
};

export default withView;

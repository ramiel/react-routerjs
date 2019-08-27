import { RouteCallback } from 'routerjs';

const withView = (view: any, target: string = 'main') => (
  fn: RouteCallback,
): RouteCallback => (req, context) => {
  context.__ROUTE_VIEWS__ = {
    ...context.__ROUTE_VIEWS__,
    [target]: view,
  };
  return fn(req, context);
};

export default withView;

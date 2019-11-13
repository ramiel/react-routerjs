import { RouteCallback, Request, RouteContext } from 'routerjs';

export type RouteView = (req: Request, context: RouteContext) => unknown;

const withView = (view: RouteView, target: string = 'main') => (
  fn: RouteCallback,
): RouteCallback => (req, context) => {
  context.__ROUTE_VIEWS__ = {
    ...context.__ROUTE_VIEWS__,
    [target]: view(req, context),
  };
  return fn(req, context);
};

export default withView;

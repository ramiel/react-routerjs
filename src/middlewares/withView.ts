import { RouteCallback } from 'routerjs';

const withView = (View: any) => (fn: RouteCallback): RouteCallback => (
  req,
  context,
) => {
  context.__ROUTE_VIEW__ = View;
  return fn(req, context);
};

export default withView;

import { RouteContext, ErrorCallback } from 'routerjs';

export type RouteErrorView = (e: Error, context: RouteContext) => unknown;

const withErrorView = (view: RouteErrorView, target: string = 'main') => (
  fn: ErrorCallback,
): ErrorCallback => (e, context) => {
  context.__ROUTE_VIEWS__ = {
    ...context.__ROUTE_VIEWS__,
    [target]: view(e, context),
  };
  return fn(e, context);
};

export default withErrorView;

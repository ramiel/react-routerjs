import React, { useContext, Suspense, SuspenseProps } from 'react';
import { RouterContext } from './RouterProvider';

const RouteView: React.SFC<Pick<SuspenseProps, 'fallback'>> = ({
  fallback,
}) => {
  const routerContext = useContext(RouterContext);
  console.log(
    routerContext &&
      routerContext.context &&
      routerContext.context.__ROUTE_VIEW__,
  );
  return (
    <Suspense fallback={fallback}>
      {(routerContext &&
        routerContext.context &&
        routerContext.context.__ROUTE_VIEW__) ||
        fallback}
    </Suspense>
  );
};

export default RouteView;

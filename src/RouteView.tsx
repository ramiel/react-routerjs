import React, { useContext, Suspense, SuspenseProps } from 'react';
import { RouterContext } from './RouterProvider';

interface RouteViewProps extends Pick<SuspenseProps, 'fallback'> {
  target?: string;
}

const RouteView: React.SFC<RouteViewProps> = ({
  fallback,
  target = 'main',
}) => {
  const routerContext = useContext(RouterContext);
  return (
    <Suspense fallback={fallback}>
      {(routerContext &&
        routerContext.context &&
        routerContext.context.__ROUTE_VIEWS__ &&
        routerContext.context.__ROUTE_VIEWS__[target]) ||
        fallback}
    </Suspense>
  );
};

export default RouteView;

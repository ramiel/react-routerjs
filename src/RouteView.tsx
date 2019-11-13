import React, { useContext, Suspense, SuspenseProps } from 'react';
import { RouterContext } from './RouterProvider';

interface RouteViewBaseProps {
  target?: string;
}

interface RouteViewPropsWithSuspense
  extends RouteViewBaseProps,
    Pick<SuspenseProps, 'fallback'> {
  disableSuspense?: false;
}

interface RouteViewPropsWithoutSuspense extends RouteViewBaseProps {
  disableSuspense?: true;
}

const RouteView: React.SFC<
  RouteViewPropsWithSuspense | RouteViewPropsWithoutSuspense
> = (props) => {
  const { target = 'main', disableSuspense = false } = props;
  const { fallback } = props as RouteViewPropsWithSuspense;
  const routerContext = useContext(RouterContext);
  if (disableSuspense) {
    return (
      routerContext &&
      routerContext.context &&
      routerContext.context.__ROUTE_VIEWS__ &&
      routerContext.context.__ROUTE_VIEWS__[target]
    );
  }
  if (
    !routerContext ||
    !routerContext.context ||
    !routerContext.context.__ROUTE_VIEWS__ ||
    !routerContext.context.__ROUTE_VIEWS__[target]
  )
    return <>{fallback}</>;
  return (
    <Suspense fallback={fallback}>
      {routerContext.context.__ROUTE_VIEWS__[target]}
    </Suspense>
  );
};

export default RouteView;

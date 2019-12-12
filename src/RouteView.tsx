import React, {
  useContext,
  Suspense,
  SuspenseProps,
  useState,
  useEffect,
} from 'react';
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
  const { fallback = null } = props as RouteViewPropsWithSuspense;
  const routerContext = useContext(RouterContext);
  const views = routerContext?.context?.__ROUTE_VIEWS__ || {};
  const nextView = views[target];

  const [currentView, setCurrentView] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    if (!currentView || (!!nextView && nextView !== currentView)) {
      setCurrentView(nextView);
    }
  }, [nextView]);

  if (disableSuspense) {
    return <>{currentView}</>;
  }
  if (!currentView) return <>{fallback}</>;
  return <Suspense fallback={fallback}>{currentView}</Suspense>;
};

export default React.memo(RouteView);

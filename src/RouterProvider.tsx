import React, { useState } from 'react';
import { Router, RouterOptions, RouteContext } from 'routerjs';

export interface RouterContextContent {
  options: Omit<RouterOptions, 'engine'>;
  context: RouteContext | null;
  router: Router;
}

export const RouterContext = React.createContext<RouterContextContent | null>(
  null,
);

let initialized = false;

interface RouterProviderProps {
  router: Router;
  children: React.ReactNode | React.ReactNode[];
}

const RouterProvider = ({ router, children }: RouterProviderProps) => {
  const [currentContext, setCurrentContext] = useState<RouteContext | null>(
    null,
  );

  if (!initialized) {
    initialized = true;
    router.always((ctx) => {
      setCurrentContext(ctx);
    });
    router.error('*', (_error, ctx) => {
      setCurrentContext(ctx);
    });
  }
  return (
    <RouterContext.Provider
      value={{
        options: router._getOptions(),
        context: currentContext,
        router,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export default RouterProvider;

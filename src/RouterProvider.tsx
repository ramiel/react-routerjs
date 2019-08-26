import React, { useState } from 'react';
import { Router, RouterOptions, RouteContext } from 'routerjs';

interface RouterContextContent {
  options: Omit<RouterOptions, 'engine'>;
  path: RouteContext | null;
  navigate: (path: string) => void;
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
  const [currentPath, setCurrentPath] = useState<RouteContext | null>(null);

  if (!initialized) {
    initialized = true;
    router.always((ctx) => {
      setCurrentPath(ctx);
    });
  }
  return (
    <RouterContext.Provider
      value={{
        options: router._getOptions(),
        path: currentPath,
        navigate: router.navigate,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export default RouterProvider;

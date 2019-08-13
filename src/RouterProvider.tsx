import React, { useState } from 'react';
import { Router, RouterOptions } from 'routerjs';

interface RouterContextContent {
  options: RouterOptions;
  path: string | null;
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
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  if (!initialized) {
    initialized = true;
    router.always((req) => {
      setCurrentPath(req);
    });
  }
  return (
    <RouterContext.Provider
      value={{
        options: router._getOptions(),
        path: currentPath,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export default RouterProvider;

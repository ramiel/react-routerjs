import { useContext } from 'react';
import { RouterContext } from './RouterProvider';

const useRouter = () => {
  const routerContext = useContext(RouterContext);
  if (!routerContext) {
    throw new Error(
      '"useRouter" hook can be used only in components descendants of <RouterProvider>',
    );
  }
  return routerContext;
};

export default useRouter;

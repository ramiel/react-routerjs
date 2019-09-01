import { useContext } from 'react';
import { RouterContext } from './RouterProvider';

const useRouter = () => {
  const routerContext = useContext(RouterContext);
  return routerContext;
};

export default useRouter;

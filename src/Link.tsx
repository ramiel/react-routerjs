import React, { AnchorHTMLAttributes, useContext } from 'react';
import { RouterContext } from './RouterProvider';

const Link: React.SFC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({children, href,...props}) => {
  const ctx = useContext(RouterContext);
  
  const newHref = ctx ? `${ctx.options.basePath}/${href}` : href;
  return <a href={newHref} {...props}>{children}</a>
}

export default Link;

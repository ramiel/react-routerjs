import React, { AnchorHTMLAttributes, useContext } from 'react';
import { RouterContext } from './RouterProvider';

const Link: React.SFC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  href,
  ...props
}) => {
  const ctx = useContext(RouterContext);

  if (!ctx) {
    console.warn(
      'Link must be descendant of a RouterProvider. Fallback to a regular anchor',
    );
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  const newHref = `${ctx.options.basePath}${href}`;
  return (
    <a
      href={newHref}
      {...props}
      data-routerjs-ignore
      onClick={(e) => {
        e.preventDefault();
        ctx.navigate(newHref);
      }}
    >
      {children}
    </a>
  );
};

export default Link;

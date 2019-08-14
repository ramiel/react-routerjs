import React from 'react';
import { Router, RouterOptions } from 'routerjs';
interface RouterContextContent {
    options: Omit<RouterOptions, 'engine'>;
    path: string | null;
    navigate: (path: string) => void;
}
export declare const RouterContext: React.Context<RouterContextContent | null>;
interface RouterProviderProps {
    router: Router;
    children: React.ReactNode | React.ReactNode[];
}
declare const RouterProvider: ({ router, children }: RouterProviderProps) => JSX.Element;
export default RouterProvider;

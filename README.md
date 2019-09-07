[![npm version](https://badge.fury.io/js/react-routerjs.svg)](https://badge.fury.io/js/react-routerjs)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/FabrizioRuggeri)

# Routerjs - React


React bindings for [RouterJS](https://github.com/ramiel/router.js). These bindings simplify the usage 
of RouterJS in a react project

<!-- vscode-markdown-toc -->
* 1. [Installation](#Installation)
* 2. [Usage](#Usage)
* 3. [Link](#Link)
* 4. [View](#View)
* 5. [RouterContext and useRouter hook](#RouterContextanduseRouterhook)
* 6. [Advanced](#Advanced)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->


##  1. <a name='Installation'></a>Installation

You need to install both `RouterJS` and `react-routerjs`.

with yarn

```
yarn add routerjs react-routerjs
```

or with npm

```
npm install --save routerjs react-routerjs
```


##  2. <a name='Usage'></a>Usage

The main component provided by this library is a `RouterProvider` to which you need to pass your configured
router. You should put this provider on a top position in your react project. To know how to define routes
refer to [RouterJS documentation](https://github.com/ramiel/router.js)

```jsx
import { createRouter } from 'routerjs';
import { RouterProvider } from 'react-routerjs';
import App from './App'; // you react app code

const router = createRouter()
  .get('/', () => {
    // route handler
  });


ReactDOM.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
, document.getElementById('app'));

// Run the router after the render method 
// if you want to parse also the entrance url
router.run();
```

Any other component provided by this library must be a descendant of the RouterProvider.

##  3. <a name='Link'></a>Link

A `Link` component is provided to easily create anchors. Always remember that also normal anchors will fire router events (see [documentation for this](https://github.com/ramiel/router.js/tree/master#BrowserHistoryEngine)) but the advantage of using the `Link` component is that you can omit the `basePath`, if any, since it will automatically prepend it to any href. `Link` takes the same attributes as an anchor

```js
<Link href="/post/14">Article on cats</Link>
```

If `basePath` is `/blog`

```jsx
<Link href="/posts">Post list</Link>
// is equivalent to
<a href="/blog/posts">Post list</a>
```

__NOTE__: `Link` will always run your handlers even if `bindClick` is set ot false in your router engine, as explained [here](https://github.com/ramiel/router.js/tree/master#BrowserHistoryEngine).

##  4. <a name='View'></a>View

react-routerjs applies an opinionated way of showing a view depending on the route. This is done through two components:

- a `withView` middleware
- a `RouteView` component

Use `withView` to declare which View to show on a route. It accepts a function that gets the current `req` and `context`. You may use it to pass parameters to your components.

```js
import { createRouter } from 'routerjs';
import { withView } from 'react-routerjs';
import UserList from './UserList';
import Post from './Post';

const router = createRouter()
  .get('/users', withView((req, ctx) => <UserList />)(
    async (req, context) => {
      context.users = await loadUsers();
    }
  ))
  .get('/post/:id', withView((req, ctx) => <Post id={req.params.id} />)(
    (req, context) => {
      await setPostAsVisited(req.params.id);
    }
  ))
  .run();
```

you can also use `react.lazy` and return a promise instead. This way your component will be lazy loaded only when the route is visited!

```js
// ... as before
const Post = React.lazy(() => import('./Post'));

router
  .get('/post/:id', withView((req, ctx) => <Post id={req.params.id} />)(
    (req, context) => {
      await setPostAsVisited(req.params.id);
    }
  ))
```

Now the view will be shown in your application where the `RouteView` placeholder is placed

```jsx
import { RouteView } from 'react-routerjs';

<div className="content">
  <RouteView />
</div>
```

`RouteView` component accepts a `fallback` props since it internally uses [React Suspense](https://reactjs.org/docs/react-api.html#reactsuspense).

The couple `withView` and `RouteView` takes another parameter, called `target`. The default `target` is called `main` but you can specify a different one. This let you build more complex applications. In this example we define another target called `sidebar` to choose which view to show in a sidebar

```js
import { createRouter, compose } from 'routerjs';
import { withView } from 'react-routerjs';

import UserList from './UserList';
import UserSidebar from './UserSidebar';

const router = createRouter()
  .get('/users', compose(
    withView(<UserList />),  // this is in target "main" which is the default
    withView(<UserSidebar />, 'sidebar'), // this is in target "sidebar"
  )(
    async (req, context) => {
      context.users = await loadUsers();
    }
  ));
```

Later, in your application

```jsx
<div className="main">
  <div className="content">
    /* This will show the UserList component */
    <RouteView target="main" /> 
  </div>
  <div className="sidebar">
    /* This will show the UserSidebar component */
    <RouteView target="sidebar" />
  </div>
</div>
```

You can do the same in case of error just using `withErrorView`

```js
import { createRouter, compose } from 'routerjs';
import { withErrorView } from 'react-routerjs';

import View404 from './View404';

const on404 = () => {
  // ...
}

const router = createRouter()
  // ....
  .error(
    404, 
    withErrorView((error, ctx) => <View404 path={ctx.path} />)(on404)
  )
```

The only difference is that you have access to the error, not the request.

##  5. <a name='RouterContextanduseRouterhook'></a>RouterContext and useRouter hook

To access current router context and router methods in your components, you can use the `useRouter` hook

```jsx
import { useRouter } from 'react-routerjs';

const MyComponent = () => {
  const routerContext = useRouter();

  if(routerContext) {
    routerContext.router.navigate('/somewhere'); // method to navigate
    routerContext.context.path(); // access current path
    routerContext.context.currentUser; // For example, if your route populate the context with the user
  }
}
```

The routerContext contains the following properties:

The router instance with all the [router methods](https://github.com/ramiel/router.js/tree/master#Routermethods).    
The most useful will probably be:
- __router.navigate__: a method to navigate to a desired url
- __router.buildUrl__: a method to build an url considering the basePath

and the [route context](https://github.com/ramiel/router.js/tree/master#Context)
- __context__: the router context which contains

Refer to its documentation to know how the context works.

__NOTE__ remember that `routerContext` can be `null`, so check it before usage

If you cannot use `hooks`, you can use the regular [react context](https://reactjs.org/docs/context.html) to access the same values.

##  6. <a name='Advanced'></a>Advanced

This is pretty much all you need to know to use RouterJS with React. Consider that RouterJS is thought to be framework agnostic and this is just one of the possible way to use it with React. If you find that this way is not the best for your project, or you want to implement a different coupling between React and RouterJS, you should create your own implementation: it's very fun!

To do it, study carefully how RouterJS works and remember that the router has an handy method, `router.always((context) => {})`, that let you attach some code and execute it for any route! Also, look at the implementation of this project to get some idea.

// import {
// } from 'react-router';
import {
  matchPath, Router, Switch, Route, Redirect,
} from 'react-router-dom';
import assert from 'assert';
import React from 'react';

const RouteInstanceMap = {
  get(key) {
    return key._routeInternalComponent;
  },
  has(key) {
    return key._routeInternalComponent !== undefined;
  },
  set(key, value) {
    key._routeInternalComponent = value;
  },
};
const RouteWithProps = ({
  path, exact, strict, render, location, sensitive, ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    strict={strict}
    location={location}
    sensitive={sensitive}
    render={props => render({ ...props, ...rest })}
  />
);
function matchRoutes(routes, pathname, /* not public API */ branch = []) {
  routes.some((route) => {
    const match = route.path
      ? matchPath(pathname, route)
      : branch.length
        ? branch[branch.length - 1].match // use parent match
        : Router.computeRootMatch(pathname); // use default "root" match

    if (match) {
      branch.push({ route, match });

      if (route.routes) {
        matchRoutes(route.routes, pathname, branch);
      }
    }

    return match;
  });

  return branch;
}
let validKeys = ['modifyRouteProps'];
let plugins = [];
export function init(opts = {}) {
  plugins = [];
  validKeys = opts.validKeys || [];
}
function getItem(key) {
  assert(validKeys.indexOf(key) > -1, `Invalid key ${key}`);
  return plugins.filter(plugin => key in plugin).map(plugin => plugin[key]);
}
function apply(item, { initialValue, args }) {
  // eslint-disable-next-line no-param-reassign
  if (typeof item === 'string') item = getItem(item);
  assert(Array.isArray(item), 'item must be Array');
  return item.reduce((memo, fn) => {
    assert(typeof fn === 'function', 'applied item must be function');
    return fn(memo, args);
  }, initialValue);
}

function withRoutes(route) {
  if (RouteInstanceMap.has(route)) {
    return RouteInstanceMap.get(route);
  }

  const { Routes } = route;
  let len = Routes.length - 1;
  let Component = (args) => {
    const { render, ...props } = args;
    return render(props);
  };
  while (len >= 0) {
    const AuthRoute = Routes[len];
    const OldComponent = Component;
    Component = props => (
      <AuthRoute {...props}>
        <OldComponent {...props} />
      </AuthRoute>
    );
    len -= 1;
  }

  const ret = (args) => {
    const { render, ...rest } = args;
    return (
      <RouteWithProps
        {...rest}
        render={props => <Component {...props} route={route} render={render} />}
      />
    );
  };
  RouteInstanceMap.set(route, ret);
  return ret;
}
function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.key || i}
              from={route.path}
              to={route.redirect}
              exact={route.exact}
              strict={route.strict}
            />
          );
        }
        const RouteRoute = route.Routes ? withRoutes(route) : RouteWithProps;
        return (
          <RouteRoute
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            sensitive={route.sensitive}
            render={(props) => {
              const childRoutes = renderRoutes(
                route.routes,
                {},
                {
                  location: props.location,
                },
              );
              if (route.component) {
                const compatProps = {
                  ...props,
                  ...extraProps,
                };
                const newProps = apply('modifyRouteProps', {
                  initialValue: {
                    ...props,
                    ...extraProps,
                    ...compatProps,
                  },
                  args: { route },
                });
                return (
                  <route.component {...newProps} route={route}>
                    {childRoutes}
                  </route.component>
                );
              }
              return childRoutes;
            }}
          />
        );
      })}
    </Switch>
  ) : null;
}
export {
  matchRoutes,
  renderRoutes,
};

import Loadable from 'react-loadable';
// import importedComponent from 'react-imported-component';
import Loading from '../components/PageLoading/index';

// const Component = importedComponent( () => import('./Component'), {
//   LoadingComponent: Spinner,
//   ErrorComponent: FatalError
// });
// component: Loadable({
//   loader: () => import(/* webpackChunkName: "layouts__UserLayout" */'../pages/User/Login'),
//   loading: Loading,
// }),

export default [
  // user
  {
    path: '/user',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "layouts__UserLayout" */'../layouts/UserLayout'),
      loading: Loading,
    }),
    routes: [
      { path: '/user', redirect: '/user/login', exact: true },
      {
        path: '/user/login',
        name: 'login',
        exact: true,
        component: Loadable({
          loader: () => import(/* webpackChunkName: "layouts__UserLayout" */'../pages/User/Login'),
          loading: Loading,
        }),
      },
      {
        exact: true,
        component: Loadable({
          loader: () => import(/* webpackChunkName: "p__404" */'../pages/404'),
          loading: Loading,
        }),
      },
    ],
  },
  // app
  {
    path: '/',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "p__404" */'../layouts/BasicLayout'),
      loading: Loading,
    }),
    Routes: [require('../pages/Authorized').default],
    routes: [
      // dashboard
      {
        path: '/', redirect: '/dashboard', exact: true, authority: ['admin', 'user'],
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        exact: true,
        routes: [
          {
            path: '/dashboard',
            name: 'dashboard',
            component: Loadable({
              loader: () => import(/* webpackChunkName: "p__404" */'../pages/Dashboard/Dashboard'),
              loading: Loading,
            }),
            exact: true,
          },
        ],
      },
      {
        exact: true,
        component: Loadable({
          loader: () => import(/* webpackChunkName: "p__404" */'../pages/404'),
          loading: Loading,
        }),
      },
    ],
  },
];

import { ReactNode } from 'react';

import Home from 'pages/Home';
import Details from 'pages/Details';
import Create from 'pages/Create';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { PATH_POST, PATH_POST_DETAIL, PATH_CREATE } from './routes.paths';
import { IRouteModel } from '../types/route';

const appRoutes: IRouteModel[] = [
  {
    exact: true,
    path: PATH_POST,
    component: () => <Home />,
  },
  {
    exact: true,
    path: PATH_POST_DETAIL,
    component: () => <Details />,
  },
  {
    exact: true,
    path: PATH_CREATE,
    component: () => <Create />,
  },
];

const renderRoutes = (routes: typeof appRoutes) => (
  <>
    {routes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={route.component() as ReactNode}
      />
    ))}
  </>
);

export const RenderPages = () => (
  <Router>
    <Routes>{renderRoutes(appRoutes)}</Routes>
  </Router>
);

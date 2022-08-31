import React from 'react';

import Home from 'pages/Home';
import Details from 'pages/Details';
import Create from 'pages/Create';

import { PATH_POST, PATH_POST_DETAIL } from './routes.paths';
import { IRouteModel } from '../types/route';

export const appRoutes: IRouteModel[] = [
  {
    exact: true,
    path: PATH_POST,
    component: Home,
  },
  {
    exact: true,
    path: PATH_POST_DETAIL,
    component: Details,
  },
];

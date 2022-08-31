import { ReactNode } from 'react';

export interface IRouteModel {
  exact: boolean | any;
  path: string;
  component: () => ReactNode;
}

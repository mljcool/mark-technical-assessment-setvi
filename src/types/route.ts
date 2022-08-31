import { ComponentType } from 'react';

export interface IRouteModel {
  exact: boolean;
  path: string;
  component: ComponentType;
}

/* eslint-disable quote-props */
import { PathHelper as path } from 'core/helpers/path-helper';

export const rootPaths = {
  home: '',
  status: 'status',
  signin_oidc: 'signin-oidc',
  redirect_silent_renew: 'redirect-silent-renew',
  register: 'register',
  error: 'error',
  error_404: '404'
};

export const moduleNames = {
  carpoolStats: 'carpool-stats',
  employees: 'employees',
  cars: 'cars',
  travelPlans: 'travel-plans'
};

export const moduleGenericPaths = {
  view: ':id',
  create: 'create',
  edit: ':id/edit',
  list: ''
};

export const moduleCustomPaths = {
  overview: ':id/overview',
  assetProperties: ':id/all-properties'
};

export const appUrls: object = {
  'carpool-stats-list': path.combine([moduleNames.carpoolStats, moduleGenericPaths.list]),
  'employees-list': path.combine([moduleNames.employees, moduleGenericPaths.list]),
  'cars-list': path.combine([moduleNames.cars, moduleGenericPaths.list]),
  'travel-plans-list': path.combine([moduleNames.travelPlans, moduleGenericPaths.list]),
  'travel-plan-view': path.combine([moduleNames.travelPlans, moduleGenericPaths.view]),
  'travel-plan-edit': path.combine([moduleNames.travelPlans, moduleGenericPaths.edit])
};

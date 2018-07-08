import { matchPath } from 'react-router-dom';
import Constants from '../../../../api/constants';

/**
  * @summary mapping function between route pathname ('/admin') and route
  * name/label ('Admin').
  */
const getRouteLabel = (pathname) => {
  const route = Constants.ROUTES.find(({ path }) => (
    matchPath(pathname, { path, exact: true })
  ));
  return route ? route.label : undefined;
};

export default getRouteLabel;

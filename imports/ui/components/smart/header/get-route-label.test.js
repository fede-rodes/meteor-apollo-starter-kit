import Constants from '../../../../api/constants';
import getRouteLabel from './get-route-label';

describe('getRouteLabel', () => {
  it('should return the right label when existing route is provided', () => {
    Constants.ROUTES.forEach((route) => {
      expect(getRouteLabel(route.path)).toBe(route.label);
    });
  });

  it('should return undefined when route is not found', () => {
    expect(getRouteLabel('/some-wired-path')).toBe(undefined);
    expect(getRouteLabel('/admin ')).toBe(undefined);
    expect(getRouteLabel('/ ')).toBe(undefined);
  });
});

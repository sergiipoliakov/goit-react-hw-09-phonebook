import { Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';

export default function PublicRoute({
  component: Component,
  children,
  redirectTo,
  ...routerProps
}) {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);

  return (
    <Route {...routerProps}>
      {isLoggedIn && routerProps.restricted ? (
        <Redirect to={redirectTo} />
      ) : (
        children
      )}
    </Route>
  );
}

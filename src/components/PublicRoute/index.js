import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { authSelectors } from 'redux/auth';

function PublicRoute({
  component: Component,
  isAuthenticated,
  redirectTo,
  ...routerProps
}) {
  return (
    <Route
      {...routerProps}
      render={props =>
        isAuthenticated && routerProps.restricted ? (
          <Redirect to={redirectTo} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(PublicRoute);

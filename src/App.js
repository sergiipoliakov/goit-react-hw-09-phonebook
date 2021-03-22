import React, { Component, lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authOperations } from './redux/auth';
import routes from './routes';

import Container from './components/Container';

import AppBar from './components/AppBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const HomeView = lazy(() => import('./views/Home'));
const LoginView = lazy(() => import('./views/LoginView/index'));
const RegisterView = lazy(() => import('./views/RegisterView/index'));
const PhoneBookView = lazy(() => import('./views/PhoneBookView/index'));

class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }

  render() {
    return (
      <Container>
        <AppBar />
        <Suspense fallback={<p>Загружаю...</p>}>
          <Switch>
            <PublicRoute path={routes.home} exact component={HomeView} />
            <PrivateRoute
              path={routes.phoneBook}
              exact
              redirectTo={routes.login}
              component={PhoneBookView}
            />
            <PublicRoute
              path={routes.login}
              exact
              redirectTo={routes.phoneBook}
              restricted
              component={LoginView}
            />
            <PublicRoute
              path={routes.register}
              exact
              redirectTo={routes.phoneBook}
              restricted
              component={RegisterView}
            />
          </Switch>
        </Suspense>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};
export default connect(null, mapDispatchToProps)(App);

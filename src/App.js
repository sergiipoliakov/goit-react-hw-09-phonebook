import { lazy, Suspense, useEffect } from 'react';
import { Switch } from 'react-router-dom';

import { useDispatch } from 'react-redux';
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

export default function App() {
  const disaptch = useDispatch();

  useEffect(() => {
    disaptch(authOperations.getCurrentUser());
  }, [disaptch]);

  return (
    <Container>
      <AppBar />
      <Suspense fallback={<p>Загружаю...</p>}>
        <Switch>
          <PublicRoute path={routes.home} exact component={HomeView} />

          <PrivateRoute path={routes.phoneBook} exact redirectTo={routes.login}>
            <PhoneBookView />
          </PrivateRoute>

          <PublicRoute
            path={routes.login}
            exact
            redirectTo={routes.phoneBook}
            restricted
          >
            <LoginView />
          </PublicRoute>

          <PublicRoute
            path={routes.register}
            exact
            redirectTo={routes.phoneBook}
            restricted
          >
            <RegisterView />
          </PublicRoute>
        </Switch>
      </Suspense>
    </Container>
  );
}

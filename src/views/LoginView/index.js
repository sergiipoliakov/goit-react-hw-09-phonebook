import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { CSSTransition } from 'react-transition-group';
// import DublicateAlert from '../../components/DublicateAlert';
import Title from '../../components/Title/Title';

import styles from './LoginView.module.css';

// const mapStateToProps = state => ({
//   errorMessage: state.auth.error,
// });

// const mapDispatchToProps = {
//   onLogin: authOperations.logIn,
// };

export default function LoginView() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [showAlert, setShowAlert] = useState(false);
  // const [message, setMessage] = useState('');

  const handleEmail = event => {
    setEmail(event.target.value);
  };
  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(authOperations.logIn({ email, password }));

    setEmail('');
    setPassword('');
  };

  return (
    <div>
      {/* <DublicateAlert text={message} showAlert={showAlert} /> */}
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames={styles}
        unmountOnExit
      >
        <Title label="Страница ЛОГИНА" />
      </CSSTransition>

      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <label className={styles.label}>
          Почта
          <input
            className={styles.input}
            type="email"
            name="email"
            value={email}
            placeholder="Ivanov@mail.com"
            onChange={handleEmail}
          />
        </label>

        <label className={styles.label}>
          Пароль
          <input
            className={styles.input}
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={handlePassword}
          />
        </label>

        <button className={styles.button} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

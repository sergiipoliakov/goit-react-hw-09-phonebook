import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { CSSTransition } from 'react-transition-group';
import Title from '../../components/Title/Title';
import DublicateAlert from '../../components/DublicateAlert';
import styles from './RegisterView.module.css';

export default function RegisterView() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  const handleName = event => {
    setName(event.target.value);
  };
  const handlEmail = event => {
    setemail(event.target.value);
  };
  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (password.length < 6) {
      setShowAlert(true);

      return setTimeout(() => {
        setShowAlert(true);
      }, 2500);
    }

    dispatch(authOperations.register({ name, email, password }));

    setName('');
    setemail('');
    setPassword('');
    setShowAlert(false);
    setMessage('');
  };

  return (
    <div>
      <DublicateAlert
        text={message ? message : 'password must by more then 6 laters!'}
        showAlert={showAlert}
      />

      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames={styles}
        unmountOnExit
      >
        <Title label="Страница РЕГИСТРАЦИИ" />
      </CSSTransition>

      <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <label className={styles.label}>
          Имя
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            placeholder="Ivan Ivanov"
            onChange={handleName}
          />
        </label>

        <label className={styles.label}>
          Почта
          <input
            className={styles.input}
            type="email"
            name="email"
            value={email}
            placeholder="random@mail.com"
            onChange={handlEmail}
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
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

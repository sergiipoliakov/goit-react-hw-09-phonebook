import { Component } from 'react';
import { connect } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { CSSTransition } from 'react-transition-group';
import DublicateAlert from '../../components/DublicateAlert';
import Title from '../../components/Title/Title';

import styles from './LoginView.module.css';

class LoginView extends Component {
  state = {
    email: '',
    password: '',
    showAlert: false,
    message: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const messageError = this.props.errorMessage;

    console.log(messageError);

    if (messageError !== null) {
    }

    if (messageError === 'Request failed with status code 400') {
      this.setState({
        message: 'incorect password ader email!',
        showAlert: true,
      });
      return setTimeout(() => {
        this.setState({
          showAlert: false,
          message: '',
        });
      }, 2500);
    }

    this.props.onLogin(this.state);
    this.setState({
      name: '',
      email: '',
      password: '',
      showAlert: false,
      message: '',
    });
  };
  render() {
    const { email, password, message, showAlert } = this.state;

    return (
      <div>
        <DublicateAlert text={message} showAlert={showAlert} />
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames={styles}
          unmountOnExit
        >
          <Title label="Страница ЛОГИНА" />
        </CSSTransition>

        <form
          className={styles.form}
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <label className={styles.label}>
            Почта
            <input
              className={styles.input}
              type="email"
              name="email"
              value={email}
              placeholder="Ivanov@mail.com"
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
          </label>

          <button className={styles.button} type="submit">
            Войти
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errorMessage: state.auth.error,
});

const mapDispatchToProps = {
  onLogin: authOperations.logIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);

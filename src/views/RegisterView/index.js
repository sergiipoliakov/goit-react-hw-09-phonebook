import { Component } from 'react';
import { connect } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { CSSTransition } from 'react-transition-group';
import Title from '../../components/Title/Title';
import DublicateAlert from '../../components/DublicateAlert';
import styles from './RegisterView.module.css';

class RegisterView extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    showAlert: false,
    message: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { password } = this.state;
    const messageError = this.props.errorMessage;
    console.log(messageError);

    if (password.length < 6) {
      this.setState({
        showAlert: true,
      });

      return setTimeout(() => {
        this.setState({
          showAlert: false,
        });
      }, 2500);
    }

    if (messageError === 'Request failed with status code 400') {
      this.setState({
        message: 'user email is already registered',
        showAlert: true,
      });
      return setTimeout(() => {
        console.log(123131);
        this.setState({
          showAlert: false,
          message: '',
        });
      }, 2500);
    }

    this.props.onRegister(this.state);

    this.setState({
      name: '',
      email: '',
      password: '',
      message: '',
      showAlert: false,
    });
  };
  render() {
    const { name, email, password, message, showAlert } = this.state;

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

        <form
          onSubmit={this.handleSubmit}
          className={styles.form}
          autoComplete="off"
        >
          <label className={styles.label}>
            Имя
            <input
              className={styles.input}
              type="text"
              name="name"
              value={name}
              placeholder="Ivan Ivanov"
              onChange={this.handleChange}
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
            Зарегистрироваться
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
  onRegister: authOperations.register,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);

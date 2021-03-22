import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import styles from './DublicateAlert.module.css';

export default function DublicateAlert({ name, text, showAlert }) {
  return (
    <CSSTransition
      in={showAlert}
      classNames={styles}
      timeout={250}
      unmountOnExit
    >
      <div className={styles.dublucate}>
        <p>
          {name} {text}
        </p>
      </div>
    </CSSTransition>
  );
}

DublicateAlert.defaultProps = {
  name: '',
  showAlert: false,
  text: '',
};
DublicateAlert.propTypes = {
  name: PropTypes.string.isRequired,
  showAlert: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';

import styles from './Title.module.css';

const Title = ({ label }) => <h1 className={styles.title}>{label}</h1>;

Title.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Title;

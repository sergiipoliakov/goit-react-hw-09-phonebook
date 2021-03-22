import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import { authSelectors } from '../../redux/auth';
// import styles from './Navigations.module.css';

const styles = {
  link: {
    display: 'inline-block',
    textDecoration: 'none',
    padding: 12,
    fontWeight: 700,
    color: '#2A363B',
  },
  activeLink: {
    color: '#E84A5F',
  },
};

const Navigation = ({ isAuthenticated }) => (
  <nav>
    <NavLink
      style={styles.link}
      activeStyle={styles.activeLink}
      exact
      to={routes.home}
    >
      Home
    </NavLink>
    {isAuthenticated && (
      <NavLink
        style={styles.link}
        activeStyle={styles.activeLink}
        to={routes.phoneBook}
      >
        Phonebook
      </NavLink>
    )}
  </nav>
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Navigation);

import { authSelectors, authOperations } from '../../redux/auth';
import defaultAvatar from './default-avatar.png';
import styles from './UserMenu.module.css';

import { connect } from 'react-redux';

function UserMenu({ avatar, name, onLogout }) {
  return (
    <div className={styles.container}>
      <img src={avatar} alt="" width="32" className={styles.avatar} />
      <span className={styles.name}>Добро пожаловать, {name}</span>
      <button className={styles.button} type="button" onClick={onLogout}>
        Выйти
      </button>
    </div>
  );
}
const mapStateToProps = state => ({
  avatar: defaultAvatar,
  name: authSelectors.getUserEmail(state),
});

const mapDispatchToProps = {
  onLogout: authOperations.logOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);

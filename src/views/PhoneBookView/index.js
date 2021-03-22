import { connect } from 'react-redux';
import { Component } from 'react';
import { phoneBookOperations, phoneBookSelectors } from '../../redux/phoneBook';
import { CSSTransition } from 'react-transition-group';

import styles from './PhoneBookView.module.css';
import Title from '../../components/Title/Title';
import ContactForm from '../../components/ContactForm';
import ContactList from '../../components/ContactList';

class PhoneBookView extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <div className={styles.phoneBookView}>
        <div className={styles.title}>
          <CSSTransition
            in={true}
            appear={true}
            timeout={500}
            classNames={styles}
            unmountOnExit
          >
            <Title label="Phonebook" />
          </CSSTransition>
          {this.props.isLoadingPhoneBook && (
            <h1 className={styles.loading}>Загржаем...</h1>
          )}
        </div>
        <ContactForm />
        <ContactList />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isLoadingPhoneBook: phoneBookSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(phoneBookOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBookView);

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { phoneBookOperations, phoneBookSelectors } from '../../redux/phoneBook';
import { CSSTransition } from 'react-transition-group';

import styles from './PhoneBookView.module.css';
import Title from '../../components/Title/Title';
import ContactForm from '../../components/ContactForm';
import ContactList from '../../components/ContactList';

export default function PhoneBookView() {
  const dispatch = useDispatch();
  const isLoadingPhoneBook = useSelector(phoneBookSelectors.getLoading);

  useEffect(() => {
    dispatch(phoneBookOperations.fetchContacts());
  }, [dispatch]);

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
        {isLoadingPhoneBook && <h1 className={styles.loading}>Загржаем...</h1>}
      </div>
      <ContactForm />
      <ContactList />
    </div>
  );
}

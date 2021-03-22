import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { phoneBookOperations, phoneBookSelectors } from '../../redux/phoneBook';
import DublicateAlert from '../DublicateAlert';

import styles from './ContactForm.module.css';

export default function ContactForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleName = event => {
    setName(event.target.value);
  };

  const [number, setNumber] = useState('');

  const handleNumber = event => {
    setNumber(event.target.value);
  };

  const [dublicateName, setDublicateName] = useState(false);

  const contacts = useSelector(phoneBookSelectors.getAllContacts);

  const onSubmit = useCallback(
    (name, number) => dispatch(phoneBookOperations.addContact(name, number)),
    [dispatch],
  );

  const handleSubmit = event => {
    event.preventDefault();

    if (name !== '' && number !== '') {
      const duplicate = contacts.filter(
        contact => contact.name === event.target.elements[0].value,
      );

      if (duplicate.length > 0) {
        setDublicateName(true);

        return setTimeout(() => {
          setDublicateName(false);
        }, 2500);
      }

      onSubmit(name, number);
      setName('');
      setNumber('');

      return;
    }
    if (name === '') {
      alert('write NAME!');
    } else if (number === '') {
      alert('write NUMBER!!');
    }
  };

  return (
    <>
      <DublicateAlert
        name={name}
        showAlert={dublicateName && Boolean(name)}
        text={'is ready exist'}
      />

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="name"
            value={name}
            onChange={handleName}
            placeholder="name: Sergii Poliakov"
            name="name"
          />
        </label>

        <label className={styles.label}>
          Number
          <input
            className={styles.input}
            type="tel"
            value={number}
            placeholder="tel: 096-123-12-12"
            onChange={handleNumber}
            name="number"
          />
        </label>
        <button type="submit" className={styles.button}>
          Add contact
        </button>
      </form>
    </>
  );
}

ContactForm.defaultProps = {};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

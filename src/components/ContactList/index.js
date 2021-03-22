import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { phoneBookOperations, phoneBookSelectors } from '../../redux/phoneBook';
import Filter from '../Filter';
import Title from '../Title/Title';
import './ContactList.css';

import ContactListItem from '../ContactListItem';

export default function ContactList() {
  const dispatch = useDispatch();

  const contacts = useSelector(phoneBookSelectors.getAllContacts);
  const filteredContacts = useSelector(phoneBookSelectors.getfilteredContacts);
  const searchName = useSelector(phoneBookSelectors.getFilter);

  const onRemoveContact = contactId =>
    dispatch(phoneBookOperations.deleteContact(contactId));

  return (
    <>
      <CSSTransition
        in={contacts.length > 1}
        timeout={500}
        classNames="filter-slideIn"
        unmountOnExit
      >
        <Filter />
      </CSSTransition>

      <CSSTransition
        in={filteredContacts.length > 0}
        timeout={500}
        classNames="ContactList-title-slideIn"
        unmountOnExit
      >
        <Title label="Contacts" />
      </CSSTransition>

      <CSSTransition
        in={filteredContacts.length === 0 && contacts.length > 1}
        timeout={500}
        classNames="ContactList-title-slideIn"
        unmountOnExit
      >
        <Title label={`Contact name: "${searchName}"  not found`} />
      </CSSTransition>

      <TransitionGroup component="ul" className="ContactList">
        {filteredContacts.map(({ id, name, number }) => (
          <CSSTransition
            key={id}
            timeout={250}
            classNames="ContactList-item-fade"
          >
            <ContactListItem
              id={id}
              name={name}
              number={number}
              onRemove={() => onRemoveContact(id)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      number: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  onRemoveContact: PropTypes.func,
};

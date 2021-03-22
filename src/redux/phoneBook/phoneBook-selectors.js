import { createSelector } from '@reduxjs/toolkit';

const getLoading = state => state.phoneBook.loading;

const getFilter = state => state.phoneBook.filter;

const getAllContacts = state => state.phoneBook.items;

const getfilteredContacts = createSelector(
  [getAllContacts, getFilter],
  (contacts, filter) => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
    return filteredContacts;
  },
);

export default {
  getLoading,
  getFilter,
  getfilteredContacts,
  getAllContacts,
};

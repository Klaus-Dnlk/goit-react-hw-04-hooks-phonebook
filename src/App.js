import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from './components/useLocalStorage';
import s from './App.module.scss';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList ';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const id = uuidv4();

  const addNewContact = (name, number) => {
    if (contacts.find(e => e.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    } else {
      const contact = {
        name,
        number,
        id,
      };
      setContacts(s => [...s, contact]);
    }
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(e =>
      e.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(e => e.id !== contactId));
  };

  return (
    <div className={s.section}>
      <h2 className={s.title}>Phonebook</h2>
      <ContactForm newContact={addNewContact} />
      <h2 className={s.title}>Contacts</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
}

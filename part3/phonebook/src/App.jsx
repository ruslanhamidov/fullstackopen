import { useState, useEffect } from "react";
import Title from "./components/Title";
import Field from "./components/Field";
import Notification from "./components/Notification"
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [isEmpty, showFiltered] = useState(true);
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('success')

  const personToShow = isEmpty
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(newSearch));

  const handleOnChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleOnChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleOnChangeSearch = (event) => {
    const val = event.target.value;
    val ? showFiltered(false) : showFiltered(true);
    setNewSearch(val);
  };

  const getPerson = (entry) => {
    return persons.find((person) => entry.name === person.name);
  };

  const hook = () => {
    personService.getAll()
      .then((initialPersons) => {
      setPersons(initialPersons);
      })
  };

  useEffect(hook, []);

  const handleInput = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    !getPerson(person) ? createPerson(person) : replaceNumber(person, newNumber);

    setNewName("");
    setNewNumber("");
  };

  const createPerson = (person) => {
    personService.create(person).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      showMessage('success', `${person.name} was added to phonebook`)
      })
  }

  const showMessage = (className, message) => {
    setMessageClass(className)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const replaceNumber = (entry, newNumber) => {
    const oldPerson = getPerson(entry)
    const changedPerson = {
      ...oldPerson,
      number: newNumber,
    };

    const userConfirmed = window.confirm(
      `${changedPerson.name} is already added to the phonebook, replace the old number with a new one?`);

    if (userConfirmed) {
      personService
        .update(changedPerson.id, changedPerson)
        .then((response) => {
          showMessage('success', `${changedPerson.name}'s number was changed`)
          hook()
        })
        .catch((error) => {
          console.error("Error updating resource:", error);
        });
    }
  }

  const deletePersonById = (person) => {
    const deletedPerson = getPerson(person)

    const userConfirmed = window.confirm(`Delete ${deletedPerson.name}`);

    if (userConfirmed) {
      personService
        .deletePerson(deletedPerson.id)
        .then((response) => {
          showMessage('success', `${deletedPerson.name} was deleted`)
          hook();
        })
        .catch((error) => {
          showMessage('error', `Information of ${deletedPerson.name} has already been removed from server`)
        })
    }
  };

  return (
    <div>
      <Title title="Phonebook" />
      <Notification type={messageClass} message={message} />

      <Field text='filter shown with' value={newSearch} onChange={handleOnChangeSearch} />

      <Title title="add a new" />
      <form onSubmit={handleInput}>
          <Field text='name:' value={newName} onChange={handleOnChangeName} />
          <Field text='number:' value={newNumber} onChange={handleOnChangeNumber} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <Title title="Numbers" />
      {personToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePersonById(person)}>delete</button>
        </li>
      ))}
    </div>
  );
};

export default App;

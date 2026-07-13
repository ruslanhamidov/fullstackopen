import { useState, useEffect } from "react";
import Title from "./components/Title";
import Input from "./components/Input";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [isEmpty, showFiltered] = useState(true);

  const hook = () => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

  useEffect(hook, []);

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

  const checkEntry = (entry) => {
    return persons.find((person) => entry.name === person.name);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    !checkEntry(person)
      ? personService.create(person).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        })
      : replaceNumber(person, newNumber);

    setNewName("");
    setNewNumber("");
  };

  const replaceNumber = (entry, newNumber) => {
    const oldPerson = checkEntry(entry)
    const changedPerson = {
      ...oldPerson,
      number: newNumber,
    };
    const userConfirmed = window.confirm(`${changedPerson.name} is already added to the phonebook, replace the old number with a new one?`);

    if (userConfirmed) {
      personService
        .update(changedPerson.id, changedPerson)
        .then((response) => {
          console.log(`Updated successfully ${changedPerson.name}`);
          hook()
        })
        .catch((error) => {
          console.error("Error updating resource:", error);
        });
    }
  }

  const deletePersonById = (id) => {
    const person = persons.find((n) => n.id === id);

    const userConfirmed = window.confirm(`Delete ${person.name}`);

    if (userConfirmed) {
      personService
        .deletePerson(id)
        .then((response) => {
          console.log(`Deleted successfully ${person.name}`);
          hook();
        })
        .catch((error) => {
          console.error("Error deleting resource:", error);
        });
    }
  };

  return (
    <div>
      <Title title="Phonebook" />
      <div>
        filter shown with
        <Input value={newSearch} onChange={handleOnChangeSearch} />
      </div>
      <Title title="add a new" />
      <form onSubmit={addPerson}>
        <div>
          name:
          <Input value={newName} onChange={handleOnChangeName} />
        </div>
        <div>
          number:
          <Input value={newNumber} onChange={handleOnChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Title title="Numbers" />
      {personToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePersonById(person.id)}>delete</button>
        </li>
      ))}
    </div>
  );
};

export default App;

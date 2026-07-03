import { useState } from "react";
import Title from "./components/Title";
import Input from "./components/Input";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [isEmpty, showFiltered] = useState(true);

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
    };
    !checkEntry(person)
      ? setPersons(persons.concat(person))
      : alert(`${person.name} is already added to phonebook`);
    setNewName("");
    setNewNumber("");
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
        </li>
      ))}
    </div>
  );
};

export default App;

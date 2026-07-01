import { useState } from "react";
import Title from "./Title";
import Button from "./Button";
import Stats from "./Stats"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  return (
    <div>
      <Title text={"give feedback"} />
      <Button func={addGood} text="good" />
      <Button func={addNeutral} text="neutral" />
      <Button func={addBad} text="bad" />
      <Title text={"statistics"} />
      <Stats text='good' value={good} />
      <Stats text='neutral' value={neutral} />
      <Stats text='bad' value={bad} />
    </div>
  );
};

export default App;

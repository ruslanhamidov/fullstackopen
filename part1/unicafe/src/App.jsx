import { useState } from "react";
import Title from "./Title";
import Button from "./Button";
import Stats from "./Stats";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [avg, setAvg] = useState(0);
  const [positive, setPositive] = useState(0);

  const addGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    computeAvg();
    positivePercent();
  };
  const addNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    computeAvg();
    positivePercent();
  };
  const addBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    computeAvg();
    positivePercent();
  };

  const computeAvg = () => {
    let computed = (good - bad) / all;
    setAvg(computed);
  };

  const positivePercent = () => {
    let pos = (good / all) * 100;
    setPositive(`${pos} %`);
  };

  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <div>
        <Title text={"give feedback"} />
        <Button func={addGood} text="good" />
        <Button func={addNeutral} text="neutral" />
        <Button func={addBad} text="bad" />
        <Title text={"statistics"} />
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <Title text={"give feedback"} />
      <Button func={addGood} text="good" />
      <Button func={addNeutral} text="neutral" />
      <Button func={addBad} text="bad" />
      <Title text={"statistics"} />
      <table>
        <tr>
          <td>
            <Stats text="good" value={good} />
          </td>
        </tr>
        <tr>
          <td>
            <Stats text="neutral" value={neutral} />
          </td>
        </tr>
        <tr>
          <td>
            <Stats text="bad" value={bad} />
          </td>
        </tr>
        <tr>
          <td>
            <Stats text="all" value={all} />
          </td>
        </tr>
        <tr>
          <td>
            <Stats text="average" value={avg} />
          </td>
        </tr>
        <tr>
          <td>
            <Stats text="positive" value={positive} />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default App;

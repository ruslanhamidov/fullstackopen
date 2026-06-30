import { useState } from 'react'
import Display from './Display'
import Button from './Button'

const App = () => {
  const [ counter, setCounter ] = useState(0)
  const [ letter, setLetter ] = useState('')
  const word = ['h', 'e', 'l', 'l', 'o']

  const setToZero = () => setCounter(0)
  const increaseByOne = () => setCounter(counter + 1)

  const setToEmpty = () => setLetter('')
  const displayLetter = () => setLetter(letter + word[counter])
  

  return (
    <div>
      <Display data={counter} />
      <Display data={letter} />

      <Button
        onClick={displayLetter}
        text={'Print letter'}
      />
      <Button
        onClick={setToEmpty}
        text={'Zeroify letter'}
      />
      <Button
        onClick={increaseByOne}
        text={'Plus'}
      />
      <Button
        onClick={setToZero}
        text={'Zeroify'}
      />
    </div>
    
  )
}

export default App
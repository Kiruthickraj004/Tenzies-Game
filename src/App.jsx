import { useState } from 'react';
import './App.css';
import Dice from './components/Die';
import Won from './components/Won';
import { nanoid } from 'nanoid';
import ConfettiExplosion from 'react-confetti-explosion';

function App() {
  
  function allNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }
  
  function newNumbers() {
    setDice(prevDice => 
      prevDice.map(die => (die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }))
    );
  }

  function resetDice() {
    setDice(allNewDice());
    setGameStart(false);
  }

  function hold(id) {
    setDice(prevDice => 
      prevDice.map(die => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  const [dice, setDice] = useState(() => allNewDice());
  const [gameStart, setGameStart] = useState(false);
  
  const diceElements = dice.map(data => (
    <Dice 
      key={data.id} 
      value={data.value} 
      isHeld={data.isHeld} 
      hold={() => hold(data.id)} 
    />
  ));

  const gameOver = dice.every(die => die.isHeld && die.value === dice[0].value);

  return (
    <main>
      {!gameStart && (
        <section>
          <div>
            <h1>Tenzies Game</h1>
            <p>
              Tenzies is a dice game where the goal is to roll all ten dice until they show the same number. <br />
              Hold the dice you want to keep and re-roll the rest. Match all dice to win!
            </p><br />
            <button onClick={() => setGameStart(true)}>Let's Go!</button>
          </div>
        </section>
      )}

      {gameStart && !gameOver && (
        <section>
          <h1>Tenzies Game</h1>
        <div className='row'>
          {diceElements}
        </div><br />
        <button className='dice-button' onClick={newNumbers}>Roll</button>
        </section>
      )}
      
      {gameStart && gameOver && (
        <div>
          <ConfettiExplosion />
          <Won resetDice={resetDice} />
        </div>
      )}
    </main>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { Button, Select } from 'antd';
import Game from './Game';


const { Option } = Select;

function Intro({stateGame, onStart, onDetails}) {
  
  //stores the difficulty selected
  const [difficulty, setDifficulty] = useState('easy');

  return (
    <div>
        <>
          <h1>Welcome to Ekreb!</h1>
          <p>A word scrambling game that tests your ability to guess a word from its scrambled form under time pressure. Click Game Details to learn more.</p>
          <div className="difficulty">
            <label>Select Difficulty: </label>
            <Select defaultValue="easy" onChange={(value) => setDifficulty(value)}>
              <Option value="easy">Easy</Option>
              <Option value="medium">Medium</Option>
              <Option value="hard">Hard</Option>
            </Select>
          </div>
        </>
      
      <br /> <br />

        <Button type="primary" size="large" className="submit-button" onClick={onDetails}>Game Details</Button>

        {/* Start button to begin the game. Passes the selected difficulty to the onStart function */}
        <Button type="primary" size="large" onClick={() => onStart(difficulty)}>Start</Button>
      
    </div>
  );
}

export default Intro;

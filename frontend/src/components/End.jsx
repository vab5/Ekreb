import React, { useState } from 'react';
import { Button, Select } from 'antd';
import Game from './Game';
import Intro from './Intro';

function End({finalScore, finalWordsGiven,finalCorrectWords, onPlayAgain}){

    //calculate player accuracy
    const accuracy = finalCorrectWords/finalWordsGiven * 100; 

    return( <div>
        
        <div>
            <h1>Game Over!</h1>
            <h2>Your Score: {finalScore}</h2>
            <h2>Your Accuracy: {accuracy.toFixed(2)}%</h2>
            <p>Thanks for playing Ekreb!</p>
        </div>
        <Button className="home-button" type="primary" size="large" onClick={onPlayAgain}>Play Again</Button>
    </div>
    );
}

export default End;
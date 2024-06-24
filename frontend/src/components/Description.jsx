import React from 'react';
import { Button } from 'antd';


function Description({onBack}) {
    return (
        <div className="description-container">

            <h1 >Ekreb: The Word Scrambling Game</h1>

            <Button className="home-button" type="primary" size="large" onClick={onBack}>Home</Button>

            <p>Welcome to Ekreb! This exciting game challenges you to guess words from their scrambled forms. Do you have what it takes to unscramble the word and prove your linguistic prowess?</p>
            
            <h2>How to Play:</h2>
            <ol>
                <li><strong>Starting Off</strong>: On the intro page, you can select your difficulty level.</li>
                <li><strong>Unscrambling</strong>: Once the game starts, you'll be presented with a scrambled word. Unscramble it as quickly as you can! Anagrams count!</li>
                <li><strong>Input</strong>: Enter your guess into the provided input field. Click the submit button.</li>
                <li><strong>Notification</strong>: A notification letting you know if you got the word right will appear in the bottom right. It will also tell you the correct answer if you get it wrong.</li>
            </ol>

            <h2>Game Features:</h2>
            <ul>
                <li>
                    <strong>Difficulty Levels</strong>:
                    <ul>
                        <li><strong>Easy</strong>: Features 4-letter words.</li>
                        <li><strong>Medium</strong>: Features 5-letter words.</li>
                        <li><strong>Hard</strong>: Features 6-letter words.</li>
                    </ul>
                </li>
                <li><strong>Scoring System</strong>: You start with a possible score based on the timer. The quicker you solve the word, the higher your score. The longer you take, the more points are deducted. The minimum score for a correct answer is 5 points.</li>
                <li><strong>Time Pressure</strong>: You have a time limit of 15 seconds for each word. As time passes your possible score also decreases!</li>
                <li><strong>Hints</strong>: Need some help? Use the Hint button. </li>
                <li><strong>Round System</strong>: The game consists of 10 rounds. </li>
                <li><strong>Game Over & Results</strong>: At the end of the 10 rounds, you'll be presented with your total score and your accuracy rate.</li>
            </ul>

            <h2>Other Features:</h2>
            <p><strong>Home Button</strong>: No matter where you are in the game, the Home button will always take you back to the intro page. Whether you want to restart the game or change the difficulty, the intro page is your starting point.</p>
            <p><strong>Music Button</strong>: Use the music button in the top right to play/pause some music I found online!</p>
            <p>Enjoy the game and test your unscrambling skills with Ekreb!</p>
        </div>
    );
}

export default Description;

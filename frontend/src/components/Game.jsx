import { useState, useEffect } from 'react';
import { Input, Button, notification } from 'antd';
import axios from 'axios';
import End from './End';


function Game({finalDifficulty, onEnd, backToIntro}) {

    const [word, setWord] = useState(""); //scrambled word for player to guess
    const [score, setScore] = useState(0); //the player's current score
    const [wordsGiven, setWordsGiven] = useState(0); //total number of words given to the player
    const [guess, setGuess] = useState(""); //player's current guess
    const [roundNum, setRoundNum] = useState(1); //the current round number
    const totalRounds = 10; //how many rounds are in a game
    const timePerRound = 15; //how long is each round
    //For each second passed the possible score will be decreased. Minimum score with correct answer is 5. 
    const maxScorePerGuess = timePerRound + 5; 
    const [possibleScore, setPossibleScore] = useState(maxScorePerGuess); 
    const [correctWords, setCorrectWords] = useState(0); //number of words guessed correctly
    const [timeLeft, setTimeLeft] = useState(timePerRound); //time left in the current round

    //sets difficulty, starts the game, and resets the score to 0
    useEffect(() => {
      setMode(); 
      handleStart();
      setScore0(); 
    }, []);

    //checks if the game should end every time wordsGiven changes
    useEffect(() => {
      console.log(wordsGiven); 
      if(wordsGiven >= totalRounds){ 
        onEnd(score, wordsGiven, correctWords); 
      }
    }, [wordsGiven]);

    //implements a timer that limits how long a user has to guess
    useEffect(() => {
      if (timeLeft > 0) {
          const timerId = setInterval(() => {
              setTimeLeft(timeLeft - 1);
              //decrease score the longer it takes to get the right answer
              setPossibleScore(possibleScore - 1); 
          }, 1000);
          return () => clearInterval(timerId); // Clear timer to avoid a bug
      } else {
          handleSubmit(); // autosubmits guess if time is over
      }
    }, [timeLeft]);
  
    //sets the difficutly of game based on user selection
    function setMode(){
      let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `http://localhost:3001/modeNum?selection=${finalDifficulty}`,
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    }

    //increments score in the backend by points earned this round
    //made this an async function to prevent a bug in which score was not
    //updated properly
    async function updateScore(){
      let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `http://localhost:3001/updateScore?val=${possibleScore}`,
        headers: { }
      };
      
      try {
        let response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        setScore(response.data); 
      } catch (error) {
        console.log(error);
      }
    }

    //displays the current score from the backend
    function getScore(){
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3001/getScore',
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setScore(response.data); 
      })
      .catch((error) => {
        console.log(error);
      });
    }

    //sets the score to 0 in the backend at beginning of the game
    function setScore0(){
      let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: 'http://localhost:3001/setScore0',
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setScore(response.data); 
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
    //handle player's guess submission
    const handleSubmit = () => {
      
      //resets for next round
      setRoundNum(roundNum + 1); 
      
      
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `http://localhost:3001/guess?guess=${guess}`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            if(response.data === true) {

                updateScore().then(() => {
                  setCorrectWords(correctWords+1); 
                
                  //send message that the user was correct
                  notification.success({
                      message: "Correct!",
                      description: "You guessed the word correctly!",
                      placement: "bottomRight",
                      duration: 2
                  });

                  //reset for next round; duplicate code in following else statement to prevent an error
                  setGuess("");
                  setPossibleScore(maxScorePerGuess); 
                  setTimeLeft(timePerRound);
                  setWordsGiven(wordsGiven + 1); 
                  handleStart();
                });
                

            } else {
                let correctWord = ""; 
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:3001/getWord',
                    headers: { }
                  };
                  
                  //get correct word from backend
                  axios.request(config)
                  .then((response) => {
                    correctWord = response.data;
                    console.log(correctWord); 
                    //sends notification that the guess was wrong
                    notification.error({
                        message: "Incorrect!",
                        description: "You guessed the word incorrectly! The correct word was".concat(" ", correctWord),
                        placement: "bottomRight",
                        duration: 2
                    });

                    //reset for next round; duplicate code in previous if statement to prevent an error
                    setGuess("");
                    setPossibleScore(maxScorePerGuess); 
                    setTimeLeft(timePerRound);
                    setWordsGiven(wordsGiven + 1); 
                    handleStart();
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                
            }

          })
          .catch((error) => {
            console.log(error);
          });

          

    };

    //start a new round
    const handleStart = () =>{
        console.log("handle start");
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: 'http://localhost:3001/scrambled_word',
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setWord(response.data); 
             
          })
          .catch((error) => {
            console.log(error);
          });
    }; 

    //provide a hint to the player
    function getHint(){
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3001/hint',
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        //send message that the user was correct
        let ans = response.data; 
        notification.success({
          message: "Hint",
          description: ans,
          placement: "bottomMiddle",
          duration: 3
        });
      })
      .catch((error) => {
        console.log(error);
      });

    }

    //display the game screen
    return <div className="card">
            
            <div>
                <h1>Round {roundNum}</h1>
                <h2> Unscramble: {word} </h2>
                <Input size="large" placeholder="Enter your guess"
                    onChange={(input) => {setGuess(input.target.value); }}
                    value={guess} />
                <br /> <br />
                <Button className="submit-button" type="primary" size="large" onClick={handleSubmit}>Submit</Button>
                <Button type="primary" size="large" onClick={getHint}>Hint</Button>
                <div>
                  Time left: {timeLeft} seconds
                </div>
                <p> Score: {score} </p>
            </div>
          
          <Button className="home-button" type="primary" size="large" onClick={backToIntro}>Home</Button>
        </div>  
}

export default Game;
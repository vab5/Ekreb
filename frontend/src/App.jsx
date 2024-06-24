import { useState } from 'react'
import {Button} from 'antd'; 
import './App.css'
import Title from './components/Title'
import Game from './components/Game'
import Intro from './components/Intro'
import End from './components/End'
import Description from './components/Description'
import background_music from './background_music.mp3'

function App() {
  //controls the current screen that the user sees ( can be 'intro', 'game', or 'end')
  const [view, setView] = useState('intro'); 
  const [finalScore, setFinalScore] = useState(0); //stores final score after game
  const [finalWordsGiven, setFinalWordsGiven] = useState(0); //stores final words given after game
  const [finalCorrectWords, setFinalCorrectWords] = useState(0); //stores final correct words after game
  const [newDifficulty, setDifficulty] = useState("easy"); //stores selected difficulty level
  const[musicPlaying, setMusicPlaying] = useState(false); //controls whether or not music is playing
  
  //if the pause/play button is played switch the state of musicPlaying to turn
  //it off or on
  const musicButton = () => {
    const music = document.getElementById('backgroundMusic'); 
    if (musicPlaying){
      music.pause(); 
    } else{
      music.play()
    }
    setMusicPlaying(!musicPlaying); 
  }

  //ends the game, updates final scores, wordsGiven, correctWords
  const handleEndGame = (score, wordsGiven, correctWords) => {
    setFinalScore(score);
    setFinalWordsGiven(wordsGiven);
    setFinalCorrectWords(correctWords); 
    setView('end');
  };

  //starts the game with the chosen difficulty
  const handleStart = (difficulty) => {
    setDifficulty(difficulty); 
    setView("game");   
  }; 

  //navigates view to details of the game
  const handleDetails = () => { 
    setView("description");   
  }; 

  //displays the screen based on current view
  if (view === 'intro') {
    return <div>
      <Intro onStart={handleStart} onDetails={handleDetails}/>
      <audio id = "backgroundMusic" src = {background_music} loop autoPlay />
      <Button className = "musicButton" onClick={musicButton} type="primary" size="large" >
        {musicPlaying ? "Pause Music" : "Play Music"}
      </Button>
      </div>
  } else if (view === 'game') {

    return <div>
      <Game finalDifficulty={newDifficulty} onEnd={handleEndGame} backToIntro={()=>setView("intro")} />
      <audio id = "backgroundMusic" src = {background_music} loop autoPlay />
      <Button className = "musicButton" onClick={musicButton} type="primary" size="large">
        {musicPlaying ? "Pause Music" : "Play Music"}
      </Button>
    </div>

  } else if (view === 'end') {

    return <div>
          <End finalScore={finalScore} finalWordsGiven={finalWordsGiven} finalCorrectWords={finalCorrectWords} onPlayAgain={() => setView('intro')} />
          <audio id = "backgroundMusic" src = {background_music} loop autoPlay />
          <Button className = "musicButton" onClick={musicButton} type="primary" size="large">
            {musicPlaying ? "Pause Music" : "Play Music"}
          </Button>
        </div>

  } else if(view === "description"){
    return <div>
      <Description onBack ={()=>setView("intro")}/>
      <audio id = "backgroundMusic" src = {background_music} loop autoPlay />
      <Button className = "musicButton" onClick={musicButton} type="primary" size="large">
        {musicPlaying ? "Pause Music" : "Play Music"}
      </Button>
  </div> 
  }

  return null;
}



export default App



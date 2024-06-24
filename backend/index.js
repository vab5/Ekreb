const express = require('express'); 
const cors = require('cors'); 
const request = require('request');
//const mongo = require('mongodb');
const app = express(); 
const PORT = 3001; 
app.use(cors());

let score = 0; //current score of player
let words_given = 0; //number of words given to player
let current_word = " "; //current word unscrambled
let scrambled_word = " "; //current word scrambled
let user_guess = " "; //user's guess

//mode_num refers to the length of the word on the easy (4), medium(5), and hard(6) settings
let mode_num = 4; 


//changes gamemode based on player's selection
app.patch('/modeNum', (req,res)=>{
    let mode = req.query.selection; 
    switch (mode) {
        case "medium":
            mode_num = 5;
            break;
        case "hard":
            mode_num = 6;
            break;
        default:
            mode_num = 4;
    }
    res.send(mode_num.toString());
});

//sends the current score the client
app.get('/getScore',(req,res) =>{
    res.send(`${score}`); 
});

//sets the score to 0 and sends it to client
app.patch('/setScore0', (req,res)=>{
    score = 0; 
    res.send(`${score}`); 
});

//updates score based on user input
app.patch('/updateScore', (req,res)=>{
    score = score + parseInt(req.query.val);
    res.send(`${score}`);
});

//sends the total words given to player 
app.get('/words_given',(req,res) =>{
    // retrive from state ( file , database)
    res.send(`${words_given}`); 
});

//sends the current unscrambled word
app.get('/getWord',(req,res) =>{
    res.send(`${current_word}`); 
});

//request new word from Random Word API (https://random-word-api.herokuapp.com/home) and set it to current word
app.patch('/word',(req,res) =>{
    //requests word of certain length dependent on diffuclty setting
    request('https://random-word-api.herokuapp.com/word?length=' + mode_num, function (error, response, body) {
        current_word = body.substring(2,body.length - 2); 
        res.send(`${current_word}`); 
        words_given++; 
    });    
}); 

//scrambles the current word and sends it to client
app.patch('/scrambled_word',(req,res)=>{
    //requests word of certain length dependent on diffuclty setting
    request('https://random-word-api.herokuapp.com/word?length=' + mode_num, function (error, response, body) {
        current_word = body.substring(2,body.length - 2); 
        scrambled_word = scramble(current_word); 
        res.send(`${scrambled_word}`); 
        words_given++; 
    });
}); 


//helper function to scramble a given word
function scramble(unscrambledWord){
    let ans = ""; 
    let word_array = current_word.split(""); 

    while(ans.length != current_word.length){
        let selector = Math.floor(Math.random()*mode_num); //returns 0, 1, 2, or 3
        if(word_array[selector] != null){
            ans = ans + word_array[selector]; 
            word_array[selector] = null; 
        }
    }
    scrambled_word = ans; 

    if(scrambled_word == unscrambledWord){
        return scramble(unscrambledWord); 
    }
    return ans; 
}


//checks if user guess is correct
app.patch('/guess',(req,res)=>{
    user_guess = req.query.guess.toLowerCase(); 
    doRequest().then(correct => { 
        if (correct){
            res.send(true);
        } else {
            res.send(false);
        }
    }); 
});
        
//gets a list of anagrams that are possible answers 
function doRequest() {
    return new Promise (function(resolve, reject) {
        request('http://www.anagramica.com/best/:' + current_word, function (error, response, body) {
            if((body.includes(user_guess) && user_guess.length == current_word.length) || user_guess == current_word){
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

//sends string to client which is a hint; can modify to give different hints 
app.get('/hint', (req,res)=>{
    res.send("The first letter is: " + current_word[0]); 
}); 

//sets up server
app.listen(PORT, () =>{
    console.log(`Backend is running on http://localhost:${PORT}`); 
}); 


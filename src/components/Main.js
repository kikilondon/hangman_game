// import components
import Header from "./Header";
import DisplayRules from "./DisplayRules"


//import functions to fetch random word to guess
import { randomWord, dictionary } from "./FetchWords"; 
//import images of differents game's states
import state1 from "../images/state1.gif";
import state2 from "../images/state2.gif";
import state3 from "../images/state3.gif";
import state4 from "../images/state4.gif";
import state5 from "../images/state5.gif";
import state6 from "../images/state6.gif";
import state7 from "../images/state7.gif";
import state8 from "../images/state8.gif";
import state9 from "../images/state9.gif";
import state10 from "../images/state10.gif";
import state11 from "../images/state11.gif";
// import css style 
import '../App.css';
//import hooks use State and useEffect
import { useState, useEffect} from 'react';

function Main (props) {

    // state to track whether the game is loading from fetched API address
    const [isLoading, setIsLoading] = useState(false);
    //state to sync the data from api address with the game
    const [data, setData] = useState([]);
    // state to track the answer from fetched API address word
    const [answer, setAnswer] = useState('');
    // state to track the number of wrong guesses
    //this state is set on 0, it is the initial state
    const [numWrong, setnumWrong] = useState(0);
    // state to track the guessed letters
    const [guessed, setGuessed] = useState(new Set());
    // state to track the number of correct guesses
    const [correctGuesses, setCorrectGuesses] = useState(0);
    // state to track when the game is over
    const [gameOver, setGameOver] = useState(false);
       
      
   
   // this hook makes the function reload only on the first render 
   //it changes the states, and fetchs the word to guess from the APi address

       useEffect(() => {
           async function fetchWord() {
            //set the state on true to make the fetch request
               setIsLoading(true);
               const word = await randomWord();
               const allWords = await dictionary();
               //set the answer on the first word fetched
               setAnswer(word[0]);
               //set data on the number which represent the array length
               //of dictionary fetched
               setData(allWords.length);
               //set the loading on false when the fetch is complete
               setIsLoading(false);
           }
           fetchWord();//call function
       }, []);



       // function to generate the keyboar of letters
       function Keyboard(){
         //split the string into an array of substrings and map the array 
        return 'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
            //create a button for each letter mapped with a Key that uniquely identifies it.
                <button className="keyboard-btn"
                    key={letter}
                    value={letter}
                    onClick={handleGuess}
                    disabled={guessed.has(letter)}>
                    {letter}
                </button>
            ));
    };
       
       
       
       // function to handle a letter guess, this function takes the event 
        //as argument
      function handleGuess(e) {
        //declare a variable in which to store the element on which the function is trigged 
           let letter = e.target.value;
           //change the state of guessed word adding the letter chosen by the user
           setGuessed((st) => st.add(letter));
           //if the word to guess includes the letter pressed on the keyboard
           if (answer.includes(letter)) {
            //increment of 1  the correctguesses (with prev state on O), 
             setCorrectGuesses((st) => st + 1);
             //if not, increment the wrong answer of 1 
           } else {
             setnumWrong((st) => st + 1);
             //call the function to check if the game is over
             checkGameOver();
           }
         };

   
    // function to generate the word with underscores and correctly guessed letters
       function guessedWord(){
        //declare empty variable to store the letter or the underscore
           let word = '';
           //iterate trough the word 
           for(let i = 0; i < answer.length; i++) {
            //if the guessed state has the same letters of the hidden word(answer)
            // OR if the gameover state is set on false( basically if the game is still going on)
               if(guessed.has(answer[i]) || gameOver) {
                //add to the letter to the word  
                   word += answer[i];
               } else {
                //if not, leave the underscore
                   word += ' _ ';
               }
           }
           return word;
       };

            //function to check if the player has run out of chances
            function checkGameOver(){
                //if the gameover state is not false
                   if (!gameOver) {
                //if the correct Guesses inserted have the same length of the answer 
                       if (correctGuesses === answer.length) {
                        //set the gameOver on true, so the game is over 
                           setGameOver(true);
                           //if the number of tries is equal to the max number of allowed attempts
                           //OR the number of tries is greater or equal to 9
                       } if (numWrong === maxWrong || numWrong >= 9) {
                        //end the game
                           setGameOver(true);
                       }
                   }
               }
   
 
       //Reset function is used to reset the game state by fetching a new word, 
       //resetting the number of wrong guesses, guessed letters and setting gameOver to false
       const reset = async () => {
        // set the state to make a new fetch request
           setIsLoading(true); 
           //set the number to wrong attempts on 0 
           setnumWrong(0);
           //set the guessed letters
           setGuessed(new Set());
           //restart the game
           setGameOver(false);
           //fetch a new word
           const word = await randomWord();
           //set the fetch answer on a the first word
           setAnswer(word[0]);
           //set the loading on false when the fetch is complete
           setIsLoading(false); 
       };
        //maxWrong is the maximum number of wrong guesses allowed before the player loses the game, the default is 10
       const maxWrong = props.maxWrong || 10; 
       const images = props.images || [state1, state2, state3, state4, state5, state6, state7, state8, state9, state10, state11 ];
       //isWinner is a boolean that checks if the player has correctly guessed all the letters of the word
        const isWinner = answer.split('').every(letter => guessed.has(letter)); 
        
        //the function returns the html page. It contains all the components, a div that displays the different drawing states
        //there is a formula that calculate the number of words in the dictionary fetched
        // a paragraph that displays how many attempts the player has left
        // the space to fill with the guessed letters
        //the alert that informs if the player won or lose
        // a reset button that reset the game 
       return (
        <div className='main-container'>
            <Header />
            <DisplayRules/>
           {isLoading ? (<p>Loading...</p>) : (
            <>
            <div className='images-container' >
                <img src={images[numWrong]} alt='Hangman' className="img-hangman"/>
            </div>
            <div className="instructions">
                <p>Enter a letter</p>
                <p>You have: {maxWrong - numWrong} / {maxWrong} attempts left</p>
                <p className='hangman-word'>
                {answer ? guessedWord() : 'Loading...'}
                </p>
                <p className='wonlose'>
                {isWinner ? 'You Won!' : gameOver ? 'You Lose!' : Keyboard()}
                </p>
            </div>
            <div className="resetBtn">
                <button className='reset-btn' onClick={reset}>
                Reset
                </button>
            </div>
            </> 
            )}
            <br/>
                <div className="sync-dictionary">
                <div>Total words in the game: {data}</div>
            </div>
            
    </div>
       );
               }
   
   export default Main;
   //export Main component
  
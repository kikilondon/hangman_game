import '../App.css'
//this function display a list of game rules
function GameRules(){

    return(
   <div className='rules-container'>
    <h4>How to play:</h4>
        <div className="rules-list">
            <ul className='list'>
                <li>The aim of this game is to guess the hidden word before the hangman's drawing is completed</li>
                <li>You have a limit of 10 attempts to guess the word </li>
                <li>To enter a letter, click on the keyboard below</li>
                <li>Blank spaces represent number of letters in the hidden word</li>
                <li>Hidden words do not include punctuation and numbers</li>
                <li>If your guess is correct, the letter will be added to the hidden word </li>
                <li>If your attempt is incorrect, a part of the hangman will be drawn and you will lose a chance</li>
                <li>You lose when you reach 10 attempts and do not guess the word </li>
                <li>Click 'Reset' to restart the game</li>
            </ul>
        </div>


   </div>

    )
}

export default GameRules;
//export the component 
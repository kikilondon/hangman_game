import React from 'react';
import '../App.css';
//header component
function Header(){
 return (
    <div>
      <header className= "header-container">
        <h1 className='title'>Hangman game</h1>
        <div className='par-container'>
        <p className='welcome-par'><b>Welcome to the hangman game</b><br/>If it is your first time playing or you are unsure of the rules, press the help button below.<br/>
          You will find a list of rules to follow. <br/>Enjoy! </p></div>
      </header>
      
    </div>
  )
}

export default Header;
//export Header component
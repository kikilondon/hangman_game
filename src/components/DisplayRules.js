
//import hook 
import {useState} from "react";
//import the rules 
import GameRules from './GameRules'
import '../App.css';

//function to display the rules
function DisplayRules(){
    //state to change the visibility of the rules, the initial state is set on false 
    //if the player needs to consult the rules, he'll click the button
    const[showRules, setShowRules] = useState(false);
    const displayRules =()=>{
        //set the state of the rules on the opposite state, in this case true
        setShowRules(!showRules)
    }

    //return a button that triggers the function "displayRules". If the state is set on true = the rules are shown
    //display on the button "Hide rules", if different display "help".
return(
       <div>
        <button className="btn-rules" onClick={displayRules}>{showRules ? "Hide Rules" : "Help"}</button>
       {/* display the state of showRules and the list of rules */}
         {showRules && <GameRules />}

       </div>
)

}

//export the component
export default DisplayRules;
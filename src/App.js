//import css style
import './App.css';
//import components
import Main from "./components/Main"

// display one component that contains all the others
function App() {
  return (
    <div className='App'>
     <Main/>
    </div>
  );
}

export default App;
//export app component

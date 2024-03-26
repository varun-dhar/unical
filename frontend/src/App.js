import './App.css';
import SelectionPanel from './Components/SelectionPanel';
import Sidebar from './Components/Sidebar';
import Calendar from './Components/Calendar';

function App() {
  return (
    <div className="App">
      <Sidebar/> 
      <SelectionPanel/>
      <Calendar/>
    </div>
  );
}

export default App;

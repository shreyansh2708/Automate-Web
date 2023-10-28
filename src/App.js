import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Frontpage from './Components/Frontpage';
import ImageToText from './Components/ImageToText';
import Header from './Components/Header'
import SpeechToText from './Components/SpeechToText';
import Translation from './Components/Translation';
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<div><Header /><Frontpage /></div>} />
        <Route path='/image-to-text' element={<div><Header /><ImageToText /></div>} />
        <Route path='/speech-to-text' element={<div><Header /><SpeechToText /></div>} />
        <Route path='/translation' element={<div><Header /><Translation /></div>} />
      </Routes>
    </div>
    </Router>
    
  );
}

export default App;

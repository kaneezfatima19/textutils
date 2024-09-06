import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import React, { useState } from 'react';
import Alert from './components/Alert';
import {
BrowserRouter,
Route,
Routes
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [prettyMode, setPreMode] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }
  const toggleMode = () => {

    if (mode === 'light') {
      setMode('dark');
      setPreMode(null);
      document.body.style.backgroundColor = '#1d1515';
      handleAlert("dark mode has been enabled", 'success');
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      handleAlert("dark mode has been disabled", 'success');
    }
  }
  const togglePreMode = () => {
    if (prettyMode === null) {
      setPreMode('pretty');
      setMode('light');
      document.body.style.backgroundColor = '#d28990';
      handleAlert("Pretty mode has been enabled", 'success');
    }
    else {
      setPreMode(null);
      setMode('light')
      document.body.style.backgroundColor = 'white';
      handleAlert("Pretty mode has been disabled", 'success');
    }
  }
  return (
    <>
      <BrowserRouter>
        <Navbar title="Text-ToolKit" aboutText="About" mode={mode} prettyMode={prettyMode} togglePreMode={togglePreMode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container my-3">

          < Routes>
            <Route exact path='/about' element={<About />}>
            </Route>
            <Route exact path="/" element={
              <TextForm handleAlert={handleAlert} heading="Enter your text" mode={mode} prettyMode={prettyMode} />}>
        
        </Route>
        </Routes>

      </div>
      </BrowserRouter>
    </>
  );
}

export default App;

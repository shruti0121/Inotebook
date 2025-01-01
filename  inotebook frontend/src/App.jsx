import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/SingUp';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      message : message,
      type : type
    });

    setTimeout(()=>{
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <BrowserRouter>
        <NoteState>
          <Navbar/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />}/>
              <Route path='/about' element={<About />}/>
              <Route path='/login' element={<Login showAlert={showAlert} />}/>
              <Route path='/signup' element={<Signup showAlert={showAlert} />}/>
            </Routes>
          </div>
        </NoteState>
      </BrowserRouter>
    </>
  )
}

export default App
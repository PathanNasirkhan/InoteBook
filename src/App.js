import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/NoteState';
import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className='container'>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/singup" element={<Signup />} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

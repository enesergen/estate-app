import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EstateForm from './AddNewEstate';
import Home from './Home';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/add-new-estate" element={<EstateForm/>}   />
      </Routes>
    </Router>
  );
};

export default App;
import React, { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import GerenteDashboard from './pages/GerenteDashboard';

function App() {
  return(
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' exact element={<GerenteDashboard/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;

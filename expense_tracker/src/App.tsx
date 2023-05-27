
import React from 'react';
import './App.css';
import ShowList from "./components/ShowList";
import ExpenseTracker from './components/ExpenseTracker';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/add' element={<ExpenseTracker onTrue={undefined} onClose={undefined}/>}/>
          <Route path="/" element={<ShowList/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
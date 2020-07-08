import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';


// import debounce from 'lodash';



const Application = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  )
}


export default Application;
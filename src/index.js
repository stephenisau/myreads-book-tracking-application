import React from 'react'
import ReactDOM from 'react-dom'
import Application from './App'
import './index.css'
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import * as context from './Context';


console.log(context);
console.log(context.BookProvider)
ReactDOM.render(
    <HashRouter>
        <Application />
    </HashRouter>,
    document.getElementById('root')
)
import React from 'react'
import ReactDOM from 'react-dom'
import Application from './App'
import './index.css'
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import * as BookContext from './Context';

console.log(BookContext);
console.log(BookContext)
ReactDOM.render(
    <HashRouter>
        <BookContext.BookProvider>
            <Application />
        </BookContext.BookProvider>
    </HashRouter>,
    document.getElementById('root')
)
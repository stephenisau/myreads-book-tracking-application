import React from 'react';
import MainPage from '../components/MainPage';
import Search from '../components/Search';
import { Route, Switch, Redirect } from 'react-router-dom';

const Routes = ({ books, moveShelf }) => {
  return (
    <Switch>
      <Route
        exact path="/"
        render={(route) => <MainPage {...route} books={books} moveShelf={moveShelf}/>} />
      <Route 
        exact path="/search"
        render={(route) => <Search {...route} />} />
    </Switch>
  )
}


export default Routes;
import React from 'react';
import MainPage from '../components/MainPage';
import Search from '../components/Search';
import { Route, Switch, Redirect } from 'react-router-dom';

const Routes = ({ books }) => {
  return (
    <Switch>
      <Route
        exact path="/"
        render={(route) => <MainPage {...route} books={books} />} />
      <Route 
        exact path="/search"
        render={(route) => <Search />} />
    </Switch>
  )
}


export default Routes;
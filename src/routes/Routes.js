import React, {useContext, useEffect} from 'react';
import MainPage from '../components/MainPage';
import Search from '../components/Search';
import { Route, Switch } from 'react-router-dom';
import { BookContext } from '../Context';

const Routes = () => {

  const { state, dispatch, fetchBooks } = useContext(BookContext);
  const { books } = state;
  
  useEffect(() => {
    dispatch(fetchBooks);
  }, [dispatch]);

  return (
    <Switch>
      <Route
        exact path="/"
        render={(route) => <MainPage {...route} books={books} />} />
      <Route 
        exact path="/search"
        render={(route) => <Search {...route} books={books}/>} />
    </Switch>
  )
}


export default Routes;
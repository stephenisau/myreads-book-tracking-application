import React, { useEffect, useReducer, createContext } from 'react';
import { LOADING, LOADED, ERROR, MOVE_SHELF } from './actions/types';
import * as BooksAPI from './BooksAPI';
import useThunkReducer from './utils/hooks/useThunkReducer';
import { bookReducer as reducer } from './reducer/root';


/**
 * Initial state of our application
 */
const initialState = {
  books: [],
  loading: false,
  error: null,
}
// Context variables
export const BookContext = createContext(initialState);
const { Provider } = BookContext;


/**
 * 
 * @param {*} book 
 * @param {*} shelf 
 * Update book shelf on our backend and change the shelf 
 * associated with our book on the client-side
 */

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);


  /**
   * Dispatch action to our bookReducer to update our "state"
   * @param {function} dispatch 
   */
  const fetchBooks = async dispatch => {
    dispatch({ type: LOADING });
    try {
      const response = await BooksAPI.getAll();
      dispatch({
        type: LOADED,
        payload: { books: [...response] }
      });
    }
    catch (error) {
      dispatch({
        type: ERROR,
        payload: { error }
      });
    };
  }


  /**
   * Dispatch action to our store to update book shelf in backend as well as modify state on the
   * client-side
   * @param {object} book 
   * @param {string} shelf 
   */
  const moveShelf = (book, shelf) => async dispatch => {
    try {
      await BooksAPI.update(book, shelf);
      book.shelf = shelf;  
      await dispatch({
        type: MOVE_SHELF,
        payload: { book }
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { error }
      }, [dispatch]);
    };
  };


  useEffect(() => {
    dispatch(fetchBooks);
  }, [dispatch])

  const values = { state, dispatch, moveShelf, fetchBooks };
  return (
    <Provider value={values}>
      {children}
    </Provider>
  )
}

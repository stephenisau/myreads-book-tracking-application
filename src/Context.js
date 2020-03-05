import React, { useEffect, useReducer, createContext } from 'react';
import { LOADING, LOADED, ERROR, MOVE_SHELF } from './actions/types';
import * as BooksAPI from './BooksAPI';
import useThunkReducer from './utils/hooks/useThunkReducer';


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
 * Root reducer
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        books: [],
        loading: true,
        error: null
      }
    case LOADED:
      return {
        books: action.payload.books,
        loading: false,
        error: null
      }
    case ERROR:
      return {
        books: [],
        loading: false,
        error: action.payload.error
      }
    case MOVE_SHELF:
      const { book } = action.payload;
      return state.books.filter(oldBook => oldBook.id === book.id ? book : oldBook);

    default:
      return state;
  }
}

/**
 * 
 * @param {*} book 
 * @param {*} shelf 
 * Update book shelf on our backend and change the shelf 
 * associated with our book on the client-side
 */

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);

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

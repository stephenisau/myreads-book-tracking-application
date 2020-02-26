import React, { useCallback, useReducer, createContext } from 'react';
import { reducer } from './reducer/root';
import { LOADING, LOADED, ERROR, MOVE_SHELF } from './actions/types';
import * as BooksAPI from './BooksAPI';


export const BookContext = createContext();

export const initialState = {
  books: [],
  loading: false,
  error: null,
}

export const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const thunkDispatch = React.useCallback(action => {
    if (typeof action === "function") {
      action(dispatch);
    } else {
      dispatch(action);
    };
  }, [dispatch]);
  return [state, thunkDispatch];
}


/**
 * 
 * @param {*} book 
 * @param {*} shelf 
 * Update book shelf on our backend and change the shelf 
 * associated with our book on the client-side
 */
// export const moveShelf = (book, shelf) => async dispatch => {
//   try {
//     await BooksAPI.update(book, shelf);
//     book.shelf = shelf; // lol 
//     await dispatch({
//       type: MOVE_SHELF,
//       payload: { book }
//     });
//   } catch (error) {
//     dispatch({
//       type: ERROR,
//       payload: { error }
//     });
//   };
// };

export const contextProvider = ({ children }) => {
  const [books, dispatch] = useReducer(reducer, initialState);


  const moveShelf = (book, shelf) => async dispatch => {
    try {
      await BooksAPI.update(book, shelf);
      book.shelf = shelf; // lol 
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


  const value = { books, moveShelf };

    debugger;
  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  )
}
//   const moveShelf = (book, shelf) => {
//     BooksAPI.update(book, shelf).then(resp => {
//       book.shelf = shelf;
//       setBooks(prevState => ([...prevState.map(b => b.id === book.id ? book : b)]));
//     });
//   }

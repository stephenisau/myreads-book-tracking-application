import React, { useCallback, useReducer, createContext } from 'react';
import { LOADING, LOADED, ERROR, MOVE_SHELF } from './actions/types';
import * as BooksAPI from './BooksAPI';


export const BookContext = createContext(BookProvider);
export const Provider = BookContext.Provider;
export const Consumer = BookContext.Consumer;

export const initialState = {
  books: [],
  loading: false,
  error: null,
}

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
      return state.filter(b => b.id !== book.id ? b : book)
    default:
      return state;
  }
}

const useThunkReducer = (reducer, initialState) => {
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

export const BookProvider = ({ children }) => {
  debugger;
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { books } = state;

  const fetchBooks = async dispatch => {
    await dispatch({ type: LOADING });
    try {
      const response = await BooksAPI.getAll();
      await dispatch({
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


  const value = { books, moveShelf, fetchBooks };

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

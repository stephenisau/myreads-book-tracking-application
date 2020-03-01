import React, { useCallback, useReducer, createContext } from 'react';
import { LOADING, LOADED, ERROR, MOVE_SHELF } from './actions/types';
import * as BooksAPI from './BooksAPI';



/**
 * Initial state of our application
 */
const initialState = {
  books: [],
  loading: false,
  error: null,
}
// Context variables
export const BookStore = createContext(initialState);
const { Provider } = BookStore;

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
 * Custom hook to utilize thunk reducer
 * @param {*} reducer 
 * @param {*} initialState 
 */
// const useThunkReducer = (reducer, initialState) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const thunkDispatch = React.useCallback(action => {
//     if (typeof action === "function") {
//       action(dispatch);
//     } else {
//       dispatch(action);
//     };
//   }, [dispatch]);
//   return [state, thunkDispatch];
// }


/**
 * 
 * @param {*} book 
 * @param {*} shelf 
 * Update book shelf on our backend and change the shelf 
 * associated with our book on the client-side
 */

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const { books } = state;
  // // const [books, setBooks] = useState([]);

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


  const values = { state, dispatch, moveShelf, fetchBooks };
  return (
    <Provider value={values}>
      {children}
    </Provider>
  )
}

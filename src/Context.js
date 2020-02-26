import React, { useCallback, useReducer, createContext } from 'react';
import reducer from './reducer/root';
import id from 'uuid/v4';

export const BookContext = createContext();

export const contextProvider = ({ children }) => {
  const [books, dispatch] = useReducer(reducer, initialState);

  const moveShelf = useCallback(
    ({book, shelf}) => {
      dispatch({
        type: MOVE_SHELF,
        payload: {
          book,
          shelf
        },
        meta: {},
        errors: [],
      });
    }, [dispatch]);


  const value = { books, moveShelf };

  
  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  )
//   const moveShelf = (book, shelf) => {
//     BooksAPI.update(book, shelf).then(resp => {
//       book.shelf = shelf;
//       setBooks(prevState => ([...prevState.map(b => b.id === book.id ? book : b)]));
//     });
//   }
}
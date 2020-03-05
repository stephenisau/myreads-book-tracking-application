import { LOADING, LOADED, ERROR, MOVE_SHELF } from '../actions/types';

export const bookReducer = (state = {}, action) => {
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
      debugger;
      const { book } = action.payload;

      return state.map(({books, loading, error}) => {
        books.filter(b => b.id !== book.id ? b : book),
        loading,
        error
      });
    default:
      return state;
  }
}

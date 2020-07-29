# MyReads

This frontend application is built using React. It's main purpose is to keep track of the books you're currently reading. 

MyReads is live [here](https://stephenisau.github.io/myreads-bookapp/#/)



### Setup
Download / Clone this repository into your computer and run the following commands while in the directory that you downloaded it into.
```
npm install
npm start
```
The frontend should now be starting on `http://localhost:3000/`


## Features

- React Hooks
- React Class-based Components
- Custom Hooks
- React Context

This app features the popular Redux thunk design pattern, built using React Context and a custom hook.
```
This is the context through which the state of our application is "stored". We define methods here to modify and return parts of the state to our application

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
      dispatch({
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


```



This is the custom thunk hook used to determine what to do with our state
```
/**
 * Custom hook to utilize thunk reducer
 * @param {*} reducer 
 * @param {*} initialState 
 */
const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const thunkDispatch = useCallback(action => {
    if (typeof action === "function") {
      action(dispatch);
    } else {
      dispatch(action); 
    };
  }, [dispatch]);
  return [state, thunkDispatch];
}

export default useThunkReducer;

```

Here is the reducer for our book app that molds and returns parts of the state, depending on the action
```
const reducer = (state = {}, action) => {
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
      return {
        ...state,
        books: state.books.map(b => b.id === book.id ? book : b)
      }

    default:
      return state;
  }
}

export default reducer;
```


And here is an example of it being used ona single book, to change the value of the book status.
```

const Book = ({ book }) => {

  const { dispatch, moveShelf } = useContext(BookContext);

  const styles = {
    bookCover: {
      width: 128,
      height: 193,
      backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ""}")`
    }
  }

  const changeShelf = async (evt) => {
    dispatch(moveShelf(book, evt.target.value));
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={styles.bookCover}></div>
        <div className="book-shelf-changer">
          <select
            value={book.shelf || "none"}
            onChange={changeShelf}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors || "No authors found..."}</div>
    </div>
  )
}

export default Book;

```


Check back for better implementations of the application!
import React, { useEffect, useReducer } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { LOADING, LOADED, ERROR, MOVE_SHELF } from './actions/types';

/**
 * External Library Imports
 */
import debounce from 'lodash';


/**
 * 
 * Component Imports
 */
import Routes from './routes/Routes';
import { reducer } from './reducer/root';
import { contextProvider } from './Context';
import MainPage from './components/MainPage';
/*
 Main application
*/


const initialState = {
  books: [],
  loading: false,
  error: null,
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
    });
  };
};


const Application = () => {

  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { books } = state;

  useEffect(() => {
    dispatch(fetchBooks);
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes books={books} />
      </BrowserRouter>
    </div>
  )
}


// function App() {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   async function fetchBooks() {
//     const res = await BooksAPI.getAll();
//     setBooks([...books, ...res])
//   }

//   const moveShelf = (book, shelf) => {
//     BooksAPI.update(book, shelf).then(resp => {
//       book.shelf = shelf;
//       setBooks(prevState => ([...prevState.map(b => b.id === book.id ? book : b)]));
//     });
//   }
//   return (
//     <div className='app'>
//       <Route exact path='/' render={() => (
//         <MainPage books={books} moveShelf={moveShelf} />)} />
//       <Route exact path="/search" render={() => (
//         <Search books={books} moveShelf={moveShelf} />
//       )} />
//     </div>
//   )
// }


// const MainPage = ({ books, moveShelf }) => {

//   if (!books) return <React.Fragment>Loading...</React.Fragment>

//   const currentReads = books.filter(book => book.shelf === 'currentlyReading')
//   const wantToRead = books.filter(book => book.shelf === 'wantToRead')
//   const finishedReading = books.filter(book => book.shelf === 'read')


//   return (
//     <div className="list-books">
//       <div className="list-books-title">
//         <h1>MyReads</h1>
//       </div>
//       <div className="list-books-content">
//         <div>
//           <Shelf moveShelf={moveShelf} name="Currently Reading" books={currentReads} />
//           <Shelf moveShelf={moveShelf} name="Want to Read" books={wantToRead} />
//           <Shelf moveShelf={moveShelf} name="Finished Reading" books={finishedReading} />
//         </div>
//       </div>
//       <div className="open-search">
//         <Link to="/search"><button>Add a book</button></Link>
//       </div>
//     </div>
//   )
// }



// function Search({ books, moveShelf }) {

//   const [query, setQuery] = useState("");
//   const [searchResults, setResults] = useState([]);


//   const handleSubmit = (evt) => {
//     evt.persist();
//     submitSearch(query);
//   }

//   function submitSearch(query) {
//     if (query) {
//       BooksAPI.search(query).then((resp) => {
//         try {
//           resp.forEach(book => {
//             let result = books.filter(bookFromProp => bookFromProp.id === book.id)
//             if (result.length > 0) {
//               result.map(bookRes => book.shelf = bookRes.shelf || '')
//             }
//           })
//           setResults({
//             searchResults: resp
//           });
//         } catch (err) {
//           console.log(resp.err);
//           setResults({
//             searchResults: []
//           })
//         }
//       })
//     }
//   }


//   return (
//     <div className="search-books">
//       <div className="search-books-bar">
//         <Link
//           className="close-search"
//           to="/"
//         >Close
//           </Link>
//         <div className="search-books-input-wrapper">
//           <form onChange={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Search by title or author"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               name="query"
//               autoComplete="Off"
//             />
//           </form>
//         </div>
//       </div>
//       <div className="search-books-results">
//         <ol className="books-grid">
//           {
//             searchResults.map(book => <Book book={book} moveShelf={moveShelf} />)
//           }
//         </ol>
//       </div>
//     </div>
//   )
// }

export default Application;

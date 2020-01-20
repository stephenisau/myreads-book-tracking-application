import React, { useState, useEffect } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'

import debounce from 'lodash';

// import Search from './Search';
// import Book from './Book';

/*
 Main application
*/

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    const res = await BooksAPI.getAll();
    setBooks([...books, ...res])
  }

  const moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resp => {
      book.shelf = shelf;
      setBooks(prevState => ([...prevState.map(b => b.id === book.id ? book : b)]));
    });
  }
  return (
    <div className='app'>
      <Route exact path='/' render={() => (
        <MainPage books={books} moveShelf={moveShelf} />)} />
      <Route exact path="/search" render={() => (
        <Search books={books} moveShelf={moveShelf} />
      )} />
    </div>
  )
}


function MainPage({ books, moveShelf }) {

  if (!books) return <React.Fragment>Loading...</React.Fragment>

  const currentReads = books.filter(book => book.shelf === 'currentlyReading')
  const wantToRead = books.filter(book => book.shelf === 'wantToRead')
  const finishedReading = books.filter(book => book.shelf === 'read')


  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf moveShelf={moveShelf} name="Currently Reading" books={currentReads} />
          <Shelf moveShelf={moveShelf} name="Want to Read" books={wantToRead} />
          <Shelf moveShelf={moveShelf} name="Finished Reading" books={finishedReading} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search"><button>Add a book</button></Link>
      </div>
    </div>
  )
}

function Shelf({ name, books, moveShelf }) {

  const currBooks = books.length > 0 ? books.map((book, id) => <Book book={book} key={id} id={id} moveShelf={moveShelf} />) : <React.Fragment>No books...</React.Fragment>

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {currBooks}
        </ol>
      </div>
    </div>
  )
}

function Book({ book, moveShelf }) {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ""}")` }}></div>
        <div className="book-shelf-changer">
          <select
            value={book.shelf || "none"}
            onChange={(e) => {
              moveShelf(book, e.target.value)
            }}>
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


function Search({ books, moveShelf }) {

  const [query, setQuery] = useState("");
  const [searchResults, setResults] = useState([]);


  const handleSubmit = (evt) => {
    evt.persist();
    submitSearch(query);
  }

  function submitSearch(query) {
    if (query) {
      BooksAPI.search(query).then((resp) => {
        try {
          resp.forEach(book => {
            let result = books.filter(bookFromProp => bookFromProp.id === book.id)
            if (result.length > 0) {
              result.map(bookRes => book.shelf = bookRes.shelf || '')
            }
          })
          setResults({
            searchResults: resp
          });
        } catch (err) {
          console.log(resp.err);
          setResults({
            searchResults: []
          })
        }
      })
    }
  }

  console.log(searchResults);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          className="close-search"
          to="/"
        >Close
          </Link>
        <div className="search-books-input-wrapper">
          <form onChange={handleSubmit}>
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              name="query"
              autoComplete="Off"
            />
          </form>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {
            searchResults.map(book => <Book book={book} moveShelf={moveShelf} />)
          }
        </ol>
      </div>
    </div>
  )
}

export default App;

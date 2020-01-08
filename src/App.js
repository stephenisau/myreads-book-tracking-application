import React, { useState, useEffect } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'

import Search from './Search';
import Book from './Book';

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

export default App;

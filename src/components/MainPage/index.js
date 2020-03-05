import React from 'react';
import Shelf from '../Shelf';
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

const MainPage = ({ books }) => {
  if (!books) return <React.Fragment>Loading...</React.Fragment>

  const currentReads = books.filter(book => book.shelf === 'currentlyReading')
  const wantToRead = books.filter(book => book.shelf === 'wantToRead')
  const finishedReading = books.filter(book => book.shelf === 'read')


  return (
    <div className="list-books">
      <Navigation />
      <div className="list-books-content">
        <div>
          <Shelf name="Currently Reading" books={currentReads} />
          <Shelf name="Want to Read" books={wantToRead} />
          <Shelf name="Finished Reading" books={finishedReading} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search"><button>Search</button></Link>
      </div>
    </div>
  )
}


export default MainPage;
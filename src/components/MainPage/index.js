import React from 'react';
import Shelf from '../Shelf';
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

const MainPage = ({ books, moveShelf }) => {
  if (!books) return <React.Fragment>Loading...</React.Fragment>

  console.log(moveShelf);
  const currentReads = books.filter(book => book.shelf === 'currentlyReading')
  const wantToRead = books.filter(book => book.shelf === 'wantToRead')
  const finishedReading = books.filter(book => book.shelf === 'read')


  return (
    <div className="list-books">
      <Navigation />
      <div className="list-books-content">
        <div>
          <Shelf moveShelf={moveShelf} name="Currently Reading" books={currentReads} />
          <Shelf moveShelf={moveShelf} name="Want to Read" books={wantToRead} />
          <Shelf moveShelf={moveShelf} name="Finished Reading" books={finishedReading} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search"><button>Search</button></Link>
      </div>
    </div>
  )
}


export default MainPage;
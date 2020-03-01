import React, { useState } from 'react';
import Book from '../Book';

const Shelf = ({ name, books, moveShelf }) => {

  // console.log(name, books, moveShelf);
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.length > 0 ?
              books.map((book, idx) => <Book book={book} key={idx} id={idx} moveShelf={moveShelf}/>) :
              <React.Fragment>No books...</React.Fragment>
          }
        </ol>
      </div>
    </div>
  )
}


export default Shelf;
import React, { useContext } from 'react';
import Book from '../Book';
import { BookContext } from '../../Context';

const SearchPage = ({ searchResults }) => {

  const { moveShelf } = useContext(BookContext);
  
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {
          searchResults.map((book, idx) => <Book book={book} moveShelf={moveShelf} key={idx} />)
        }
      </ol>
    </div>
  )
}

export default SearchPage;
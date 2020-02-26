import React from 'react';

const SearchPage = () => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {
          searchResults.map(book => <Book book={book} moveShelf={moveShelf} />)
        }
      </ol>
    </div>
  )
}

export default SearchPage;
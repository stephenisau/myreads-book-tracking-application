import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';

const Search = ({ books, moveShelf }) => {

  const [query, setQuery] = useState("");
  const [searchResults, setResults] = useState([]);


  const handleSubmit = (evt) => {
    evt.persist();
    submitSearch(query);
  }


  const submitSearch = async query => {
    if (query) {
      const response = await BooksAPI.search(query);
      
    }

  }


  // function submitSearch(query) {
  //   if (query) {
  //     BooksAPI.search(query).then((resp) => {
  //       try {
  //         resp.forEach(book => {
  //           let result = books.filter(bookFromProp => bookFromProp.id === book.id)
  //           if (result.length > 0) {
  //             result.map(bookRes => book.shelf = bookRes.shelf || '')
  //           }
  //         })
  //         setResults({
  //           searchResults: resp
  //         });
  //       } catch (err) {
  //         console.log(resp.err);
  //         setResults({
  //           searchResults: []
  //         })
  //       }
  //     })
  //   }
  // }


  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          className="close-search"
          to="/"
        />
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
    </div>
  )
}

export default Search;
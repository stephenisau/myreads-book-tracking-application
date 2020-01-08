import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { debounce } from 'lodash';
import * as BooksAPI from './BooksAPI';

import Book from './Book';


/*
 Search component dealing with the search route
*/
class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      query: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit = debounce((evt) => {
    evt.persist();
    const query = this.state.query;
    this.submitSearch(query);
  }, 200)

  submitSearch(query) {
    if (query) {
      BooksAPI.search(query).then((resp) => {
        try {
          resp.forEach(book => {
            let result = this.props.books.filter(bookFromProp => bookFromProp.id === book.id)
            if (result.length > 0) {
              result.map(bookRes => book.shelf = bookRes.shelf || '')
            }
          })
          this.setState({
            searchResults: resp
          });
        } catch (err) {
          console.log(resp.err);
          this.setState({
            searchResults: []
          })
        }
      })
    }
  }

  render() {
    const { book, moveShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >Close
                </Link>
          <div className="search-books-input-wrapper">
            <form onChange={this.handleSubmit}>
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={this.handleChange}
                name="query"
                autoComplete="Off"
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.searchResults.map(book => <Book book={book} moveShelf={moveShelf} />)
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
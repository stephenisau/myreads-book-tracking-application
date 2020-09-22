import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import SearchPage from '../SearchPage';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searchResults: [],
      books: props.books,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  componentDidMount() {
    this.setState({
      books: this.props.books
    });
  }


  handleSubmit = async (query) => {
    const response = await BooksAPI.search(query);
    this.setState({
      searchResults: response
    });
  };


  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
    setTimeout(() => {
      this.handleSubmit(this.state.query);
    }, 1000);
  };


  render() {
    console.log(this.props)
    const searchResults = this.state.searchResults.length > 0 ? <SearchPage searchResults={this.state.searchResults} /> : "No results..."
    return (
      <React.Fragment>
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              className="close-search"
              to="/"
            />
            <div className="search-books-input-wrapper">
              <form>
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
        </div>

        <div className="container">
          {searchResults}
        </div>
      </React.Fragment>

    )
  }

}


// const Search = ({ books, moveShelf }) => {

//   const [query, setQuery] = useState("");
//   const [searchResults, setResults] = useState([]);


//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//     submitSearch(query);
//   }


//   const submitSearch = async query => {
//     console.log(query);
//     if (query) {
//       const response = await BooksAPI.search(query);
//       try {
//         response.forEach(book => {
//           let result = books.filter(propBook => propBook.id === book.id ? book : propBook);
//           if (result.length > 0) setResults({ searchResults: response });
//         })
//         setResults({ searchResults: response });
//       } catch (err) {
//         console.log("Error fetching: ", response.error);
//         setResults({
//           searchResults: []
//         })
//       };
//     }

//   }


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


// }

export default Search;
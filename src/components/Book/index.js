import React from 'react';

const Book = ({ book, moveShelf }) => {
  // console.log(book, moveShelf)
  // const dispatch = useContext();
  const styles = {
    bookCover: {
      width: 128,
      height: 193,
      backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ""}")`
    }
  }

  const changeShelf = async (evt) => {
    console.log("i'm in!");
    moveShelf(book, evt.target.value)
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={styles.bookCover}></div>
        <div className="book-shelf-changer">
          <select
            value={book.shelf || "none"}
            onChange={changeShelf}>
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

export default Book;
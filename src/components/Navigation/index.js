import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  return (
    <>
      <div className="list-books-title">
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand href="/"><h1 className="text-white">MyReads</h1></Navbar.Brand>
          <Nav.Link href="/search">
            <FontAwesomeIcon icon={faSearch} className="text-white"/>
          </Nav.Link>
        </Navbar>
      </div>
    </>
  )
}

export default Navigation;
import React from 'react';
import { render } from "@testing-library/react";
import Book from '../index';


/**
 * Smoke Test
 */

it("renders without crashing", () => {
  render(<Book />);
});


/**
 * Snapshot Test
 */
it("matches snapshot", () => {
  const bookProp = {
    
  }
  const { asFragment } = render(<Book />);
  expect(asFragment()).toMatchSnapshot();
});
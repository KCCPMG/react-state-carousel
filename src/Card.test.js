import React from "react";
import { render } from "@testing-library/react";
import Card from './Card.js';

test("renders without crashing", function() {
  render(<Card />);
})

test("snapshot test", function(){
  const { asFragment } = render(<Card />);
  expect(asFragment).toMatchSnapshot();
})
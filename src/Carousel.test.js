import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";


test("renders without crashing", function() {
  render(<Carousel />);
})

test("snapshot test", function(){
  const { asFragment } = render(<Carousel />);
  expect(asFragment).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click the left arrow", function(){
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

})

test("left arrow does not show on first image, right arrow does not show on last image", function(){
  const { queryByTestId } = render(<Carousel />)

  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();

  // click twice to get through to third image
  fireEvent.click(queryByTestId("right-arrow"));
  fireEvent.click(queryByTestId("right-arrow"));

  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();

})


import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";
import { axiosWithAuth } from "../utils/axiosWithAuth";

//////////////////////
//      TESTING     //
//////////////////////

const getColors = () => {
  axiosWithAuth()
    .get("/api/colors")
    .then((response) => setColorList(response.data))
    .catch((error) => console.log(error.response.data));
};

let mockGetColors = getColors();

jest.mock(mockGetColors);
console.log(mockGetColors);

////////////////////////
//      MOCK DATA     //
////////////////////////

const mockData = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff",
    },
    id: 1,
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc",
    },
    id: 2,
  },
  {
    color: "aqua",
    code: {
      hex: "#00ffff",
    },
    id: 3,
  },
];

//////////////////////////
//      RENDER DATA     //
//////////////////////////

test("Fetches data and renders the bubbles", async () => {
  const { rerender } = render(<BubblePage mockData={[]} />);

  rerender(<BubblePage mockData={mockData} />);

  expect(await screen.findByText(/bubbles/i)).toBeInTheDocument();
  expect(await screen.findByText(/colors/i)).toBeInTheDocument();
});

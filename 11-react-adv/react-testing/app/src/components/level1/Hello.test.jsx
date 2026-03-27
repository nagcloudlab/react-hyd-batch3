// ==================================================
// LEVEL 1 — Basic Rendering Tests
// ==================================================
// render()  → mounts component into virtual DOM
// screen    → queries the rendered DOM
// getByText → finds element by visible text
// expect()  → asserts a condition

import { render, screen } from "@testing-library/react";
import Hello from "./Hello";

test("renders hello text", () => {
  render(<Hello />);

  expect(screen.getByText("Hello World")).toBeInTheDocument();
});

test("renders as an h1 heading", () => {
  render(<Hello />);

  // getByRole is the preferred query — finds by accessibility role
  const heading = screen.getByRole("heading", { level: 1 });

  expect(heading).toHaveTextContent("Hello World");
});

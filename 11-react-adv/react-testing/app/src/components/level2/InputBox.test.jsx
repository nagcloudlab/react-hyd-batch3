// ==================================================
// LEVEL 2 — Testing User Input (Typing)
// ==================================================
// userEvent.type()         → simulates real typing
// getByPlaceholderText()   → finds input by placeholder
// toHaveValue()            → asserts input's current value

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputBox from "./InputBox";

test("shows default greeting", () => {
  render(<InputBox />);

  expect(screen.getByText("Hello, stranger!")).toBeInTheDocument();
});

test("updates greeting as user types", async () => {
  render(<InputBox />);

  const input = screen.getByPlaceholderText("Enter name");

  await userEvent.type(input, "Nag");

  expect(input).toHaveValue("Nag");
  expect(screen.getByText("Hello, Nag!")).toBeInTheDocument();
});

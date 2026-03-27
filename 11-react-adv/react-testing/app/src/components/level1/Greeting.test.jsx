// LEVEL 1 — Testing Props
import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

test("renders greeting with name", () => {
  render(<Greeting name="Nag" />);

  expect(screen.getByText("Welcome, Nag!")).toBeInTheDocument();
  expect(screen.getByText("We are glad to have you here.")).toBeInTheDocument();
});

test("renders different name", () => {
  render(<Greeting name="React Student" />);

  expect(screen.getByText("Welcome, React Student!")).toBeInTheDocument();
});

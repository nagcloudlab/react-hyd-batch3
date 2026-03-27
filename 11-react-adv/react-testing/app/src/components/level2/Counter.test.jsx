// ==================================================
// LEVEL 2 — Testing User Interactions (Click)
// ==================================================
// userEvent.click()  → simulates real click
// getByRole("button", { name: /text/i }) → find button by text

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

test("starts at 0", () => {
  render(<Counter />);

  expect(screen.getByText("Count: 0")).toBeInTheDocument();
});

test("increments count on click", async () => {
  render(<Counter />);

  const btn = screen.getByRole("button", { name: /increment/i });
  await userEvent.click(btn);

  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});

test("decrements count on click", async () => {
  render(<Counter />);

  const btn = screen.getByRole("button", { name: /decrement/i });
  await userEvent.click(btn);

  expect(screen.getByText("Count: -1")).toBeInTheDocument();
});

test("resets count to 0", async () => {
  render(<Counter />);

  await userEvent.click(screen.getByRole("button", { name: /increment/i }));
  await userEvent.click(screen.getByRole("button", { name: /increment/i }));
  await userEvent.click(screen.getByRole("button", { name: /reset/i }));

  expect(screen.getByText("Count: 0")).toBeInTheDocument();
});

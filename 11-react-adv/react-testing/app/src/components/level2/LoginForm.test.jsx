// ==================================================
// LEVEL 2 — Testing Form Submission
// ==================================================
// getByLabelText()  → preferred way to find form inputs
// getByRole()       → preferred for buttons

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

test("renders login form", () => {
  render(<LoginForm />);

  expect(screen.getByLabelText("Username")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});

test("submits form and shows welcome", async () => {
  render(<LoginForm />);

  await userEvent.type(screen.getByLabelText("Username"), "Nag");
  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(screen.getByText("Welcome, Nag!")).toBeInTheDocument();
});

test("does not submit with empty username", async () => {
  render(<LoginForm />);

  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  // Form should still be visible (not submitted)
  expect(screen.getByLabelText("Username")).toBeInTheDocument();
});

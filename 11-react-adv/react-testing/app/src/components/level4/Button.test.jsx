// ==================================================
// LEVEL 4 — Enterprise Testing Patterns
// ==================================================
// vi.fn()          → creates a mock function to track calls
// toHaveBeenCalled → checks if mock was invoked
// toBeDisabled()   → checks disabled attribute
// describe()       → groups related tests

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Button from "./Button";

describe("Button component", () => {
  test("renders with label", () => {
    render(<Button label="Click me" />);

    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  test("calls onClick when clicked", async () => {
    const handleClick = vi.fn(); // mock function

    render(<Button label="Save" onClick={handleClick} />);
    await userEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();

    render(<Button label="Save" onClick={handleClick} disabled />);

    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();

    await userEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });
});

// ==================================================
// LEVEL 4 — Integration Test (Multiple Interactions)
// ==================================================
// Tests the full add → toggle → delete flow
// queryByText() → returns null if not found (no error)

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "./TodoList";

describe("TodoList", () => {
  test("shows empty message initially", () => {
    render(<TodoList />);

    expect(screen.getByText("No todos yet")).toBeInTheDocument();
  });

  test("adds a todo", async () => {
    render(<TodoList />);

    await userEvent.type(screen.getByPlaceholderText("Add todo"), "Learn Testing");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("Learn Testing")).toBeInTheDocument();
    expect(screen.queryByText("No todos yet")).not.toBeInTheDocument();
  });

  test("does not add empty todo", async () => {
    render(<TodoList />);

    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("No todos yet")).toBeInTheDocument();
  });

  test("clears input after adding", async () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add todo");
    await userEvent.type(input, "Learn React");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(input).toHaveValue("");
  });

  test("deletes a todo", async () => {
    render(<TodoList />);

    await userEvent.type(screen.getByPlaceholderText("Add todo"), "Temp item");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("Temp item")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(screen.queryByText("Temp item")).not.toBeInTheDocument();
    expect(screen.getByText("No todos yet")).toBeInTheDocument();
  });
});

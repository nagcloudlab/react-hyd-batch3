// ==================================================
// LEVEL 3 — Testing Async Components (API Mocking)
// ==================================================
// vi.mock()      → replaces a module with fake implementation
// findByText()   → waits for element to appear (async)
// getByText()    → immediate lookup (sync)

import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Users from "./Users";

// Mock the API module
vi.mock("./api", () => ({
  getUsers: vi.fn(),
}));

// Import AFTER mocking — now getUsers is a mock function
import { getUsers } from "./api";

afterEach(() => {
  vi.restoreAllMocks();
});

test("shows loading state initially", () => {
  getUsers.mockReturnValue(new Promise(() => {})); // never resolves

  render(<Users />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("renders users after API resolves", async () => {
  getUsers.mockResolvedValue([
    { id: 1, name: "Nag" },
    { id: 2, name: "React Student" },
  ]);

  render(<Users />);

  // findBy* waits for the element to appear — essential for async
  expect(await screen.findByText("Nag")).toBeInTheDocument();
  expect(screen.getByText("React Student")).toBeInTheDocument();
});

test("shows error when API fails", async () => {
  getUsers.mockRejectedValue(new Error("Network error"));

  render(<Users />);

  expect(await screen.findByText("Error: Network error")).toBeInTheDocument();
});

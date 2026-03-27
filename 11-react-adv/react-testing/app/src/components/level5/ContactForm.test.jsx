// ==================================================
// LEVEL 5 — Full User Flow Integration Test
// ==================================================
// Tests: Fill form → Submit → API mock → Success/Error
// Combines everything from L1-L4

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import ContactForm from "./ContactForm";

// Mock the API module
vi.mock("./contactApi", () => ({
  submitContact: vi.fn(),
}));

import { submitContact } from "./contactApi";

beforeEach(() => {
  submitContact.mockReset();
});

// Helper: fill the form
async function fillForm() {
  await userEvent.type(screen.getByLabelText("Name"), "Nag");
  await userEvent.type(screen.getByLabelText("Email"), "nag@example.com");
  await userEvent.type(screen.getByLabelText("Message"), "Hello from tests!");
}

describe("ContactForm — Full Flow", () => {
  test("renders all form fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  test("successful submission shows thank-you message", async () => {
    submitContact.mockResolvedValue({ ok: true });

    render(<ContactForm />);

    await fillForm();
    await userEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText("Thank you! Your message has been sent.")).toBeInTheDocument();
  });

  test("shows loading state during submission", async () => {
    // Never resolves — keeps in loading state
    submitContact.mockReturnValue(new Promise(() => {}));

    render(<ContactForm />);

    await fillForm();
    await userEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
  });

  test("shows error message on API failure", async () => {
    submitContact.mockRejectedValue(new Error("Server unavailable"));

    render(<ContactForm />);

    await fillForm();
    await userEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText("Error: Server unavailable")).toBeInTheDocument();
  });

  test("can send another message after success", async () => {
    submitContact.mockResolvedValue({ ok: true });

    render(<ContactForm />);

    await fillForm();
    await userEvent.click(screen.getByRole("button", { name: /send message/i }));
    await screen.findByText("Thank you! Your message has been sent.");

    await userEvent.click(screen.getByRole("button", { name: /send another/i }));

    // Form should be back
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  test("does not submit with empty fields", async () => {
    render(<ContactForm />);

    await userEvent.click(screen.getByRole("button", { name: /send message/i }));

    // submitContact should NOT have been called
    expect(submitContact).not.toHaveBeenCalled();
  });

  test("API receives correct data", async () => {
    submitContact.mockResolvedValue({ ok: true });

    render(<ContactForm />);

    await fillForm();
    await userEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(submitContact).toHaveBeenCalledWith({
      name: "Nag",
      email: "nag@example.com",
      message: "Hello from tests!",
    });
  });
});

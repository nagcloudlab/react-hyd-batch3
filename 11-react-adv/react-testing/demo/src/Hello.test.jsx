import { render, screen } from "@testing-library/react";
import Hello from "./Hello";

test("renders hello text", () => {
    render(<Hello />); // 
    expect(screen.getByText("Hello World")).toBeInTheDocument();
});

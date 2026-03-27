# 🚀 LEVEL-2: Testing User Interactions & Forms

## 🎯 Learning Goal

By the end of this level, you will:

* Test user interactions (click, input)
* Simulate real user behavior
* Test forms and state updates
* Use event utilities
* Write meaningful assertions

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="k1m9qp"
Render → Check text
```

👉 Now:

```id="p7x3zt"
Render → User Action → UI Change → Assert
```

---

## 🛠️ Step 1 — Install User Event Library

```bash id="n4x9rm"
npm install --save-dev @testing-library/user-event
```

---

## 🧩 Step 2 — Button Click Test

### Component

```tsx id="d8k2vx"
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

### Test

```tsx id="m3p7yt"
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

test("increments count on click", async () => {
  render(<Counter />);

  const button = screen.getByRole("button", { name: /increment/i });

  await userEvent.click(button);

  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

---

## 🧾 Step 3 — Input Field Test

### Component

```tsx id="r6k2nx"
import { useState } from "react";

export default function InputBox() {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        placeholder="Enter name"
        onChange={(e) => setText(e.target.value)}
      />
      <p>{text}</p>
    </div>
  );
}
```

---

### Test

```tsx id="p5x9lm"
test("updates input value", async () => {
  render(<InputBox />);

  const input = screen.getByPlaceholderText("Enter name");

  await userEvent.type(input, "Nag");

  expect(screen.getByText("Nag")).toBeInTheDocument();
});
```

---

## 🧪 Step 4 — Form Submission Test

### Component

```tsx id="k1v7zx"
import { useState } from "react";

export default function FormExample() {
  const [name, setName] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={(e) => setName(e.target.value)} />
      <button type="submit">Submit</button>
      <p>{name}</p>
    </form>
  );
}
```

---

### Test

```tsx id="q9m2rt"
test("submits form with input", async () => {
  render(<FormExample />);

  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", { name: /submit/i });

  await userEvent.type(input, "React");
  await userEvent.click(button);

  expect(screen.getByText("React")).toBeInTheDocument();
});
```

---

## ⚙️ Step 5 — Assertions Deep Dive

```tsx id="y4k8xp"
expect(element).toBeInTheDocument();
expect(element).toHaveTextContent("text");
expect(input).toHaveValue("value");
expect(button).toBeDisabled();
```

---

## 🔍 Step 6 — Query Best Practices

```id="t9k2rx"
getByRole → preferred
getByLabelText → for forms
getByText → fallback
getByTestId → last resort
```

---

## 🧪 Step 7 — Run Tests

```bash id="k8z4xp"
npx vitest
```

---

## 📌 LEVEL-2 SUMMARY

You learned:

* Testing user interactions
* Simulating clicks and typing
* Testing forms
* Writing assertions
* Querying DOM effectively

---

## 🧠 Expert Takeaways (Trainer Ready)

* Tests should simulate real user behavior
* Avoid testing implementation details
* Prefer role-based queries
* userEvent is better than fireEvent
* Assertions should reflect UI outcomes

---

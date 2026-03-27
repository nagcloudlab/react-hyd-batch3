# 🚀 LEVEL-1: Testing React Components (FOUNDATION)

## 🎯 Learning Goal

By the end of this level, you will:

* Understand why testing is important
* Set up testing in React
* Write basic component tests
* Use React Testing Library
* Run and verify tests

---

## 🧠 Step 0 — Mental Model

👉 Without testing:

```id="k1m9qp"
Code → Manual check → Risk
```

👉 With testing:

```id="p7x3zt"
Code → Test → Confidence
```

👉 Types:

```id="n3p7ty"
Unit → Component
Integration → Multiple components
E2E → Full app
```

---

## 🛠️ Step 1 — Install Testing Libraries

```bash id="n4x9rm"
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

---

## ⚙️ Step 2 — Setup Vitest

### Update: vite.config.ts

```ts id="d8k2vx"
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
});
```

---

## 🧩 Step 3 — Create Component

### src/components/Hello.tsx

```tsx id="m3p7yt"
export default function Hello() {
  return <h1>Hello World</h1>;
}
```

---

## 🧪 Step 4 — Create Test File

### src/components/Hello.test.tsx

```tsx id="r6k2nx"
import { render, screen } from "@testing-library/react";
import Hello from "./Hello";

test("renders hello text", () => {
  render(<Hello />);
  expect(screen.getByText("Hello World")).toBeInTheDocument();
});
```

---

## ▶️ Step 5 — Run Tests

```bash id="p5x9lm"
npx vitest
```

---

## 🔍 Step 6 — What Just Happened?

* `render()` mounts component
* `screen.getByText()` finds element
* `expect()` validates output

---

## ⚙️ Step 7 — Common Queries

```tsx id="k1v7zx"
screen.getByText("Hello")
screen.getByRole("button")
screen.getByPlaceholderText("Enter name")
```

---

## 📌 LEVEL-1 SUMMARY

You learned:

* Testing setup with Vitest
* Writing basic tests
* Rendering components
* Querying DOM
* Running tests

---

## 🧠 Expert Takeaways (Trainer Ready)

* Testing ensures confidence in code changes
* React Testing Library focuses on user behavior
* Tests should resemble real usage
* Vitest is fast and modern

---

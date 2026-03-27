# 🚀 LEVEL-5: Testing Complex Flows & E2E (Real-World Mastery)

## 🎯 Learning Goal

By the end of this level, you will:

* Test complete user flows (form + API + router)
* Perform integration testing across components
* Write E2E tests using Playwright
* Debug failing tests
* Apply real-world testing strategies

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="k1m9qp"
Component → Test
```

👉 Now:

```id="p7x3zt"
User Flow → Multiple Components → API → Navigation → Test
```

---

## 🛠️ Step 1 — Complex Flow Example

### Scenario:

```id="n4x9rm"
Login → API → Redirect → Dashboard
```

---

## 🧩 Step 2 — Integration Test

```tsx id="d8k2vx"
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import App from "./App";

test("login flow works", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByRole("textbox"), "Nag");
  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  const dashboard = await screen.findByText("Dashboard");

  expect(dashboard).toBeInTheDocument();
});
```

---

## 🔁 Step 3 — Mock API for Flow

```tsx id="m3p7yt"
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true })
  } as any)
);
```

---

## 🧭 Step 4 — Router Navigation Testing

```tsx id="r6k2nx"
import { createMemoryRouter, RouterProvider } from "react-router";

const router = createMemoryRouter(routes, {
  initialEntries: ["/login"]
});

render(<RouterProvider router={router} />);
```

---

## 🧪 Step 5 — E2E Testing (Playwright)

Install:

```bash id="p5x9lm"
npm install --save-dev @playwright/test
npx playwright install
```

---

## 🌐 Step 6 — E2E Test Example

```ts id="k1v7zx"
import { test, expect } from "@playwright/test";

test("login flow", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.fill("input", "Nag");
  await page.click("button");

  await expect(page).toHaveURL("/dashboard");
});
```

---

## 🧠 Step 7 — Debugging Tests

```id="q9m2rt"
- Use screen.debug()
- Check async timing issues
- Use findBy* for async UI
- Verify mocks
```

---

## ⚙️ Step 8 — Testing Strategy

```id="y4k8xp"
Unit → Small components
Integration → Flow inside app
E2E → Full user journey
```

---

## 🏗️ Step 9 — Real-World Pattern

```id="t9k2rx"
Login Flow
 ├── Form input
 ├── API call
 ├── Auth state update
 ├── Redirect
 └── Dashboard render
```

---

## 🧪 Step 10 — Run Tests

```bash id="k8z4xp"
npx vitest
npx playwright test
```

---

## 📌 LEVEL-5 SUMMARY

You learned:

* Testing full user flows
* Integration testing
* Router + API testing
* E2E testing with Playwright
* Debugging techniques

---

## 🧠 Expert Takeaways (Trainer Ready)

* Test user journeys, not just components
* Combine unit + integration + E2E
* Mock APIs carefully
* Use E2E for critical flows
* Testing strategy is as important as code

---

## 🎯 FINAL OUTCOME

You can now:

* Test enterprise React apps
* Validate full workflows
* Ensure production reliability
* Build CI-ready test suites

---

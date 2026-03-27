# 🚀 LEVEL-4: Enterprise Testing (Structure, Utilities, Mocks, Coverage)

## 🎯 Learning Goal

By the end of this level, you will:

* Structure tests for large projects
* Create reusable test utilities
* Mock modules/services cleanly
* Measure test coverage
* Integrate tests into CI/CD

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="k1m9qp"
Component → Test file
```

👉 Now:

```id="p7x3zt"
Feature → Components → Tests → Utilities → CI
```

---

## 📁 Step 1 — Project Test Structure

```id="n4x9rm"
src/
 ├── components/
 │   ├── Button.tsx
 │   ├── Button.test.tsx
 │
 ├── pages/
 │   ├── Dashboard.tsx
 │   ├── Dashboard.test.tsx
 │
 ├── test/
 │   ├── setup.ts
 │   ├── utils.tsx
```

---

## ⚙️ Step 2 — Global Test Setup

### src/test/setup.ts

```ts id="d8k2vx"
import "@testing-library/jest-dom";
```

---

### vite.config.ts

```ts id="m3p7yt"
test: {
  environment: "jsdom",
  setupFiles: "./src/test/setup.ts"
}
```

---

## 🧩 Step 3 — Custom Render Utility

### src/test/utils.tsx

```tsx id="r6k2nx"
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

export function customRender(ui: any) {
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  );
}
```

---

## 🔄 Step 4 — Use Custom Render

```tsx id="p5x9lm"
import { customRender } from "../test/utils";

test("renders component", () => {
  customRender(<MyComponent />);
});
```

---

## 🧪 Step 5 — Mock API Module

### api.ts

```ts id="k1v7zx"
export async function getUsers() {
  const res = await fetch("/api/users");
  return res.json();
}
```

---

### Test

```tsx id="q9m2rt"
import * as api from "../api";

vi.spyOn(api, "getUsers").mockResolvedValue([
  { id: 1, name: "Mock User" }
]);
```

---

## ⚡ Step 6 — Mock Entire Module

```tsx id="y4k8xp"
vi.mock("../api", () => ({
  getUsers: () => Promise.resolve([{ id: 1, name: "Mock" }])
}));
```

---

## 📊 Step 7 — Test Coverage

```bash id="t9k2rx"
npx vitest --coverage
```

---

## 🔗 Step 8 — CI Integration (GitHub Actions)

```yaml id="k8z4xp"
name: Test

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run test
```

---

## 🧠 Step 9 — Best Practices

```id="m7p3nx"
- Test behavior, not implementation
- Keep tests small and focused
- Avoid unnecessary mocks
- Use custom utilities
- Maintain high coverage (70%+)
```

---

## 🧪 Step 10 — Run & Verify

```bash id="z2x8qn"
npx vitest
```

---

## 📌 LEVEL-4 SUMMARY

You learned:

* Test folder structure
* Global setup
* Custom render utilities
* Mocking services
* Coverage and CI integration

---

## 🧠 Expert Takeaways (Trainer Ready)

* Testing must scale with application size
* Reusable utilities reduce duplication
* Mocking should be controlled and minimal
* CI ensures test reliability
* Coverage helps maintain quality

---

# 🚀 LEVEL-3: Advanced Testing (API Mocking, Async, React Router)

## 🎯 Learning Goal

By the end of this level, you will:

* Mock API calls (fetch/axios)
* Test async components
* Handle loading & error states
* Test React Router components (loaders/actions)
* Write reliable async tests

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="k1m9qp"
Render → Click → Assert
```

👉 Now:

```id="p7x3zt"
Render → Async API → UI Update → Assert
```

---

## 🛠️ Step 1 — Async Component Example

### Component

```tsx id="n4x9rm"
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

---

## 🔁 Step 2 — Mock fetch

```tsx id="d8k2vx"
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, name: "Nag" }
    ])
  } as any)
);
```

---

## 🧪 Step 3 — Async Test

```tsx id="m3p7yt"
import { render, screen } from "@testing-library/react";
import Users from "./Users";

test("loads users", async () => {
  render(<Users />);

  const user = await screen.findByText("Nag");

  expect(user).toBeInTheDocument();
});
```

---

## ⚡ Step 4 — Loading State

### Component

```tsx id="r6k2nx"
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("/api").then(res => res.json()).then(() => {
    setLoading(false);
  });
}, []);

return loading ? <p>Loading...</p> : <p>Done</p>;
```

---

### Test

```tsx id="p5x9lm"
expect(screen.getByText("Loading...")).toBeInTheDocument();

await screen.findByText("Done");
```

---

## ❌ Step 5 — Error Handling

### Mock Error

```tsx id="k1v7zx"
global.fetch = vi.fn(() =>
  Promise.reject("API Error")
);
```

---

### Component Handling

```tsx id="q9m2rt"
.catch(() => setError(true));
```

---

### Test

```tsx id="y4k8xp"
const error = await screen.findByText("Error");

expect(error).toBeInTheDocument();
```

---

## 🧭 Step 6 — Testing React Router

```tsx id="t9k2rx"
import { MemoryRouter } from "react-router";

render(
  <MemoryRouter>
    <MyComponent />
  </MemoryRouter>
);
```

---

## 🔄 Step 7 — Mock Loader Data

```tsx id="k8z4xp"
import { useLoaderData } from "react-router";

vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  useLoaderData: () => [{ id: 1, name: "Test" }]
}));
```

---

## 🧪 Step 8 — Run Tests

```bash id="m7p3nx"
npx vitest
```

---

## 📌 LEVEL-3 SUMMARY

You learned:

* Mocking APIs
* Testing async UI
* Handling loading & errors
* Testing React Router components
* Writing reliable async tests

---

## 🧠 Expert Takeaways (Trainer Ready)

* Always mock external APIs
* Use `findBy*` for async queries
* Test loading and error states
* Keep tests deterministic
* Router context must be provided

---

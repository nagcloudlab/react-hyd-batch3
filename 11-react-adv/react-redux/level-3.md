# 🚀 LEVEL-3: Redux Performance (Selectors, Memoization & State Design)

## 🎯 Learning Goal

By the end of this level, you will:

* Use selectors for clean state access
* Prevent unnecessary re-renders
* Apply memoization (createSelector)
* Normalize state for large apps
* Design scalable Redux state

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Problem:

```id="k1m9qp"
Component reads full state → re-renders often
```

👉 Solution:

```id="p7x3zt"
Selector → extract only required data
```

👉 Think:

```id="n3p7ty"
Selector = Query for Redux state
```

---

## 🛠️ Step 1 — Basic Selector

```ts id="n4x9rm"
export const selectCount = (state: any) => state.counter.value;
```

---

## 🔗 Step 2 — Use Selector

```tsx id="d8k2vx"
const count = useSelector(selectCount);
```

---

## ⚡ Step 3 — Problem (Derived Data)

```ts id="m3p7yt"
const filtered = users.filter(u => u.active);
```

👉 Runs on every render ❌

---

## 🚀 Step 4 — Memoized Selector

```ts id="r6k2nx"
import { createSelector } from "@reduxjs/toolkit";

const selectUsers = (state: any) => state.user.users;

export const selectActiveUsers = createSelector(
  [selectUsers],
  (users) => users.filter(u => u.active)
);
```

---

## 🧩 Step 5 — Use Memoized Selector

```tsx id="p5x9lm"
const users = useSelector(selectActiveUsers);
```

👉 Recalculates only when users change ✅

---

## 📦 Step 6 — Normalized State

👉 ❌ Bad:

```ts id="k1v7zx"
users: [
  { id: 1, name: "A" },
  { id: 2, name: "B" }
]
```

👉 ✅ Good:

```ts id="q9m2rt"
users: {
  byId: {
    1: { id: 1, name: "A" },
    2: { id: 2, name: "B" }
  },
  allIds: [1, 2]
}
```

---

## ⚙️ Step 7 — Why Normalize?

```id="y4k8xp"
- Faster lookup
- Easier updates
- Avoid duplication
```

---

## 🔁 Step 8 — Avoid Re-renders

```tsx id="t9k2rx"
const value = useSelector(selector, shallowEqual);
```

---

## ⚠️ Step 9 — Common Mistakes

```id="k8z4xp"
- Returning new objects in selector
- Large state reads
- Inline selectors
- Not memoizing derived data
```

---

## 🧪 Step 10 — Run & Verify

```bash id="m7p3nx"
npm run dev
```

Test:

* Component re-render logs
* Performance improvements

---

## 📌 LEVEL-3 SUMMARY

You learned:

* Selectors
* Memoization
* Derived state optimization
* Normalized state design
* Performance best practices

---

## 🧠 Expert Takeaways (Trainer Ready)

* Selectors isolate state access
* Memoization prevents unnecessary computation
* Normalized state scales better
* Avoid unnecessary re-renders
* Redux performance depends on state design

---

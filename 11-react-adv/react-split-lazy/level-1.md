# 🚀 LEVEL-1: Code Splitting & Lazy Loading (FOUNDATION)

## 🎯 Learning Goal

By the end of this level, you will:

* Understand what code splitting is
* Learn why bundle size matters
* Implement lazy loading in React
* Load components on demand
* Improve initial load performance

---

## 🧠 Step 0 — Mental Model

👉 Problem:

```id="k1m9qp"
App loads → Entire JS bundle → Slow startup
```

👉 Solution:

```id="p7x3zt"
Load only required code → Load rest on demand
```

👉 Concept:

```id="n3p7ty"
Code Splitting = Break bundle into smaller chunks
Lazy Loading = Load chunk when needed
```

---

## 🛠️ Step 1 — Basic Component

```tsx id="n4x9rm"
export default function Dashboard() {
  return <h2>Dashboard Loaded</h2>;
}
```

---

## ⚙️ Step 2 — Without Lazy Loading

```tsx id="d8k2vx"
import Dashboard from "./Dashboard";

function App() {
  return <Dashboard />;
}
```

👉 Issue:

```id="m3p7yt"
Dashboard code loads even if not needed
```

---

## 🚀 Step 3 — Lazy Loading

```tsx id="r6k2nx"
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));
```

---

## ⏳ Step 4 — Suspense (Fallback UI)

```tsx id="p5x9lm"
<Suspense fallback={<p>Loading...</p>}>
  <Dashboard />
</Suspense>
```

---

## 🔍 Step 5 — What Changed?

```id="k1v7zx"
Before → One big bundle
After → Multiple smaller chunks
```

---

## 📦 Step 6 — Verify Code Splitting

```bash id="q9m2rt"
npm run build
```

👉 Check:

```id="y4k8xp"
dist/assets/*.js → multiple files (chunks)
```

---

## ⚡ Step 7 — When to Use Lazy Loading

```id="t9k2rx"
- Large components
- Dashboard pages
- Admin panels
- Rarely used features
```

---

## ⚠️ Step 8 — Common Mistakes

```id="k8z4xp"
- Lazy loading everything (overkill)
- Missing Suspense
- Too many small chunks
```

---

## 🧪 Step 9 — Run & Verify

```bash id="m7p3nx"
npm run dev
```

Test:

* Navigate to component
* Observe loading delay
* Check network tab

---

## 📌 LEVEL-1 SUMMARY

You learned:

* Code splitting concept
* Lazy loading with React
* Suspense usage
* Bundle optimization basics

---

## 🧠 Expert Takeaways (Trainer Ready)

* Bundle size directly impacts load time
* Lazy loading improves perceived performance
* Suspense provides fallback UI
* Split code at meaningful boundaries
* Don’t over-split

---

# 🚀 LEVEL-2: Route-Based Code Splitting & Preloading

## 🎯 Learning Goal

By the end of this level, you will:

* Implement route-level lazy loading
* Split code per page
* Use React Router lazy routes
* Preload important modules
* Benchmark loading improvements

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="k1m9qp"
Component-level lazy loading
```

👉 Now:

```id="p7x3zt"
Route → Load component only when user navigates
```

👉 Concept:

```id="n3p7ty"
Each route = separate bundle
```

---

## 🛠️ Step 1 — Basic Route Setup

```tsx id="n4x9rm"
import { BrowserRouter, Routes, Route } from "react-router";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</BrowserRouter>
```

---

## 🚀 Step 2 — Lazy Load Routes

```tsx id="d8k2vx"
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));
const Home = lazy(() => import("./Home"));
```

---

## ⏳ Step 3 — Wrap with Suspense

```tsx id="m3p7yt"
<Suspense fallback={<p>Loading page...</p>}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Suspense>
```

---

## ⚡ Step 4 — React Router v7 Lazy Routes

```ts id="r6k2nx"
route("/dashboard", lazy(() => import("routes/dashboard.tsx")))
```

👉 Cleaner approach (framework style)

---

## 🔍 Step 5 — Benchmark (Before vs After)

👉 Before:

```id="p5x9lm"
Initial load → All pages bundled
```

👉 After:

```id="k1v7zx"
Initial load → Only home bundle
Dashboard → loaded on demand
```

---

## 📦 Step 6 — Verify Chunks

```bash id="q9m2rt"
npm run build
```

Check:

```id="y4k8xp"
dist/assets/
 ├── home.[hash].js
 ├── dashboard.[hash].js
```

---

## 🚀 Step 7 — Preloading (Advanced)

👉 Preload on hover:

```tsx id="t9k2rx"
const Dashboard = lazy(() => import("./Dashboard"));

<Link
  to="/dashboard"
  onMouseEnter={() => import("./Dashboard")}
>
  Dashboard
</Link>
```

---

## ⚙️ Step 8 — When to Preload

```id="k8z4xp"
- High probability navigation
- Critical next page
- Dashboard after login
```

---

## ⚠️ Step 9 — Pitfalls

```id="m7p3nx"
- Too many chunks → network overhead
- No fallback UI
- Lazy loading critical components
```

---

## 🧪 Step 10 — Run & Verify

```bash id="z2x8qn"
npm run dev
```

Test:

* Navigate between routes
* Observe network tab
* Measure load delay

---

## 📌 LEVEL-2 SUMMARY

You learned:

* Route-based code splitting
* Lazy loading with routing
* Preloading strategies
* Bundle verification
* Performance benchmarking

---

## 🧠 Expert Takeaways (Trainer Ready)

* Routes are best splitting boundaries
* Lazy loading reduces initial load
* Preloading improves perceived speed
* Balance between chunk size and count
* Always benchmark improvements

---

# 🚀 LEVEL-3: Advanced Lazy Loading (Suspense Strategy & UX)

## 🎯 Learning Goal

By the end of this level, you will:

* Use multiple Suspense boundaries effectively
* Split components inside routes
* Handle loading states properly
* Add error boundaries for lazy loading
* Design smooth UX for loading

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="k1m9qp"
One Suspense → Entire page loading
```

👉 Now:

```id="p7x3zt"
Multiple Suspense → Partial loading → Better UX
```

---

## 🛠️ Step 1 — Split Inside Page

```tsx id="n4x9rm"
import { lazy, Suspense } from "react";

const Chart = lazy(() => import("./Chart"));
const Table = lazy(() => import("./Table"));
```

---

## ⚙️ Step 2 — Multiple Suspense Boundaries

```tsx id="d8k2vx"
<Suspense fallback={<p>Loading Chart...</p>}>
  <Chart />
</Suspense>

<Suspense fallback={<p>Loading Table...</p>}>
  <Table />
</Suspense>
```

👉 Benefit:

```id="m3p7yt"
Chart loads independently of Table
```

---

## ⏳ Step 3 — Bad vs Good UX

👉 ❌ Bad:

```id="r6k2nx"
Full page loader → blank screen
```

👉 ✅ Good:

```id="p5x9lm"
Partial loaders → progressive rendering
```

---

## 🚀 Step 4 — Nested Suspense

```tsx id="k1v7zx"
<Suspense fallback={<p>Loading Page...</p>}>
  <Dashboard>

    <Suspense fallback={<p>Loading Widgets...</p>}>
      <Widgets />
    </Suspense>

  </Dashboard>
</Suspense>
```

---

## ❌ Step 5 — Error Boundary

```tsx id="q9m2rt"
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Failed to load component</p>;
    }

    return this.props.children;
  }
}
```

---

## 🔗 Step 6 — Combine Suspense + Error Boundary

```tsx id="y4k8xp"
<ErrorBoundary>
  <Suspense fallback={<p>Loading...</p>}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

---

## ⚡ Step 7 — Skeleton UI (Better UX)

```tsx id="t9k2rx"
function Skeleton() {
  return <div className="skeleton-box" />;
}

<Suspense fallback={<Skeleton />}>
  <Chart />
</Suspense>
```

---

## 🧠 Step 8 — Smart Splitting Strategy

```id="k8z4xp"
- Split by route
- Split heavy components
- Avoid splitting tiny components
- Group related components
```

---

## ⚠️ Step 9 — Pitfalls

```id="m7p3nx"
- Too many Suspense boundaries
- Flickering UI
- No fallback UI
- Over-splitting
```

---

## 🧪 Step 10 — Run & Verify

```bash id="z2x8qn"
npm run dev
```

Test:

* Partial loading behavior
* Error handling
* UX smoothness

---

## 📌 LEVEL-3 SUMMARY

You learned:

* Multiple Suspense boundaries
* Nested loading strategies
* Error boundaries
* Skeleton UI
* UX-focused lazy loading

---

## 🧠 Expert Takeaways (Trainer Ready)

* UX matters more than just performance
* Progressive rendering improves perception
* Suspense should be strategically placed
* Error boundaries are mandatory
* Avoid blank screens

---

# 🚀 LEVEL-4: Prefetching, Priority Loading & Resource Hints

## 🎯 Learning Goal

By the end of this level, you will:

* Implement prefetching strategies
* Prioritize critical vs non-critical resources
* Use dynamic imports smartly
* Apply resource hints (preload/prefetch)
* Improve perceived performance

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="k1m9qp"
User clicks → Load component → Wait
```

👉 Now:

```id="p7x3zt"
User intent detected → Preload → Instant navigation
```

👉 Concept:

```id="n3p7ty"
Perceived performance > actual performance
```

---

## 🛠️ Step 1 — Prefetch on Hover

```tsx id="n4x9rm"
const Dashboard = lazy(() => import("./Dashboard"));

<Link
  to="/dashboard"
  onMouseEnter={() => import("./Dashboard")}
>
  Dashboard
</Link>
```

---

## ⚡ Step 2 — Prefetch on Idle

```tsx id="d8k2vx"
useEffect(() => {
  const id = requestIdleCallback(() => {
    import("./Dashboard");
  });

  return () => cancelIdleCallback(id);
}, []);
```

---

## 🚀 Step 3 — Priority Loading

```tsx id="m3p7yt"
- Critical → Load immediately
- Secondary → Lazy load
- Rare → Prefetch
```

---

## 📦 Step 4 — Preload Critical Component

```tsx id="r6k2nx"
import("./Dashboard");
```

👉 Runs early → component ready when needed

---

## 🌐 Step 5 — Resource Hints (HTML)

```html id="p5x9lm"
<link rel="preload" href="/assets/dashboard.js" as="script" />
<link rel="prefetch" href="/assets/chart.js" />
```

---

## 🔍 Step 6 — Difference

```id="k1v7zx"
preload → load NOW (high priority)
prefetch → load later (low priority)
```

---

## ⚙️ Step 7 — Smart Strategy

```id="q9m2rt"
Home page → preload dashboard
Dashboard → prefetch reports
Reports → lazy load heavy charts
```

---

## 🧠 Step 8 — Combine Techniques

```id="y4k8xp"
Lazy + Prefetch + Suspense = Best UX
```

---

## ⚠️ Step 9 — Pitfalls

```id="t9k2rx"
- Over-prefetching → wasted bandwidth
- Preloading everything → defeats purpose
- Ignoring user behavior patterns
```

---

## 🧪 Step 10 — Run & Verify

```bash id="k8z4xp"
npm run dev
```

Test:

* Hover links → faster navigation
* Observe network tab
* Measure load time

---

## 📌 LEVEL-4 SUMMARY

You learned:

* Prefetching strategies
* Priority-based loading
* Resource hints
* Smart loading patterns
* UX optimization

---

## 🧠 Expert Takeaways (Trainer Ready)

* Prefetching improves perceived speed
* Preload vs prefetch must be used wisely
* User behavior should guide optimization
* Combine multiple strategies for best results
* Performance is UX-driven

---

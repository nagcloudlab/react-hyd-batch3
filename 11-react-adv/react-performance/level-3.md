# 🚀 LEVEL-3: Large List Performance (Virtualization & Windowing)

## 🎯 Learning Goal

By the end of this level, you will:

* Handle large lists efficiently
* Understand virtualization (windowing)
* Use `react-window`
* Optimize rendering of thousands of items
* Benchmark list performance

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Problem:

```id="k1m9qp"
1000+ items → Render all → Slow UI
```

👉 Solution:

```id="p7x3zt"
Render only visible items (viewport)
```

👉 Concept:

```id="n3p7ty"
Virtualization = Render subset of list
```

---

## 🛠️ Step 1 — Problem Example

```tsx id="n4x9rm"
export default function BigList() {
  const items = Array.from({ length: 10000 }, (_, i) => i);

  return (
    <ul>
      {items.map(i => (
        <li key={i}>Item {i}</li>
      ))}
    </ul>
  );
}
```

👉 Issue:

```id="d8k2vx"
Rendering 10,000 DOM nodes → performance drop
```

---

## 📦 Step 2 — Install Library

```bash id="m3p7yt"
npm install react-window
```

---

## ⚙️ Step 3 — Virtualized List

```tsx id="r6k2nx"
import { FixedSizeList as List } from "react-window";

const Row = ({ index, style }: any) => (
  <div style={style}>Row {index}</div>
);

export default function VirtualList() {
  return (
    <List
      height={400}
      itemCount={10000}
      itemSize={35}
      width={300}
    >
      {Row}
    </List>
  );
}
```

---

## 🔍 Step 4 — What Changed?

```id="p5x9lm"
Before → 10,000 elements rendered
After → ~10–20 elements rendered
```

---

## ⚡ Step 5 — Benchmark

👉 Use:

React Developer Tools

Observe:

```id="k1v7zx"
- Faster render time
- Smooth scrolling
- Less memory usage
```

---

## 🧠 Step 6 — Keys Optimization

```tsx id="q9m2rt"
<li key={item.id}>
```

👉 Avoid:

```tsx id="y4k8xp"
key={index}
```

---

## 🔁 Step 7 — Memoize Row

```tsx id="t9k2rx"
import { memo } from "react";

const Row = memo(({ index, style }: any) => (
  <div style={style}>Row {index}</div>
));
```

---

## ⚠️ Step 8 — Common Pitfalls

```id="k8z4xp"
- Rendering full list unnecessarily
- Wrong keys
- Inline functions
- Heavy row components
```

---

## 🧪 Step 9 — Run & Verify

```bash id="m7p3nx"
npm run dev
```

Test:

* Scroll performance
* CPU usage
* Render logs

---

## 📌 LEVEL-3 SUMMARY

You learned:

* Large list performance issues
* Virtualization concept
* react-window usage
* Rendering optimization
* Benchmarking improvements

---

## 🧠 Expert Takeaways (Trainer Ready)

* DOM size directly impacts performance
* Virtualization is essential for large datasets
* Only render what user sees
* Memoization improves row performance
* react-window is lightweight and effective

---

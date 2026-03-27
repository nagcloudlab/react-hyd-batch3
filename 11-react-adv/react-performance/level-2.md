# 🚀 LEVEL-2: Prevent Re-renders & Memoization (Benchmarking)

## 🎯 Learning Goal

By the end of this level, you will:

* Prevent unnecessary re-renders
* Use `React.memo`
* Use `useMemo` and `useCallback`
* Understand prop stability
* Benchmark before vs after optimization

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Problem:

```id="k1m9qp"
Parent re-render → Child re-render
```

👉 Even if nothing changed:

```id="p7x3zt"
Same props → Still re-render
```

👉 Goal:

```id="n3p7ty"
Re-render only when needed
```

---

## 🛠️ Step 1 — Problem Example

```tsx id="n4x9rm"
function Child({ value }: any) {
  console.log("Child render");

  return <p>{value}</p>;
}

export default function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Child value={10} />

      <button onClick={() => setCount(count + 1)}>
        Click {count}
      </button>
    </div>
  );
}
```

👉 Issue:

```id="d8k2vx"
Click → Child re-renders (unnecessary)
```

---

## ⚙️ Step 2 — Fix with React.memo

```tsx id="m3p7yt"
import { memo } from "react";

const Child = memo(function Child({ value }: any) {
  console.log("Child render");

  return <p>{value}</p>;
});
```

---

## 🧪 Step 3 — Benchmark Before/After

```tsx id="r6k2nx"
console.count("Child render");
```

👉 Compare:

```id="p5x9lm"
Before → many renders
After → only when props change
```

---

## ⚡ Step 4 — useMemo (Expensive Calculation)

```tsx id="k1v7zx"
import { useMemo } from "react";

const result = useMemo(() => heavyCalculation(), []);
```

👉 Prevents:

```id="q9m2rt"
Re-calculating on every render
```

---

## 🔁 Step 5 — useCallback (Stable Functions)

```tsx id="y4k8xp"
import { useCallback } from "react";

const handleClick = useCallback(() => {
  console.log("clicked");
}, []);
```

---

## ⚠️ Step 6 — Props Stability Problem

```tsx id="t9k2rx"
<Child onClick={() => console.log("click")} />
```

👉 Issue:

```id="k8z4xp"
New function every render → Child re-renders
```

---

## ✅ Fix

```tsx id="m7p3nx"
const handleClick = useCallback(() => {
  console.log("click");
}, []);

<Child onClick={handleClick} />
```

---

## 📊 Step 7 — Profiling Again

👉 Use:

React Developer Tools

Check:

```id="z2x8qn"
- Reduced render count
- Reduced render time
```

---

## 🧠 Step 8 — When NOT to Optimize

```id="g4k9rt"
- Small components
- Cheap renders
- Premature optimization
```

---

## 🧪 Step 9 — Run & Verify

```bash id="h2p8nx"
npm run dev
```

Test:

* Click button
* Observe console / profiler

---

## 📌 LEVEL-2 SUMMARY

You learned:

* Preventing re-renders
* React.memo usage
* useMemo for computation
* useCallback for functions
* Benchmarking improvements

---

## 🧠 Expert Takeaways (Trainer Ready)

* Re-renders are the biggest performance issue
* Memoization reduces unnecessary work
* Props stability is critical
* Benchmark before and after optimization
* Over-optimization can harm readability

---

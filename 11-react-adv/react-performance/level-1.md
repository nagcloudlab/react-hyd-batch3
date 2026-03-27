# 🚀 LEVEL-1: React Component Performance Benchmarking (FOUNDATION)

## 🎯 Learning Goal

By the end of this level, you will:

* Understand performance in React
* Measure render performance
* Use built-in profiling tools
* Identify unnecessary re-renders
* Benchmark component behavior

---

## 🧠 Step 0 — Mental Model

👉 React performance =

```id="k1m9qp"
Render Cost + Re-render Frequency
```

👉 Problem:

```id="p7x3zt"
Too many renders → Slow UI
```

👉 Goal:

```id="n3p7ty"
Measure → Identify → Optimize
```

---

## 🛠️ Step 1 — Create Heavy Component

```tsx id="n4x9rm"
import { useState } from "react";

export default function HeavyComponent() {
  const [count, setCount] = useState(0);

  function heavyCalculation() {
    let total = 0;
    for (let i = 0; i < 1e7; i++) {
      total += i;
    }
    return total;
  }

  return (
    <div>
      <p>Result: {heavyCalculation()}</p>
      <button onClick={() => setCount(count + 1)}>
        Click {count}
      </button>
    </div>
  );
}
```

---

## 🧪 Step 2 — Measure Render Time (Manual)

```tsx id="d8k2vx"
console.time("render");
const result = heavyCalculation();
console.timeEnd("render");
```

---

## ⚙️ Step 3 — React Profiler API

```tsx id="m3p7yt"
import { Profiler } from "react";

function onRenderCallback(
  id: string,
  phase: string,
  actualDuration: number
) {
  console.log(id, phase, actualDuration);
}

<Profiler id="HeavyComponent" onRender={onRenderCallback}>
  <HeavyComponent />
</Profiler>
```

---

## 🔍 Step 4 — DevTools Profiler (IMPORTANT)

👉 Use:

React Developer Tools

Steps:

```id="r6k2nx"
1. Open DevTools → Profiler tab
2. Click "Start Profiling"
3. Interact with app
4. Stop profiling
```

---

## 📊 Step 5 — What to Observe

```id="p5x9lm"
- Render time (ms)
- Number of renders
- Component tree updates
- Slow components
```

---

## ⚡ Step 6 — Problem Identification

👉 Example issue:

```id="k1v7zx"
Click button → heavyCalculation runs again
```

👉 Meaning:

```id="q9m2rt"
Unnecessary re-computation
```

---

## 🧠 Step 7 — Benchmark Concept

```id="y4k8xp"
Benchmark = Measure before optimization
```

---

## 🧪 Step 8 — Run & Observe

```bash id="t9k2rx"
npm run dev
```

Test:

* Click button multiple times
* Observe logs / profiler output

---

## 📌 LEVEL-1 SUMMARY

You learned:

* What performance means in React
* Measuring render time
* Using Profiler API
* Using DevTools Profiler
* Identifying slow components

---

## 🧠 Expert Takeaways (Trainer Ready)

* Performance = render cost × frequency
* Measure before optimizing
* Profiler is essential tool
* Heavy computations block UI
* Re-renders are the main problem

---

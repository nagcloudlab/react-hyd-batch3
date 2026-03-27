# 🚀 LEVEL-1: React Redux (FOUNDATION)

## 🎯 Learning Goal

By the end of this level, you will:

* Understand why Redux is needed
* Learn core Redux concepts
* Set up Redux in React
* Manage global state
* Connect components to store

---

## 🧠 Step 0 — Mental Model

👉 Problem without Redux:

```id="k1m9qp"
Component → Props → Props → Props (prop drilling)
```

👉 Solution:

```id="p7x3zt"
Global Store → Any component can access
```

👉 Think:

```id="n3p7ty"
Redux = Central State Management
```

---

## 🛠️ Step 1 — Install Dependencies

```bash id="n4x9rm"
npm install @reduxjs/toolkit react-redux
```

---

## ⚙️ Step 2 — Create Store

### src/store/store.ts

```ts id="d8k2vx"
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {}
});
```

---

## 🧩 Step 3 — Provide Store

### main.tsx / index.tsx

```tsx id="m3p7yt"
import { Provider } from "react-redux";
import { store } from "./store/store";

<Provider store={store}>
  <App />
</Provider>
```

---

## 🧾 Step 4 — Create Slice

### src/store/counterSlice.ts

```ts id="r6k2nx"
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  }
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
```

---

## 🔗 Step 5 — Add Reducer to Store

```ts id="p5x9lm"
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
```

---

## 🔍 Step 6 — Use Redux in Component

```tsx id="k1v7zx"
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./store/counterSlice";

export default function Counter() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>
        Increment
      </button>
    </div>
  );
}
```

---

## 🧠 Step 7 — What Just Happened?

```id="q9m2rt"
Action → Reducer → Store update → UI re-render
```

---

## ⚙️ Step 8 — Redux Flow

```id="y4k8xp"
Component → dispatch(action)
Reducer → update state
Store → notify UI
```

---

## 🧪 Step 9 — Run & Verify

```bash id="t9k2rx"
npm run dev
```

Test:

* Click button
* State updates globally

---

## 📌 LEVEL-1 SUMMARY

You learned:

* Redux basics
* Store setup
* Slice creation
* Dispatch actions
* Read global state

---

## 🧠 Expert Takeaways (Trainer Ready)

* Redux solves prop drilling
* Store is single source of truth
* Slices simplify Redux usage
* React-Redux connects UI to store
* Redux Toolkit is modern standard

---

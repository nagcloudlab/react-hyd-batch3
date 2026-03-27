# 🚀 LEVEL-2: Redux (Multiple Slices, Async Logic & DevTools)

## 🎯 Learning Goal

By the end of this level, you will:

* Structure Redux for real applications
* Use multiple slices
* Handle async API calls
* Understand middleware concept
* Use Redux DevTools

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="k1m9qp"
Single slice → simple state
```

👉 Now:

```id="p7x3zt"
Multiple slices → feature-based state
```

👉 Think:

```id="n3p7ty"
Redux = App-wide state architecture
```

---

## 🛠️ Step 1 — Multiple Slices

### userSlice.ts

```ts id="n4x9rm"
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { name: "" },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
```

---

### counterSlice.ts

```ts id="d8k2vx"
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  }
});
```

---

## ⚙️ Step 2 — Combine Reducers

```ts id="m3p7yt"
import userReducer from "./userSlice";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer
  }
});
```

---

## 🚀 Step 3 — Async Logic (createAsyncThunk)

```ts id="r6k2nx"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async () => {
    const res = await fetch("/api/users");
    return res.json();
  }
);
```

---

## 🧩 Step 4 — Handle Async States

```ts id="p5x9lm"
const userSlice = createSlice({
  name: "user",
  initialState: { users: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });
  }
});
```

---

## 🔗 Step 5 — Dispatch Async Action

```tsx id="k1v7zx"
useEffect(() => {
  dispatch(fetchUsers());
}, []);
```

---

## ⚡ Step 6 — Middleware Concept

```id="q9m2rt"
Action → Middleware → Reducer
```

👉 Redux Toolkit includes:

```id="y4k8xp"
- Thunk middleware (async support)
```

---

## 🔍 Step 7 — Redux DevTools

👉 Use:

Redux DevTools

Features:

```id="t9k2rx"
- View actions
- Inspect state
- Time travel debugging
```

---

## 📊 Step 8 — State Flow (Async)

```id="k8z4xp"
dispatch(fetchUsers)
 → pending
 → fulfilled
 → state updated
```

---

## 🧪 Step 9 — Run & Verify

```bash id="m7p3nx"
npm run dev
```

Test:

* API call triggered
* Loading state
* Data rendered

---

## 📌 LEVEL-2 SUMMARY

You learned:

* Multiple slices
* Async actions
* Middleware basics
* Redux DevTools
* Real app structure

---

## 🧠 Expert Takeaways (Trainer Ready)

* Split state by feature (slices)
* Async logic handled via createAsyncThunk
* Middleware enables powerful flows
* DevTools improve debugging
* Redux scales well for large apps

---

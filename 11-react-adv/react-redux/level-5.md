# 🚀 LEVEL-5: Redux Toolkit Query (RTK Query) & Server State (Mastery)

## 🎯 Learning Goal

By the end of this level, you will:

* Use RTK Query for API handling
* Manage server state efficiently
* Implement caching & invalidation
* Reduce boilerplate code
* Build production-ready data layer

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier (createAsyncThunk):

```id="k1m9qp"
Manual loading + API + state handling
```

👉 Now (RTK Query):

```id="p7x3zt"
Define API → Auto caching → Auto loading → Auto refetch
```

👉 Think:

```id="n3p7ty"
RTK Query = Data layer for Redux
```

---

## 🛠️ Step 1 — Create API Slice

### src/features/api/apiSlice.ts

```ts id="n4x9rm"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users"
    })
  })
});
```

---

## ⚙️ Step 2 — Add to Store

```ts id="d8k2vx"
import { api } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});
```

---

## 🔗 Step 3 — Use Query Hook

```tsx id="m3p7yt"
import { api } from "./apiSlice";

const { data, isLoading } = api.useGetUsersQuery();
```

---

## 🧩 Step 4 — Render Data

```tsx id="r6k2nx"
if (isLoading) return <p>Loading...</p>;

return (
  <ul>
    {data.map((u: any) => (
      <li key={u.id}>{u.name}</li>
    ))}
  </ul>
);
```

---

## 🚀 Step 5 — Mutations (POST)

```ts id="p5x9lm"
addUser: builder.mutation({
  query: (user) => ({
    url: "/users",
    method: "POST",
    body: user
  })
})
```

---

## 🔁 Step 6 — Use Mutation

```tsx id="k1v7zx"
const [addUser] = api.useAddUserMutation();

addUser({ name: "Nag" });
```

---

## ⚡ Step 7 — Caching & Invalidation

```ts id="q9m2rt"
providesTags: ["Users"],
invalidatesTags: ["Users"]
```

---

## 🔍 Step 8 — Auto Refetch

```id="y4k8xp"
Mutation → invalidate → query auto-refetch
```

---

## 📦 Step 9 — Benefits

```id="t9k2rx"
- No manual loading state
- No reducers needed
- Built-in caching
- Automatic refetching
```

---

## 🧪 Step 10 — Run & Verify

```bash id="k8z4xp"
npm run dev
```

Test:

* Data fetching
* Loading state
* Mutation + auto refresh

---

## 📌 LEVEL-5 SUMMARY

You learned:

* RTK Query basics
* API slice creation
* Query & mutation hooks
* Caching & invalidation
* Server state management

---

## 🧠 Expert Takeaways (Trainer Ready)

* RTK Query replaces most async Redux logic
* Server state ≠ UI state
* Caching improves performance automatically
* Less boilerplate → faster development
* Modern Redux = RTK + RTK Query

---

## 🎯 FINAL OUTCOME

You can now:

* Build scalable Redux architectures
* Manage server state efficiently
* Replace createAsyncThunk with RTK Query
* Implement caching and refetching
* Design production-ready data layers

---

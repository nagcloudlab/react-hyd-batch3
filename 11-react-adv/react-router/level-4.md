# 🚀 LEVEL-4: Authentication, Protected Routes & Production Patterns

## 🎯 Learning Goal

By the end of this level, you will:

* Protect routes (authentication)
* Implement redirect logic
* Handle sessions (basic)
* Use middleware-like patterns
* Understand production routing flows

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="n4x1qp"
Route → loader → render
```

👉 Now:

```id="z7k3tm"
Route → loader (auth check) → allow / redirect
```

👉 Think like:

```id="p2m8wr"
Loader = Middleware
```

---

## 🛠️ Step 1 — Create Auth Utility

### Create: app/utils/auth.ts

```ts id="c8v2kx"
export async function requireAuth(request: Request) {
  const isLoggedIn = false; // simulate auth

  if (!isLoggedIn) {
    throw new Response("Unauthorized", { status: 401 });
  }

  return true;
}
```

---

## 🔒 Step 2 — Protect Dashboard Route

### Update: app/routes/dashboard.tsx

```tsx id="y5r9ld"
import { Outlet, Link } from "react-router";
import { requireAuth } from "../utils/auth";

export async function loader({ request }: any) {
  await requireAuth(request);
  return null;
}

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>

      <nav>
        <Link to="/dashboard">Home</Link> |{" "}
        <Link to="/dashboard/courses">Courses</Link>
      </nav>

      <Outlet />
    </div>
  );
}
```

---

## 🔁 Step 3 — Redirect Instead of Error

### Update auth.ts

```ts id="d3w7qn"
import { redirect } from "react-router";

export async function requireAuth(request: Request) {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    throw redirect("/login");
  }

  return true;
}
```

---

## 🔐 Step 4 — Create Login Page

### Create: app/routes/login.tsx

```tsx id="u8k4xp"
import { Form } from "react-router";

export async function action() {
  console.log("User logged in");
  return null;
}

export default function Login() {
  return (
    <div>
      <h3>Login</h3>

      <Form method="post">
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
```

---

## 📦 Step 5 — Register Route

### Update routes.ts

```ts id="m1q9cz"
route("/login", "routes/login.tsx"),
```

---

## 🔗 Step 6 — Add Navigation

### Update root.tsx

```tsx id="k7r2vx"
<Link to="/login">Login</Link>
```

---

## 🧠 Step 7 — What Just Happened?

* Loader acts like middleware
* If not authenticated → redirect to login
* Routes are protected before rendering
* No UI-level checks required

---

## ⚙️ Step 8 — Session Simulation (Basic)

```ts id="h2v6yt"
let isLoggedIn = false;

export function login() {
  isLoggedIn = true;
}

export function logout() {
  isLoggedIn = false;
}
```

---

## ⚡ Step 9 — Logout Example

```tsx id="f9m3xr"
<button onClick={() => logout()}>
  Logout
</button>
```

---

## 🧪 Step 10 — Run & Verify

```bash id="g4k8zn"
npm run dev
```

Test:

* /dashboard → redirects to /login
* /login → login page
* After login → access dashboard

---

## 📌 LEVEL-4 SUMMARY

You learned:

* Route protection using loaders
* Redirect handling
* Authentication flow
* Middleware-like logic
* Session basics

---

## 🧠 Expert Takeaways (Trainer Ready)

* Loaders act as backend middleware
* Route protection happens before render
* Redirects are first-class citizens
* Auth logic is centralized
* No need for complex guards like older React

---

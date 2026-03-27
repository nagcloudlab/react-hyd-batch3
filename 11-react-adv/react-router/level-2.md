# 🚀 LEVEL-2: Nested Routing & Dynamic Routes (React Router v7)

## 🎯 Learning Goal

By the end of this level, you will:

* Understand nested routing
* Create layout-based routes
* Implement dynamic routes (`:id`)
* Navigate between nested pages
* Build a dashboard-style structure

---

## 🧠 Step 0 — Mental Model Upgrade

👉 In Level-1:

```id="y2xk3p"
URL → Page
```

👉 Now (Level-2):

```id="u8k1zr"
URL → Layout → Nested Page
```

Example:

```id="l0c9xm"
/dashboard → Dashboard Layout
/dashboard/courses → Courses Page inside Dashboard
```

---

## 🛠️ Step 1 — Create New Files

```id="z3kq9n"
app/routes/dashboard.tsx
app/routes/dashboard.home.tsx
app/routes/dashboard.courses.tsx
app/routes/dashboard.courses.$id.tsx
```

---

## 📦 Step 2 — Update routes.ts

```ts id="k2v9dx"
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),

  route("/dashboard", "routes/dashboard.tsx", [
    index("routes/dashboard.home.tsx"),
    route("courses", "routes/dashboard.courses.tsx"),
    route("courses/:id", "routes/dashboard.courses.$id.tsx"),
  ]),
];
```

---

## 🧩 Step 3 — Dashboard Layout

### app/routes/dashboard.tsx

```tsx id="p9m4qs"
import { Outlet, Link } from "react-router";

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

## 🏠 Step 4 — Dashboard Home

### app/routes/dashboard.home.tsx

```tsx id="v7q2lm"
export default function DashboardHome() {
  return <h3>Dashboard Home</h3>;
}
```

---

## 📚 Step 5 — Courses List

### app/routes/dashboard.courses.tsx

```tsx id="n5w8jx"
import { Link } from "react-router";

export default function Courses() {
  return (
    <div>
      <h3>Courses</h3>

      <ul>
        <li><Link to="1">Course 1</Link></li>
        <li><Link to="2">Course 2</Link></li>
      </ul>
    </div>
  );
}
```

---

## 🔍 Step 6 — Dynamic Route (Course Details)

### app/routes/dashboard.courses.$id.tsx

```tsx id="d4x7bn"
import { useParams } from "react-router";

export default function CourseDetail() {
  const { id } = useParams();

  return <h4>Course Details for ID: {id}</h4>;
}
```

---

## 🔗 Step 7 — Navigation Flow

```id="q1r8yt"
/dashboard → Dashboard Home
/dashboard/courses → Courses List
/dashboard/courses/1 → Course Detail
```

---

## 🧠 What Just Happened?

* Dashboard acts as a layout
* Nested routes render inside `<Outlet />`
* Dynamic routes capture URL params
* Navigation is relative (`to="1"`)

---

## ⚙️ Step 8 — Key Concepts

### Nested Routing

```id="t9k3wv"
Parent → Layout
Child → Rendered inside Outlet
```

---

### Dynamic Routing

```id="m6p2dz"
: id → URL parameter
useParams() → read value
```

---

## 🧪 Step 9 — Run & Verify

```bash id="r8y3ln"
npm run dev
```

Test:

* http://localhost:5173/dashboard
* http://localhost:5173/dashboard/courses
* http://localhost:5173/dashboard/courses/1

---

## 📌 LEVEL-2 SUMMARY

You learned:

* Nested routing
* Layout-based design
* Dynamic routing (`:id`)
* URL parameter handling
* Dashboard structure

---

## 🧠 Expert Takeaways (Trainer Ready)

* Nested routes enable scalable UI layouts
* Layout components control page structure
* `<Outlet />` is key for composition
* Dynamic routes (`:id`) enable reusable pages
* Relative navigation simplifies routing

---

# 🚀 LEVEL-5: API Integration, Optimistic UI & Advanced Patterns

## 🎯 Learning Goal

By the end of this level, you will:

* Integrate real APIs (backend)
* Implement optimistic UI updates
* Use revalidation & caching
* Handle async UI with Suspense
* Build production-ready patterns

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="n7x3qm"
Loader → static/mock data
```

👉 Now:

```id="k2m9zp"
Loader → real API call → UI
Action → API mutation → revalidate
```

---

## 🛠️ Step 1 — Connect to API

### Update: app/routes/dashboard.courses.tsx

```tsx id="x4p8dn"
import { useLoaderData, Link } from "react-router";

export async function loader() {
  const res = await fetch("http://localhost:8080/api/courses");
  return res.json();
}

export default function Courses() {
  const courses = useLoaderData();

  return (
    <div>
      <h3>Courses</h3>

      <ul>
        {courses.map((c: any) => (
          <li key={c.id}>
            <Link to={c.id}>{c.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🔄 Step 2 — Action with API (POST)

### Update: dashboard.add-course.tsx

```tsx id="q9m2xt"
import { Form, redirect } from "react-router";

export async function action({ request }: any) {
  const formData = await request.formData();
  const title = formData.get("title");

  await fetch("http://localhost:8080/api/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return redirect("/dashboard/courses");
}

export default function AddCourse() {
  return (
    <div>
      <h3>Add Course</h3>

      <Form method="post">
        <input name="title" placeholder="Course Title" />
        <button type="submit">Add</button>
      </Form>
    </div>
  );
}
```

---

## ⚡ Step 3 — Optimistic UI

```tsx id="v3k7zp"
import { useNavigation } from "react-router";

const navigation = useNavigation();

const isSubmitting = navigation.state === "submitting";

<button disabled={isSubmitting}>
  {isSubmitting ? "Adding..." : "Add"}
</button>
```

---

## 🔁 Step 4 — Revalidation

👉 Automatically happens after action

Manual revalidation:

```tsx id="p6x2nm"
import { useRevalidator } from "react-router";

const { revalidate } = useRevalidator();

<button onClick={() => revalidate()}>
  Refresh
</button>
```

---

## ⏳ Step 5 — Pending UI (Loading State)

```tsx id="m1z9qt"
import { useNavigation } from "react-router";

const navigation = useNavigation();

if (navigation.state === "loading") {
  return <p>Loading data...</p>;
}
```

---

## 🧠 Step 6 — Suspense (Streaming UI)

```tsx id="y4w8kd"
import { Suspense } from "react";

<Suspense fallback={<p>Loading...</p>}>
  <Courses />
</Suspense>
```

---

## 📡 Step 7 — API Structure (Backend Example)

```id="t9k2rx"
GET    /api/courses
POST   /api/courses
GET    /api/courses/:id
```

---

## 🏗️ Step 8 — Production Pattern

```id="d7m5qp"
Route
 ├── loader → fetch data
 ├── component → render UI
 ├── action → mutate data
 └── revalidation → sync UI
```

---

## 🧪 Step 9 — Run & Verify

```bash id="k8z4xp"
npm run dev
```

Test:

* /dashboard/courses
* /dashboard/add-course
* Add new course → redirect → list updated

---

## 📌 LEVEL-5 SUMMARY

You learned:

* API integration using loaders/actions
* POST operations via actions
* Optimistic UI patterns
* Revalidation & refresh
* Suspense for async UI

---

## 🧠 Expert Takeaways (Trainer Ready)

* React Router replaces data layer libraries in many cases
* Loaders + Actions = Full-stack capability
* Optimistic UI improves UX significantly
* Revalidation keeps UI consistent
* Router becomes the central orchestrator

---

## 🎯 FINAL OUTCOME

You can now build:

* Full-stack React apps
* Dashboard systems
* Auth-enabled applications
* API-driven UIs
* Production-ready architectures

---

# 🚀 LEVEL-3: Data Loading, Actions & Full-Stack Patterns (React Router v7)

## 🎯 Learning Goal

By the end of this level, you will:

* Fetch data using loaders
* Handle form submissions using actions
* Understand full-stack behavior in React Router
* Manage loading states
* Handle errors properly

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="k1m9qx"
Component → useEffect → fetch()
```

👉 Now:

```id="b8r2vz"
Route → loader() → data ready before render
```

👉 Forms:

```id="n3p7ty"
Form → action() → server-like handling
```

---

## 🛠️ Step 1 — Add Loader (Data Fetching)

### Update: app/routes/dashboard.courses.tsx

```tsx id="u6k2wd"
import { useLoaderData, Link } from "react-router";

export async function loader() {
  return [
    { id: "1", title: "React Basics" },
    { id: "2", title: "Advanced React" }
  ];
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

## 🔍 Step 2 — Loader for Dynamic Route

### Update: app/routes/dashboard.courses.$id.tsx

```tsx id="z4x8lp"
import { useLoaderData } from "react-router";

export async function loader({ params }: any) {
  return {
    id: params.id,
    title: `Course ${params.id}`
  };
}

export default function CourseDetail() {
  const course = useLoaderData();

  return <h4>{course.title}</h4>;
}
```

---

## 🧾 Step 3 — Add Form + Action

### Create: app/routes/dashboard.add-course.tsx

```tsx id="m2p9cv"
import { Form } from "react-router";

export async function action({ request }: any) {
  const formData = await request.formData();
  const title = formData.get("title");

  console.log("New Course:", title);

  return null;
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

## 📦 Step 4 — Register Route

### Update routes.ts

```ts id="g5y7rt"
route("/dashboard/add-course", "routes/dashboard.add-course.tsx"),
```

---

## 🔄 Step 5 — Add Navigation

### Update dashboard.tsx

```tsx id="p3w8nl"
<Link to="/dashboard/add-course">Add Course</Link>
```

---

## 🧠 Step 6 — What Just Happened?

* Loader runs BEFORE component renders
* Data is available instantly
* Form submission triggers action()
* No manual fetch or state handling required

---

## ⚙️ Step 7 — Loading State

```tsx id="k9z4qx"
import { useNavigation } from "react-router";

const navigation = useNavigation();

if (navigation.state === "loading") {
  return <p>Loading...</p>;
}
```

---

## ❌ Step 8 — Error Handling

### Add error boundary

```tsx id="r7n3vm"
export function ErrorBoundary({ error }: any) {
  return <h3>Error: {error.message}</h3>;
}
```

---

## 🧪 Step 9 — Run & Verify

```bash id="t2v6ka"
npm run dev
```

Test:

* /dashboard/courses
* /dashboard/courses/1
* /dashboard/add-course

---

## 📌 LEVEL-3 SUMMARY

You learned:

* Loaders for data fetching
* Actions for form handling
* Full-stack routing behavior
* Loading states
* Error boundaries

---

## 🧠 Expert Takeaways (Trainer Ready)

* React Router replaces useEffect for data fetching
* Loaders ensure data-first rendering
* Actions enable backend-like behavior
* Forms integrate seamlessly with routing
* Router handles state, loading, and errors centrally

---

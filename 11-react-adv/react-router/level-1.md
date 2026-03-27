# 🚀 LEVEL-1: Creating a React App with React Router v7 (FOUNDATION)

## 🎯 Learning Goal

By the end of this level, you will:

* Create a React app using React Router v7 (framework mode)
* Understand project structure
* Run your first app
* Understand what React Router is actually doing

---

## 🧠 Step 0 — Mental Model (VERY IMPORTANT)

Before coding, understand this:

👉 React alone = UI rendering
👉 React Router = Navigation + App Structure

Think like:

```
React = Components
React Router = Pages + URL mapping
```

React Router v7 is not just routing anymore
👉 It behaves like a mini full-stack framework

---

## 🛠️ Step 1 — Create App (Modern Way)

### ✅ Use official CLI

```bash
npm create react-router@latest my-app
```

OR

```bash
npx create-react-router@latest my-app
```

👉 This creates a pre-configured app with Vite + Router

---

## 📂 Go inside project

```bash
cd my-app
npm install
npm run dev
```

👉 Open browser:

```
http://localhost:5173
```

---

## 📦 Step 2 — Understand Project Structure

```
my-app/
├── app/
│   ├── routes/
│   ├── root.tsx
│   └── routes.ts
├── package.json
├── vite.config.ts
```

---

## 🔍 Key Files Explained

### 1️⃣ app/root.tsx (ROOT LAYOUT)

👉 This is your main layout (like App.js in old React)

```tsx
import { Outlet } from "react-router";

export default function Root() {
  return (
    <html>
      <body>
        <h1>My App</h1>
        <Outlet />
      </body>
    </html>
  );
}
```

💡 Concept:
`<Outlet />` = where child pages render

---

### 2️⃣ app/routes.ts (ROUTING CONFIG)

```ts
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),
];
```

👉 This maps:

| URL      | File      |
| -------- | --------- |
| `/`      | home.tsx  |
| `/about` | about.tsx |

---

### 3️⃣ app/routes/ folder

👉 Each file = a page

```
routes/
├── home.tsx
├── about.tsx
```

---

## 🧩 Step 3 — Create Your First Page

### Create: app/routes/home.tsx

```tsx
export default function Home() {
  return <h2>Home Page</h2>;
}
```

---

### Create: app/routes/about.tsx

```tsx
export default function About() {
  return <h2>About Page</h2>;
}
```

---

## 🔗 Step 4 — Navigation (VERY BASIC)

Update root.tsx

```tsx
import { Outlet, Link } from "react-router";

export default function Root() {
  return (
    <html>
      <body>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/about">About</Link>
        </nav>

        <Outlet />
      </body>
    </html>
  );
}
```

---

## 🧠 What Just Happened?

👉 When you click:

* `/` → loads home.tsx
* `/about` → loads about.tsx

👉 React Router handles navigation WITHOUT page reload

---

## ⚙️ Step 5 — Behind the Scenes (Trainer Insight)

React Router v7 internally:

* Uses Vite for bundling
* Supports:

  * SPA
  * SSR
  * Streaming
* Generates:

  * client build
  * server build

---

## 🔥 Step 6 — Why This Approach is NEW

### ❌ Old way (React Router v6)

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>
```

---

### ✅ New way (v7)

* File-based routing
* Framework style
* Cleaner + scalable

---

## 🧪 Step 7 — Run + Verify

```bash
npm run dev
```

Test:

* http://localhost:5173/
* http://localhost:5173/about

---

## 📌 LEVEL-1 SUMMARY

You learned:

* How to create React Router v7 app
* Folder structure
* Routing config
* Navigation
* Layout concept (`Outlet`)

---

## 🧠 Expert Takeaways (Trainer Ready)

* React Router v7 is not just routing — it’s a framework
* Routing is now file-based + config-based
* `root.tsx` = layout controller
* `routes.ts` = routing map
* `<Outlet />` = rendering placeholder
* CLI (create-react-router) saves setup time

---

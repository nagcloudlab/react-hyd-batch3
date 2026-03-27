# 🚀 LEVEL-3: Advanced Forms (Async Validation, Debounce, React Hook Form)

## 🎯 Learning Goal

By the end of this level, you will:

* Perform async validation (API-based)
* Implement debouncing
* Optimize form performance
* Use React Hook Form (industry standard)
* Handle large forms efficiently

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="k2m8qp"
Validation → local function
```

👉 Now:

```id="p7x3zt"
Validation → API call → async response
```

---

## 🛠️ Step 1 — Async Validation (Username Check)

```tsx id="n4x9rm"
async function validateUsername(username: string) {
  const res = await fetch(`/api/check-username?u=${username}`);
  const data = await res.json();
  return data.available;
}
```

---

## 🔁 Step 2 — Use Async Validation

```tsx id="d8k2vx"
async function handleBlur(e: any) {
  const { name, value } = e.target;

  if (name === "username") {
    const available = await validateUsername(value);

    setErrors((prev: any) => ({
      ...prev,
      username: available ? "" : "Username already taken"
    }));
  }
}
```

---

## ⏱️ Step 3 — Debouncing (Avoid Too Many API Calls)

```tsx id="m3p7yt"
import { useEffect } from "react";

useEffect(() => {
  const timeout = setTimeout(() => {
    if (form.username) {
      validateUsername(form.username).then((available) => {
        setErrors((prev: any) => ({
          ...prev,
          username: available ? "" : "Username taken"
        }));
      });
    }
  }, 500);

  return () => clearTimeout(timeout);
}, [form.username]);
```

---

## ⚡ Step 4 — Performance Problem

👉 Controlled forms cause:

```id="z9x4qp"
Every keystroke → re-render
```

👉 Solution:

* Use libraries
* Use uncontrolled inputs

---

## 🚀 Step 5 — React Hook Form (Best Practice)

Install:

```bash id="r6k2nx"
npm install react-hook-form
```

---

## 🧩 Step 6 — Basic Example

```tsx id="p5x9lm"
import { useForm } from "react-hook-form";

export default function FormExample() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <input {...register("email")} />

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 🔍 Step 7 — Validation with React Hook Form

```tsx id="k1v7zx"
<input
  {...register("email", {
    required: "Email required",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "Invalid email"
    }
  })}
/>
```

---

## ⚠️ Step 8 — Show Errors

```tsx id="q9m2rt"
const { register, handleSubmit, formState: { errors } } = useForm();

{errors.email && <p>{errors.email.message}</p>}
```

---

## 🔄 Step 9 — Controlled + RHF (Advanced)

```tsx id="y4k8xp"
import { Controller, useForm } from "react-hook-form";

<Controller
  name="name"
  control={control}
  render={({ field }) => <input {...field} />}
/>
```

---

## 🧪 Step 10 — Run & Verify

```bash id="t8p3nx"
npm run dev
```

Test:

* Async username validation
* Debounced API calls
* Form submission
* Error handling

---

## 📌 LEVEL-3 SUMMARY

You learned:

* Async validation
* Debouncing
* Performance optimization
* React Hook Form basics
* Advanced form handling

---

## 🧠 Expert Takeaways (Trainer Ready)

* Async validation is critical in real apps
* Debouncing prevents API overload
* Controlled forms don’t scale well
* React Hook Form improves performance
* Libraries reduce boilerplate significantly

---

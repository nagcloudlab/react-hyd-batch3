# 🚀 LEVEL-2: Form Validation & Real-World Patterns

## 🎯 Learning Goal

By the end of this level, you will:

* Implement form validation
* Handle error messages
* Build reusable input handlers
* Structure forms for real applications

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="k1x9qp"
Input → State
```

👉 Now:

```id="m4z7ty"
Input → State → Validation → Errors → UI
```

---

## 🛠️ Step 1 — Add Validation State

```tsx id="p8x2rm"
import { useState } from "react";

export default function FormExample() {
  const [form, setForm] = useState({
    name: "",
    email: ""
  });

  const [errors, setErrors] = useState<any>({});
}
```

---

## 🧩 Step 2 — Validation Function

```tsx id="n3k7vx"
function validate(form: any) {
  const errors: any = {};

  if (!form.name) {
    errors.name = "Name is required";
  }

  if (!form.email.includes("@")) {
    errors.email = "Invalid email";
  }

  return errors;
}
```

---

## 🧾 Step 3 — Handle Submit with Validation

```tsx id="d9w2pl"
function handleSubmit(e: any) {
  e.preventDefault();

  const validationErrors = validate(form);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  console.log("Form Submitted:", form);
}
```

---

## 🔗 Step 4 — Show Errors in UI

```tsx id="q4z8tm"
<input name="name" onChange={handleChange} />
{errors.name && <p>{errors.name}</p>}

<input name="email" onChange={handleChange} />
{errors.email && <p>{errors.email}</p>}
```

---

## 🔁 Step 5 — Reusable Change Handler

```tsx id="v7m1yt"
function handleChange(e: any) {
  const { name, value } = e.target;

  setForm((prev: any) => ({
    ...prev,
    [name]: value
  }));
}
```

---

## ⚡ Step 6 — Real-World Form Structure

```tsx id="k6p3zx"
<form onSubmit={handleSubmit}>
  <div>
    <label>Name</label>
    <input name="name" onChange={handleChange} />
    {errors.name && <p>{errors.name}</p>}
  </div>

  <div>
    <label>Email</label>
    <input name="email" onChange={handleChange} />
    {errors.email && <p>{errors.email}</p>}
  </div>

  <button type="submit">Submit</button>
</form>
```

---

## ⚙️ Step 7 — Validate on Change (Optional)

```tsx id="m9x2qr"
function handleChange(e: any) {
  const { name, value } = e.target;

  const updatedForm = {
    ...form,
    [name]: value
  };

  setForm(updatedForm);
  setErrors(validate(updatedForm));
}
```

---

## 🧪 Step 8 — Run & Verify

```bash id="z2p8nx"
npm run dev
```

Test:

* Empty submit → show errors
* Invalid email → show error
* Valid input → submit success

---

## 📌 LEVEL-2 SUMMARY

You learned:

* Form validation logic
* Error handling
* Dynamic error display
* Reusable handlers
* Real-world form structure

---

## 🧠 Expert Takeaways (Trainer Ready)

* Validation should be centralized (`validate()` function)
* Errors should be part of state
* UI reflects validation state
* Reusable handlers reduce boilerplate
* Structure matters for scalability

---

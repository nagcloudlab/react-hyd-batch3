# 🚀 LEVEL-4: Enterprise Forms (Dynamic Fields, Field Arrays, Multi-Step Forms)

## 🎯 Learning Goal

By the end of this level, you will:

* Handle dynamic form fields
* Use field arrays (add/remove rows)
* Build multi-step (wizard) forms
* Structure large-scale forms
* Integrate validation schemas (Zod/Yup)

---

## 🧠 Step 0 — Mental Model Upgrade

👉 Earlier:

```id="k3m9qp"
Simple Form → Few Fields
```

👉 Now:

```id="p8x2zt"
Dynamic Form → Arrays + Steps + Validation
```

---

## 🛠️ Step 1 — Install Dependencies

```bash id="n7x4rm"
npm install react-hook-form zod @hookform/resolvers
```

---

## 📚 Step 2 — Field Arrays (Dynamic Inputs)

```tsx id="d5k2vx"
import { useForm, useFieldArray } from "react-hook-form";

export default function FormExample() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      skills: [{ name: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`skills.${index}.name`)} />

          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={() => append({ name: "" })}>
        Add Skill
      </button>

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 🧾 Step 3 — Validation with Zod

```tsx id="m9x3pl"
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
});
```

---

## 🔗 Step 4 — Connect Zod with React Hook Form

```tsx id="q2z8tm"
import { zodResolver } from "@hookform/resolvers/zod";

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
```

---

## ⚠️ Step 5 — Show Errors

```tsx id="v6m1yt"
<input {...register("email")} />
{errors.email && <p>{errors.email.message}</p>}
```

---

## 🔄 Step 6 — Multi-Step Form (Wizard)

```tsx id="k7p3zx"
import { useState } from "react";

const [step, setStep] = useState(1);

{step === 1 && <input {...register("name")} />}
{step === 2 && <input {...register("email")} />}

<button onClick={() => setStep(step + 1)}>Next</button>
```

---

## 🧩 Step 7 — Preserve Data Across Steps

```tsx id="m1x9qr"
useForm({
  shouldUnregister: false
});
```

---

## ⚡ Step 8 — Real-World Structure

```id="z4k2qp"
Form
 ├── Step 1 (Basic Info)
 ├── Step 2 (Details)
 ├── Step 3 (Review)
 └── Submit
```

---

## 🧠 Step 9 — Large Form Pattern

```id="t8m5wv"
Form Container
 ├── Form Sections
 ├── Reusable Inputs
 ├── Validation Layer
 └── API Integration
```

---

## 🧪 Step 10 — Run & Verify

```bash id="r2y3ln"
npm run dev
```

Test:

* Add/remove fields
* Validation errors
* Multi-step navigation
* Final submission

---

## 📌 LEVEL-4 SUMMARY

You learned:

* Dynamic fields using useFieldArray
* Schema validation (Zod)
* Multi-step forms
* Large form architecture
* Enterprise patterns

---

## 🧠 Expert Takeaways (Trainer Ready)

* Field arrays are essential for dynamic forms
* Schema validation ensures consistency
* Multi-step forms improve UX
* Form structure must scale with complexity
* React Hook Form + Zod = production standard

---

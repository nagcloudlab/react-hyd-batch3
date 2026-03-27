import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ============================================
// LEVEL 4: Dynamic Fields, Multi-Step & Zod
// ============================================

// -------- Part A: Field Arrays --------

function FieldArrayDemo() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: { skills: [{ name: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  function onSubmit(data) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Part A — Dynamic Fields (useFieldArray)
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Add/remove skill fields dynamically. Great for lists, addresses, phone
        numbers etc.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
        <div className="space-y-2 mb-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`skills.${index}.name`)}
                placeholder={`Skill ${index + 1}`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => append({ name: "" })}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            + Add Skill
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// -------- Part B: Zod + RHF --------

const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.coerce.number().min(18, "Must be 18 or older"),
});

function ZodValidationDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  function onSubmit(data) {
    alert(`Valid!\n${JSON.stringify(data, null, 2)}`);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Part B — Zod Schema Validation
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Define validation rules once in a Zod schema. Single source of truth for
        frontend + backend.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            {...register("age")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Register
        </button>
      </form>
    </div>
  );
}

// -------- Part C: Multi-Step Wizard --------

const steps = ["Basic Info", "Details", "Review"];

function MultiStepDemo() {
  const [step, setStep] = useState(0);
  const { register, handleSubmit, watch } = useForm({
    shouldUnregister: false,
  });

  const formData = watch();

  function onSubmit(data) {
    alert(`Final Submit!\n${JSON.stringify(data, null, 2)}`);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Part C — Multi-Step Wizard Form
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        3-step form with data preserved across steps via{" "}
        <code className="bg-gray-100 px-1 rounded text-sm">
          shouldUnregister: false
        </code>
      </p>

      {/* Step indicator */}
      <div className="flex gap-2 mb-6">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i === step
                  ? "bg-indigo-600 text-white"
                  : i < step
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i < step ? "✓" : i + 1}
            </span>
            <span
              className={`text-sm ${
                i === step ? "text-gray-900 font-medium" : "text-gray-400"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <div className="w-8 h-px bg-gray-300 mx-1" />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
        {/* Step 1 */}
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...register("fullName")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register("email")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                {...register("company")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                {...register("role")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                <option value="">Select role</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3 - Review */}
        {step === 2 && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Review your data:
            </h4>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-2 mt-6">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              ← Back
            </button>
          )}
          {step < 2 && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
            >
              Next →
            </button>
          )}
          {step === 2 && (
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default function Level4_DynamicMultiStepZod() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Level 4 — Dynamic Fields, Multi-Step & Zod
      </h2>
      <p className="text-gray-500 mb-6">
        Enterprise patterns: field arrays, schema validation, wizard forms
      </p>

      <div className="space-y-6">
        <FieldArrayDemo />
        <ZodValidationDemo />
        <MultiStepDemo />
      </div>
    </div>
  );
}

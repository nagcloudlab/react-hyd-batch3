import { useState } from "react";

// ============================================
// LEVEL 2: Form Validation & Error Handling
// ============================================

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required";
  }

  if (!form.email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}

export default function Level2_ValidationErrors() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // Clear error for the field being edited
    if (errors[name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(false);

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitted(true);
    console.log("Form Submitted:", form);
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Level 2 — Form Validation & Error Handling
      </h2>
      <p className="text-gray-500 mb-6">
        Centralized validate() function, error state, real-time error clearing
      </p>

      <div className="max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg outline-none border ${
                  errors.name
                    ? "border-red-400 focus:ring-2 focus:ring-red-300"
                    : "border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                }`}
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg outline-none border ${
                  errors.email
                    ? "border-red-400 focus:ring-2 focus:ring-red-300"
                    : "border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                }`}
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg outline-none border ${
                  errors.password
                    ? "border-red-400 focus:ring-2 focus:ring-red-300"
                    : "border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                }`}
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Register
            </button>

            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                Form submitted successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// ============================================
// LEVEL 3: Async Validation, Debounce & React Hook Form
// ============================================

// Simulated API — "admin", "test", "user", "root" are taken
function checkUsername(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const taken = ["admin", "test", "user", "root"];
      resolve(!taken.includes(username.toLowerCase()));
    }, 800);
  });
}

// -------- Part A: Async + Debounce --------

function AsyncDebounceDemo() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!username.trim()) {
      setStatus("");
      return;
    }
    setStatus("checking");
    const timeout = setTimeout(() => {
      checkUsername(username).then((available) => {
        setStatus(available ? "available" : "taken");
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [username]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Part A — Async Validation + Debounce
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Type a username. <code className="bg-gray-100 px-1 rounded">admin</code>,{" "}
        <code className="bg-gray-100 px-1 rounded">test</code>,{" "}
        <code className="bg-gray-100 px-1 rounded">user</code>,{" "}
        <code className="bg-gray-100 px-1 rounded">root</code> are taken. API is
        debounced by 500ms.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <div className="relative">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="try 'admin' or 'hello'"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none pr-36"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
            {status === "checking" && (
              <span className="text-gray-400">Checking...</span>
            )}
            {status === "available" && (
              <span className="text-green-600 font-medium">
                ✓ Available
              </span>
            )}
            {status === "taken" && (
              <span className="text-red-500 font-medium">
                ✗ Already taken
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

// -------- Part B: React Hook Form --------

function ReactHookFormDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Part B — React Hook Form (Uncontrolled, Performant)
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        No <code className="bg-gray-100 px-1 rounded">useState</code> needed.
        RHF uses uncontrolled inputs internally → fewer re-renders.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
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
            {...register("age", {
              min: { value: 18, message: "Must be 18+" },
            })}
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
          Submit
        </button>
      </form>
    </div>
  );
}

export default function Level3_AsyncDebounceRHF() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Level 3 — Async Validation, Debounce & React Hook Form
      </h2>
      <p className="text-gray-500 mb-6">
        Real-world patterns: API-based validation and performant form libraries
      </p>

      <div className="space-y-6">
        <AsyncDebounceDemo />
        <ReactHookFormDemo />
      </div>
    </div>
  );
}

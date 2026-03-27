import { useState, useRef } from "react";

// ============================================
// LEVEL 1: Controlled vs Uncontrolled Inputs
// ============================================

function ControlledForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Controlled → Name: ${name}, Email: ${email}`);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Controlled Form
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        React state is the single source of truth. Every keystroke updates state
        → triggers re-render.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Type your name..."
          />
          <p className="text-xs text-gray-400 mt-1">
            Live value: <span className="font-mono text-indigo-600">"{name}"</span>
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Type your email..."
          />
          <p className="text-xs text-gray-400 mt-1">
            Live value: <span className="font-mono text-indigo-600">"{email}"</span>
          </p>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    alert(
      `Uncontrolled → Name: ${nameRef.current.value}, Email: ${emailRef.current.value}`
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Uncontrolled Form
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        DOM owns the value. We only read it on submit via{" "}
        <code className="bg-gray-100 px-1 rounded text-sm">ref</code>. No
        re-renders on each keystroke.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            ref={nameRef}
            defaultValue=""
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Type your name..."
          />
          <p className="text-xs text-gray-400 mt-1">
            No live preview — value read only on submit
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            ref={emailRef}
            defaultValue=""
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Type your email..."
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default function Level1_ControlledVsUncontrolled() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Level 1 — Controlled vs Uncontrolled Inputs
      </h2>
      <p className="text-gray-500 mb-6">
        Compare two approaches to handling form inputs in React
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <ControlledForm />
        <UncontrolledForm />
      </div>
    </div>
  );
}

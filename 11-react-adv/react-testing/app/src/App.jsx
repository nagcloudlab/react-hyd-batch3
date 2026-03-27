import { useState } from "react";

// Level 1
import Hello from "./components/level1/Hello";
import Greeting from "./components/level1/Greeting";
// Level 2
import Counter from "./components/level2/Counter";
import InputBox from "./components/level2/InputBox";
import LoginForm from "./components/level2/LoginForm";
// Level 3
import Users from "./components/level3/Users";
// Level 4
import Button from "./components/level4/Button";
import TodoList from "./components/level4/TodoList";
// Level 5
import ContactForm from "./components/level5/ContactForm";

const levels = [
  {
    label: "L1: Basic Rendering",
    content: (
      <div className="space-y-6">
        <Card title="Hello" desc="Simplest component test — render + getByText">
          <Hello />
        </Card>
        <Card title="Greeting (props)" desc="Testing components that receive props">
          <Greeting name="Nag" />
        </Card>
      </div>
    ),
    tests: "level1/*.test.jsx",
    concepts: ["render()", "screen.getByText()", "screen.getByRole()", "expect().toBeInTheDocument()"],
  },
  {
    label: "L2: User Interactions",
    content: (
      <div className="space-y-6">
        <Card title="Counter" desc="Testing button clicks with userEvent.click()">
          <Counter />
        </Card>
        <Card title="InputBox" desc="Testing typing with userEvent.type()">
          <InputBox />
        </Card>
        <Card title="LoginForm" desc="Testing form submission flow">
          <LoginForm />
        </Card>
      </div>
    ),
    tests: "level2/*.test.jsx",
    concepts: ["userEvent.click()", "userEvent.type()", "getByLabelText()", "getByPlaceholderText()", "toHaveValue()"],
  },
  {
    label: "L3: Async & API Mocking",
    content: (
      <div className="space-y-6">
        <Card title="Users (API)" desc="Fetches from API — test with vi.mock() + findByText()">
          <Users />
        </Card>
      </div>
    ),
    tests: "level3/*.test.jsx",
    concepts: ["vi.mock()", "mockResolvedValue()", "mockRejectedValue()", "findByText() (async)", "Loading/Error states"],
  },
  {
    label: "L4: Enterprise Patterns",
    content: (
      <div className="space-y-6">
        <Card title="Button (vi.fn)" desc="Mock functions, disabled state, describe() blocks">
          <div className="flex gap-3">
            <Button label="Primary" onClick={() => alert("Clicked!")} />
            <Button label="Danger" variant="danger" />
            <Button label="Disabled" disabled />
          </div>
        </Card>
        <Card title="TodoList" desc="Full integration: add → toggle → delete">
          <TodoList />
        </Card>
      </div>
    ),
    tests: "level4/*.test.jsx",
    concepts: ["vi.fn()", "toHaveBeenCalledTimes()", "toBeDisabled()", "describe()", "queryByText() (null-safe)"],
  },
  {
    label: "L5: Full Flow Testing",
    content: (
      <div className="space-y-6">
        <Card title="ContactForm" desc="Complete flow: Fill → Submit → API → Success/Error">
          <ContactForm />
        </Card>
      </div>
    ),
    tests: "level5/*.test.jsx",
    concepts: [
      "Full user journey test",
      "Mock API success + failure",
      "Loading state assertion",
      "toHaveBeenCalledWith()",
      "Helper functions in tests",
    ],
  },
];

function Card({ title, desc, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{desc}</p>
      {children}
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(0);
  const level = levels[active];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            React Testing — Training Demo
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            UI in browser + run <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">npx vitest</code> in terminal
          </p>

          <div className="flex gap-2 mt-4 flex-wrap">
            {levels.map((l, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  active === i
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Components - 2/3 */}
          <div className="lg:col-span-2">{level.content}</div>

          {/* Sidebar - test info */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Run Tests</h3>
              <code className="block bg-gray-900 text-green-400 px-4 py-3 rounded-lg text-sm">
                npx vitest {level.tests}
              </code>
              <p className="text-xs text-gray-400 mt-2">
                Or run all: <code className="bg-gray-100 px-1 rounded">npx vitest</code>
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Key Concepts</h3>
              <ul className="space-y-2">
                {level.concepts.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-indigo-500 font-bold mt-0.5">›</span>
                    <code className="text-gray-700 bg-gray-50 px-1.5 py-0.5 rounded">
                      {c}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

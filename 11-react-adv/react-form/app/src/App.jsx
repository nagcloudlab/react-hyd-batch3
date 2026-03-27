import { useState } from "react";
import Level1 from "./components/Level1_ControlledVsUncontrolled";
import Level2 from "./components/Level2_ValidationErrors";
import Level3 from "./components/Level3_AsyncDebounceRHF";
import Level4 from "./components/Level4_DynamicMultiStepZod";
import Level5 from "./components/Level5_APIFileUpload";

const levels = [
  { label: "L1: Controlled vs Uncontrolled", component: Level1 },
  { label: "L2: Validation & Errors", component: Level2 },
  { label: "L3: Async + Debounce + RHF", component: Level3 },
  { label: "L4: Dynamic + MultiStep + Zod", component: Level4 },
  { label: "L5: API + File Upload", component: Level5 },
];

export default function App() {
  const [active, setActive] = useState(0);
  const ActiveComponent = levels[active].component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            React Forms — Training Demo
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Click a level to switch demos
          </p>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {levels.map((level, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  active === i
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <ActiveComponent />
      </main>
    </div>
  );
}

import { useState } from "react"
import "./App.css"
import CompoundComponentsPattern from "./components/CompoundComponentsPattern"
import RenderProps from "./components/RenderProps"
import HocPattern from "./components/HocPattern"
import CustomHooksPattern from "./components/CustomHooksPattern"
import ContainerPresentationalPattern from "./components/ContainerPresentationalPattern"
import StateReducerPattern from "./components/StateReducerPattern"
import MemoizationPattern from "./components/MemoizationPattern"
import CodeSplittingPattern from "./components/CodeSplittingPattern"
import ContextModulePattern from "./components/ContextModulePattern"
import LazyLoadingPattern from "./components/LazyLoadingPattern"
import SlotPattern from "./components/SlotPattern"

const patterns = [
  { id: "01", label: "Compound Components", component: <CompoundComponentsPattern />, category: "component" },
  { id: "02", label: "Render Props", component: <RenderProps />, category: "component" },
  { id: "03", label: "HOC", component: <HocPattern />, category: "component" },
  { id: "04", label: "Slot Pattern", component: <SlotPattern />, category: "component" },
  { id: "05", label: "Custom Hooks", component: <CustomHooksPattern />, category: "logic" },
  { id: "06", label: "Container / Presentational", component: <ContainerPresentationalPattern />, category: "logic" },
  { id: "07", label: "State Reducer", component: <StateReducerPattern />, category: "logic" },
  { id: "08", label: "Context Module", component: <ContextModulePattern />, category: "logic" },
  { id: "09", label: "Memoization", component: <MemoizationPattern />, category: "performance" },
  { id: "10", label: "Code Splitting", component: <CodeSplittingPattern />, category: "performance" },
  { id: "11", label: "Lazy Loading", component: <LazyLoadingPattern />, category: "performance" },
]

const categories = [
  { key: "component", label: "Component Patterns", color: "#3b82f6" },
  { key: "logic", label: "Logic Patterns", color: "#f59e0b" },
  { key: "performance", label: "Performance Patterns", color: "#10b981" },
]

function App() {
  const [active, setActive] = useState("01")
  const current = patterns.find((p) => p.id === active)

  return (
    <div className="app-layout">
      <header className="app-header">
        <div>
          <h1>React Design Patterns</h1>
          <div className="subtitle">11 patterns -- Problem vs Solution</div>
        </div>
        <div className="legend">
          {categories.map((c) => (
            <span key={c.key} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span className="legend-dot" style={{ background: c.color }} />
              {c.label.replace(" Patterns", "")}
            </span>
          ))}
        </div>
      </header>

      <aside className="sidebar">
        {categories.map((cat) => (
          <div key={cat.key} className="sidebar-group">
            <div className="sidebar-group-label">
              <span className="dot" style={{ background: cat.color }} />
              {cat.label}
            </div>
            {patterns.filter((p) => p.category === cat.key).map((p) => (
              <button
                key={p.id}
                className={`sidebar-item ${active === p.id ? `active active-${p.category}` : ""}`}
                onClick={() => setActive(p.id)}
              >
                <span className="num">{p.id}</span>
                {p.label}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <main className="pattern-content">
        {current?.component}
      </main>
    </div>
  )
}

export default App

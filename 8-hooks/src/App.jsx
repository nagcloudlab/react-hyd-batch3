import { useState } from 'react'
import UseCallback from "./components/UseCallback"
import UseContext from "./components/UseContext"
import UseEffect from "./components/UseEffect"
import UseId from "./components/UseId"
import UseLayoutEffect from "./components/UseLayoutEffect"
import UseMemo from "./components/UseMemo"
import UserReducer from "./components/UseReducer"
import UseRef from "./components/UseRef"
import UseState from "./components/UseState"
import UseTransition from "./components/UseTransition"
import CustomHook from './components/CustomHook'

const hooks = [
  {
    id: 'useState', label: 'useState', category: 'State',
    bullets: ['Adds reactive state to functional components', 'Returns [value, setter]', 'Supports lazy initialization via function', 'Use functional updates for prev-state access'],
    component: <UseState />
  },
  {
    id: 'useReducer', label: 'useReducer', category: 'State',
    bullets: ['Alternative to useState for complex state', 'Uses reducer(state, action) pattern', 'dispatch() triggers state transitions', 'Great for state with multiple sub-values'],
    component: <UserReducer />
  },
  {
    id: 'useEffect', label: 'useEffect', category: 'Side Effect',
    bullets: ['Runs side effects after render (after paint)', 'Dependency array controls when it runs', 'Return cleanup function for subscriptions', 'Used for data fetching, timers, DOM updates'],
    component: <UseEffect />
  },
  {
    id: 'useLayoutEffect', label: 'useLayoutEffect', category: 'Side Effect',
    bullets: ['Same as useEffect but fires before paint', 'Blocks browser painting until complete', 'Use for DOM measurements & mutations', 'Prevents visual flicker/glitches'],
    component: <UseLayoutEffect />
  },
  {
    id: 'useContext', label: 'useContext', category: 'Context',
    bullets: ['Consumes context without prop drilling', 'Requires createContext() + Provider', 'Re-renders when context value changes', 'Multiple providers can override values'],
    component: <UseContext />
  },
  {
    id: 'useRef', label: 'useRef', category: 'DOM',
    bullets: ['Creates mutable ref that persists across renders', 'Changing .current does NOT re-render', 'Access DOM elements via ref attribute', 'Store any mutable value (timers, prev state)'],
    component: <UseRef />
  },
  {
    id: 'useMemo', label: 'useMemo', category: 'Performance',
    bullets: ['Caches the RESULT of expensive computation', 'Re-computes only when dependencies change', 'Returns cached value, not function', 'Use only for genuinely expensive operations'],
    component: <UseMemo />
  },
  {
    id: 'useCallback', label: 'useCallback', category: 'Performance',
    bullets: ['Caches a FUNCTION reference between renders', 'Useful with React.memo on child components', 'Same as useMemo(() => fn, deps)', 'Without memo on children, it has no benefit'],
    component: <UseCallback />
  },
  {
    id: 'useTransition', label: 'useTransition', category: 'Concurrency',
    bullets: ['Marks state updates as low priority', 'Keeps UI responsive during heavy updates', 'Returns [isPending, startTransition]', 'Input stays snappy while list filters in background'],
    component: <UseTransition />
  },
  {
    id: 'useId', label: 'useId', category: 'Concurrency',
    bullets: ['Generates unique, stable IDs', 'Safe for SSR (server & client match)', 'Use for htmlFor, aria-describedby, etc.', 'Each component instance gets unique IDs'],
    component: <UseId />
  },
  {
    id: 'customHook', label: 'Custom Hook', category: 'Custom',
    bullets: ['Encapsulates reusable logic', 'Can use other hooks internally', 'Returns any value or function', 'Promotes code reuse and separation of concerns'],
    component: <CustomHook />
  },
]

const categoryColors = {
  'State': 'primary',
  'Side Effect': 'warning',
  'Context': 'success',
  'DOM': 'info',
  'Performance': 'danger',
  'Concurrency': 'secondary',
}

function App() {
  const [activeHook, setActiveHook] = useState('useState')
  const active = hooks.find(h => h.id === activeHook)

  return (
    <div className="container-fluid py-3">
      {/* Header */}
      <div className="text-center mb-3">
        <h1 className="display-5 fw-bold">React Hooks</h1>
        <p className="text-muted">Interactive guide to all essential React Hooks</p>
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <span key={cat} className={`badge bg-${color}`}>{cat}</span>
          ))}
        </div>
      </div>

      <hr />

      {/* 2-Column Layout */}
      <div className="row">
        {/* Left Sidebar — Hook Navigation + Bullet Points */}
        <div className="col-md-4 col-lg-3">
          <div className="sticky-top" style={{ top: '1rem' }}>
            <h6 className="text-uppercase text-muted mb-3">Hooks</h6>
            <div className="list-group">
              {hooks.map(hook => (
                <button
                  key={hook.id}
                  className={`list-group-item list-group-item-action ${activeHook === hook.id ? 'active' : ''}`}
                  onClick={() => setActiveHook(hook.id)}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>{hook.label}</strong>
                    <span className={`badge bg-${categoryColors[hook.category]}`} style={{ fontSize: '0.65rem' }}>
                      {hook.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Bullet Points for Active Hook */}
            {active && (
              <div className="card mt-3">
                <div className="card-header bg-light py-2">
                  <strong className="small">{active.label} — Key Points</strong>
                </div>
                <div className="card-body py-2">
                  <ul className="mb-0 ps-3" style={{ fontSize: '0.85rem' }}>
                    {active.bullets.map((point, i) => (
                      <li key={i} className="mb-1">{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Content — Active Hook Demo */}
        <div className="col-md-8 col-lg-9">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              {active?.component}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-muted mt-4 py-3">
        <small>React Hooks Training Demo</small>
      </div>
    </div>
  )
}

export default App

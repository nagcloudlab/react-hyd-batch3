import { useState, useReducer, useRef } from "react"
import PatternLayout from "./PatternLayout"

// Problem: Hook with no customization
function useBasicToggle(initial = false) {
  const [on, setOn] = useState(initial)
  return { on, toggle: () => setOn(v => !v), reset: () => setOn(initial) }
}

function BasicDemo() {
  const [clicks, setClicks] = useState(0)
  const { on, toggle, reset } = useBasicToggle()
  return (
    <div>
      <div className="d-flex gap-2 align-items-center flex-wrap">
        <button className={`btn btn-sm ${on ? "btn-success" : "btn-secondary"}`}
          onClick={() => { toggle(); setClicks(c => c + 1) }}>
          {on ? "ON" : "OFF"}
        </button>
        <span className="badge bg-light text-dark">{clicks} clicks</span>
        <button className="btn btn-sm btn-outline-dark" onClick={() => { reset(); setClicks(0) }}>Reset</button>
      </div>
      <p className="text-danger small mt-2 mb-0">Need max 4 clicks? Must fork the hook or add a limitClicks prop. Every new business rule = another prop.</p>
    </div>
  )
}

// Solution: State Reducer Pattern
const types = { TOGGLE: "TOGGLE", RESET: "RESET" }

function defaultReducer(state, action) {
  switch (action.type) {
    case types.TOGGLE: return { on: !state.on }
    case types.RESET: return { on: action.initial }
    default: return state
  }
}

function useToggle({ initial = false, reducer = defaultReducer } = {}) {
  const init = useRef(initial).current
  const [state, dispatch] = useReducer(reducer, { on: initial })
  return { on: state.on, toggle: () => dispatch({ type: types.TOGGLE }), reset: () => dispatch({ type: types.RESET, initial: init }) }
}
useToggle.reducer = defaultReducer
useToggle.types = types

function LimitedDemo() {
  const [clicks, setClicks] = useState(0)
  const tooMany = clicks >= 4

  const { on, toggle, reset } = useToggle({
    reducer(state, action) {
      if (action.type === types.TOGGLE && tooMany) return state
      return defaultReducer(state, action)
    },
  })

  return (
    <div>
      <div className="d-flex gap-2 align-items-center flex-wrap">
        <button className={`btn btn-sm ${on ? "btn-success" : "btn-secondary"}`} disabled={tooMany}
          onClick={() => { toggle(); setClicks(c => c + 1) }}>
          {on ? "ON" : "OFF"}
        </button>
        <span className="badge bg-light text-dark">{clicks} / 4 clicks</span>
        <button className="btn btn-sm btn-outline-dark" onClick={() => { reset(); setClicks(0) }}>Reset</button>
      </div>
      {tooMany && <div className="alert alert-warning py-1 small mt-2">Max 4 clicks reached -- click Reset to continue</div>}
      <p className="text-success small mt-2 mb-0">Consumer injects business rule via custom reducer -- zero changes to the hook source code!</p>
    </div>
  )
}

function StateReducerPattern() {
  return (
    <PatternLayout
      title="State Reducer"
      description="Let consumers customize state transitions without modifying the hook."
      whyPoints={[
        "Consumers control state transitions without forking or modifying the hook source",
        "Avoids prop explosion -- no maxClicks, allowToggleWhen, disableAfter props",
        "Hook author ships defaults, consumer overrides only what they need",
        "Used by Downshift, React Table, TanStack, and headless UI libraries",
      ]}
      problem={
        <div>
          <div className="label-problem">useToggle with no customization point:</div>
          <div className="code-demo-row">
            <div className="code-block">{`function useBasicToggle(initial = false) {
  const [on, setOn] = useState(initial)
  return {
    on,
    toggle: () => setOn(v => !v),
    reset: () => setOn(initial),
  }
}

// Business need: max 4 clicks then lock.
// Options without State Reducer:
//   1. Fork the hook (maintenance burden)
//   2. Add maxClicks prop (API bloat)
//   3. Add onToggle callback (not enough)
// None are great.`}</div>
            <div className="demo-area"><BasicDemo /></div>
          </div>
        </div>
      }
      solution={
        <div>
          <div className="label-solution">Consumer injects business rules via custom reducer:</div>
          <div className="code-demo-row">
            <div className="code-block">{`const { on, toggle, reset } = useToggle({
  reducer(state, action) {
    // Get the default next state
    const changes = useToggle.reducer(
      state, action
    )

    // Apply business rule:
    // block TOGGLE after 4 clicks
    if (action.type === "TOGGLE" && tooMany) {
      return state  // no change!
    }

    return changes
  },
})

// Hook is unchanged.
// Consumer owns the rules.
// Ship new rules without a PR to the hook.`}</div>
            <div className="demo-area"><LimitedDemo /></div>
          </div>
        </div>
      }
    />
  )
}

export default StateReducerPattern

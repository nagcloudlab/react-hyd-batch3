import React, { useState, useMemo, useCallback, useRef } from "react"
import PatternLayout from "./PatternLayout"

const employees = Array.from({ length: 2000 }, (_, i) => ({
  id: i + 1,
  name: ["Alice", "Bob", "Carol", "Dave", "Eve", "Frank", "Grace", "Hank", "Iris", "Jack"][i % 10] + " " + (i + 1),
  dept: ["Engineering", "Marketing", "Sales", "Design", "Support"][i % 5],
  salary: 50000 + (i % 8) * 10000,
}))

// Problem: No memoization
function EmployeeList({ items, onSelect }) {
  const renders = useRef(0); renders.current++
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <span className="small text-muted">{items.length} employees</span>
        <span className="badge bg-danger" style={{ fontSize: "0.68rem" }}>Rendered {renders.current}x</span>
      </div>
      <div style={{ maxHeight: 160, overflowY: "auto" }}>
        <table className="table table-sm table-hover mb-0" style={{ fontSize: "0.75rem" }}>
          <thead><tr><th>Name</th><th>Dept</th><th>Salary</th></tr></thead>
          <tbody>
            {items.slice(0, 50).map(e => (
              <tr key={e.id} style={{ cursor: "pointer" }} onClick={() => onSelect(e)}>
                <td>{e.name}</td><td>{e.dept}</td><td>${e.salary.toLocaleString()}</td>
              </tr>
            ))}
            {items.length > 50 && <tr><td colSpan={3} className="text-muted">...and {items.length - 50} more</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ProblemDemo() {
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState("")
  const [dept, setDept] = useState("All")

  const filtered = employees.filter(e => {
    if (dept !== "All" && e.dept !== dept) return false
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <div className="d-flex gap-2 mb-2 flex-wrap align-items-center">
        <button className="btn btn-sm btn-outline-primary" onClick={() => setCount(c => c + 1)}>Notifications: {count}</button>
        <input className="form-control form-control-sm" style={{ width: 130 }} placeholder="Search name..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="form-select form-select-sm" style={{ width: 130 }} value={dept} onChange={e => setDept(e.target.value)}>
          <option>All</option><option>Engineering</option><option>Marketing</option><option>Sales</option>
        </select>
      </div>
      <EmployeeList items={filtered} onSelect={e => console.log("Selected:", e.name)} />
      <p className="text-danger small mt-1 mb-0">Click "Notifications" -- list re-renders + re-filters 2000 records every time!</p>
    </div>
  )
}

// Solution: Memoized
const MemoEmployeeList = React.memo(function MemoEmployeeList({ items, onSelect }) {
  const renders = useRef(0); renders.current++
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <span className="small text-muted">{items.length} employees</span>
        <span className="badge bg-success" style={{ fontSize: "0.68rem" }}>Rendered {renders.current}x</span>
      </div>
      <div style={{ maxHeight: 160, overflowY: "auto" }}>
        <table className="table table-sm table-hover mb-0" style={{ fontSize: "0.75rem" }}>
          <thead><tr><th>Name</th><th>Dept</th><th>Salary</th></tr></thead>
          <tbody>
            {items.slice(0, 50).map(e => (
              <tr key={e.id} style={{ cursor: "pointer" }} onClick={() => onSelect(e)}>
                <td>{e.name}</td><td>{e.dept}</td><td>${e.salary.toLocaleString()}</td>
              </tr>
            ))}
            {items.length > 50 && <tr><td colSpan={3} className="text-muted">...and {items.length - 50} more</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
})

function SolutionDemo() {
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState("")
  const [dept, setDept] = useState("All")

  const filtered = useMemo(() => employees.filter(e => {
    if (dept !== "All" && e.dept !== dept) return false
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  }), [search, dept])

  const handleSelect = useCallback(e => console.log("Selected:", e.name), [])

  return (
    <div>
      <div className="d-flex gap-2 mb-2 flex-wrap align-items-center">
        <button className="btn btn-sm btn-outline-primary" onClick={() => setCount(c => c + 1)}>Notifications: {count}</button>
        <input className="form-control form-control-sm" style={{ width: 130 }} placeholder="Search name..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="form-select form-select-sm" style={{ width: 130 }} value={dept} onChange={e => setDept(e.target.value)}>
          <option>All</option><option>Engineering</option><option>Marketing</option><option>Sales</option>
        </select>
      </div>
      <MemoEmployeeList items={filtered} onSelect={handleSelect} />
      <p className="text-success small mt-1 mb-0">Click "Notifications" -- list does NOT re-render! Only search/filter triggers it.</p>
    </div>
  )
}

function MemoizationPattern() {
  return (
    <PatternLayout
      title="Memoization"
      description="Prevent unnecessary re-renders with React.memo, useMemo, and useCallback."
      whyPoints={[
        "React.memo skips re-render when props haven't changed -- saves expensive DOM reconciliation",
        "useMemo caches computed values -- avoids re-filtering 2000 records on unrelated state changes",
        "useCallback stabilizes function references -- prevents child re-render from new function identity",
        "Use when you measure a performance problem -- premature memoization adds complexity for no gain",
      ]}
      problem={
        <div>
          <div className="label-problem">Every state change re-renders and re-computes everything:</div>
          <div className="code-demo-row">
            <div className="code-block">{`function EmployeeDirectory() {
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState("")

  // Re-filters 2000 records EVERY render
  // even when only count changed!
  const filtered = employees.filter(e =>
    e.name.includes(search)
  )

  return <>
    <button onClick={() => setCount(c+1)}>
      Notifications: {count}
    </button>

    <EmployeeList
      items={filtered}       // new array ref
      onSelect={e => ...}    // new function ref
    />
    {/* List re-renders even when only
        count changed! */}
  </>
}`}</div>
            <div className="demo-area"><ProblemDemo /></div>
          </div>
        </div>
      }
      solution={
        <div>
          <div className="label-solution">Memoize computed data, callbacks, and child components:</div>
          <div className="code-demo-row">
            <div className="code-block">{`function EmployeeDirectory() {
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState("")

  // Only re-filters when search changes
  const filtered = useMemo(
    () => employees.filter(
      e => e.name.includes(search)
    ),
    [search]
  )

  // Stable function reference
  const handleSelect = useCallback(
    e => console.log(e.name), []
  )

  return <>
    <button>Notifications: {count}</button>
    <MemoEmployeeList
      items={filtered}        // same ref!
      onSelect={handleSelect} // same ref!
    />
    {/* React.memo skips re-render! */}
  </>
}`}</div>
            <div className="demo-area"><SolutionDemo /></div>
          </div>
        </div>
      }
    />
  )
}

export default MemoizationPattern

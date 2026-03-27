import { useState } from "react"
import PatternLayout from "./PatternLayout"

const employees = [
  { id: 1, name: "Alice Johnson", dept: "Engineering", salary: 95000 },
  { id: 2, name: "Bob Smith", dept: "Marketing", salary: 72000 },
  { id: 3, name: "Carol Davis", dept: "Engineering", salary: 110000 },
  { id: 4, name: "Dave Wilson", dept: "Sales", salary: 68000 },
  { id: 5, name: "Eve Brown", dept: "Marketing", salary: 84000 },
]

// Problem: Sorting logic duplicated in every table
function EmployeeTableByName() {
  const [sortDir, setSortDir] = useState("asc")
  const sorted = [...employees].sort((a, b) => sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
  return (
    <div>
      <div style={{ fontSize: "0.78rem", fontWeight: 600, marginBottom: 4 }}>Employee Directory</div>
      <table className="table table-sm table-bordered" style={{ fontSize: "0.78rem" }}>
        <thead><tr><th style={{ cursor: "pointer" }} onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}>Name {sortDir === "asc" ? "▲" : "▼"}</th><th>Dept</th></tr></thead>
        <tbody>{sorted.map((e) => <tr key={e.id}><td>{e.name}</td><td>{e.dept}</td></tr>)}</tbody>
      </table>
    </div>
  )
}

function EmployeeTableBySalary() {
  const [sortDir, setSortDir] = useState("desc")
  const sorted = [...employees].sort((a, b) => sortDir === "asc" ? a.salary - b.salary : b.salary - a.salary)
  return (
    <div>
      <div style={{ fontSize: "0.78rem", fontWeight: 600, marginBottom: 4 }}>Salary Report</div>
      <table className="table table-sm table-bordered" style={{ fontSize: "0.78rem" }}>
        <thead><tr><th>Name</th><th style={{ cursor: "pointer" }} onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}>Salary {sortDir === "asc" ? "▲" : "▼"}</th></tr></thead>
        <tbody>{sorted.map((e) => <tr key={e.id}><td>{e.name}</td><td>${e.salary.toLocaleString()}</td></tr>)}</tbody>
      </table>
    </div>
  )
}

// Solution: Render Props — reusable sort logic
function SortableList({ data, sortKey, defaultDir = "asc", render }) {
  const [sortDir, setSortDir] = useState(defaultDir)
  const sorted = [...data].sort((a, b) => {
    const va = a[sortKey], vb = b[sortKey]
    const cmp = typeof va === "string" ? va.localeCompare(vb) : va - vb
    return sortDir === "asc" ? cmp : -cmp
  })
  const toggleSort = () => setSortDir((d) => (d === "asc" ? "desc" : "asc"))
  return render({ sorted, sortDir, toggleSort })
}

function RenderProps() {
  return (
    <PatternLayout
      title="Render Props"
      description="Share behavior between components by passing a function that controls rendering."
      whyPoints={[
        "Eliminates duplicated stateful logic (sorting, filtering, pagination) across tables",
        "One component owns the behavior, consumer decides the UI",
        "More flexible than HOCs -- no wrapper component or naming collisions",
        "Great for: data tables, mouse tracking, form state, scroll position",
      ]}
      problem={
        <div>
          <div className="label-problem">Same sorting logic in every table:</div>
          <div className="code-demo-row">
            <div className="code-block">{`function EmployeeTableByName() {
  const [sortDir, setSortDir] = useState("asc")
  const sorted = [...employees].sort((a, b) =>
    sortDir === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  )
  return <table>...</table>
}

function EmployeeTableBySalary() {
  const [sortDir, setSortDir] = useState("desc")
  // SAME sort logic again!
  const sorted = [...employees].sort(...)
  return <table>...</table>
}`}</div>
            <div className="demo-area">
              <EmployeeTableByName />
              <EmployeeTableBySalary />
              <p className="text-danger small mb-0">Sort logic duplicated in both tables</p>
            </div>
          </div>
        </div>
      }
      solution={
        <div>
          <div className="label-solution">SortableList handles sorting, consumer handles rendering:</div>
          <div className="code-demo-row">
            <div className="code-block">{`<SortableList
  data={employees}
  sortKey="name"
  render={({ sorted, sortDir, toggleSort }) => (
    <table>
      <thead>
        <tr>
          <th onClick={toggleSort}>
            Name {sortDir === "asc" ? "▲" : "▼"}
          </th>
          <th>Dept</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map(e => <tr>...</tr>)}
      </tbody>
    </table>
  )}
/>`}</div>
            <div className="demo-area">
              <div style={{ fontSize: "0.78rem", fontWeight: 600, marginBottom: 4 }}>Employee Directory</div>
              <SortableList data={employees} sortKey="name" render={({ sorted, sortDir, toggleSort }) => (
                <table className="table table-sm table-bordered" style={{ fontSize: "0.78rem" }}>
                  <thead><tr><th style={{ cursor: "pointer" }} onClick={toggleSort}>Name {sortDir === "asc" ? "▲" : "▼"}</th><th>Dept</th></tr></thead>
                  <tbody>{sorted.map((e) => <tr key={e.id}><td>{e.name}</td><td>{e.dept}</td></tr>)}</tbody>
                </table>
              )} />
              <div style={{ fontSize: "0.78rem", fontWeight: 600, marginBottom: 4 }}>Salary Report</div>
              <SortableList data={employees} sortKey="salary" defaultDir="desc" render={({ sorted, sortDir, toggleSort }) => (
                <table className="table table-sm table-bordered" style={{ fontSize: "0.78rem" }}>
                  <thead><tr><th>Name</th><th style={{ cursor: "pointer" }} onClick={toggleSort}>Salary {sortDir === "asc" ? "▲" : "▼"}</th></tr></thead>
                  <tbody>{sorted.map((e) => <tr key={e.id}><td>{e.name}</td><td className={e.salary >= 90000 ? "text-success fw-bold" : ""}>${e.salary.toLocaleString()}</td></tr>)}</tbody>
                </table>
              )} />
              <p className="text-success small mb-0">Sort logic written once, used with different columns and UIs</p>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default RenderProps

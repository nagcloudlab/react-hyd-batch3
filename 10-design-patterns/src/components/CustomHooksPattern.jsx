import { useState, useEffect } from "react"
import PatternLayout from "./PatternLayout"

// Problem: localStorage logic duplicated
function ThemeToggleDuplicated() {
  const [theme, setTheme] = useState(() => {
    try { return JSON.parse(localStorage.getItem("theme")) || "light" } catch { return "light" }
  })
  useEffect(() => { localStorage.setItem("theme", JSON.stringify(theme)) }, [theme])
  return (
    <button className={`btn btn-sm ${theme === "light" ? "btn-light border" : "btn-dark"}`}
      onClick={() => setTheme(t => t === "light" ? "dark" : "light")}>
      Theme: {theme}
    </button>
  )
}

function FontSizeDuplicated() {
  const [size, setSize] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fontSize")) || 14 } catch { return 14 }
  })
  useEffect(() => { localStorage.setItem("fontSize", JSON.stringify(size)) }, [size])
  return (
    <div className="d-flex align-items-center gap-2">
      <button className="btn btn-sm btn-outline-secondary" onClick={() => setSize(s => Math.max(10, s - 2))}>A-</button>
      <span style={{ fontSize: size }} className="small">Font: {size}px</span>
      <button className="btn btn-sm btn-outline-secondary" onClick={() => setSize(s => Math.min(24, s + 2))}>A+</button>
    </div>
  )
}

// Solution: Custom Hooks
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { const stored = localStorage.getItem(key); return stored !== null ? JSON.parse(stored) : initial } catch { return initial }
  })
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)) }, [key, value])
  return [value, setValue]
}

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    setLoading(true)
    fetch(url).then(r => { if (!r.ok) throw new Error("Failed"); return r.json() })
      .then(setData).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [url])
  return { data, loading, error }
}

function ThemeToggleClean() {
  const [theme, setTheme] = useLocalStorage("theme", "light")
  return (
    <button className={`btn btn-sm ${theme === "light" ? "btn-light border" : "btn-dark"}`}
      onClick={() => setTheme(t => t === "light" ? "dark" : "light")}>
      Theme: {theme}
    </button>
  )
}

function FontSizeClean() {
  const [size, setSize] = useLocalStorage("fontSize", 14)
  return (
    <div className="d-flex align-items-center gap-2">
      <button className="btn btn-sm btn-outline-secondary" onClick={() => setSize(s => Math.max(10, s - 2))}>A-</button>
      <span style={{ fontSize: size }} className="small">Font: {size}px</span>
      <button className="btn btn-sm btn-outline-secondary" onClick={() => setSize(s => Math.min(24, s + 2))}>A+</button>
    </div>
  )
}

function UserListWithHook() {
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users?_limit=3")
  if (loading) return <div className="spinner-border spinner-border-sm" />
  if (error) return <div className="text-danger small">{error}</div>
  return <ul style={{ fontSize: "0.8rem", paddingLeft: 18 }}>{data.map(u => <li key={u.id}>{u.name} -- {u.email}</li>)}</ul>
}

function CustomHooksPattern() {
  return (
    <PatternLayout
      title="Custom Hooks"
      description="Extract and reuse stateful logic across components without changing hierarchy."
      whyPoints={[
        "Replaces HOCs and Render Props with a simpler, composable API",
        "Stateful logic lives in a plain function -- easy to test and share across projects",
        "No wrapper hell -- hooks don't add extra nodes to the DOM tree",
        "The modern React way: useLocalStorage, useFetch, useAuth, useDebounce, useMediaQuery",
      ]}
      problem={
        <div>
          <div className="label-problem">localStorage sync duplicated in every component:</div>
          <div className="code-demo-row">
            <div className="code-block">{`function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("theme")
      ) || "light"
    } catch { return "light" }
  })
  useEffect(() => {
    localStorage.setItem("theme",
      JSON.stringify(theme))
  }, [theme])
  ...
}

function FontSize() {
  // EXACT SAME localStorage pattern!
  const [size, setSize] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("fontSize"))
    } catch { return 14 }
  })
  useEffect(() => {
    localStorage.setItem("fontSize",
      JSON.stringify(size))
  }, [size])
}`}</div>
            <div className="demo-area">
              <div className="d-flex flex-column gap-2">
                <ThemeToggleDuplicated />
                <FontSizeDuplicated />
              </div>
              <p className="text-danger small mt-2 mb-0">Same localStorage read/write pattern copied in both components</p>
            </div>
          </div>
        </div>
      }
      solution={
        <div>
          <div className="label-solution">useLocalStorage + useFetch -- write once, use everywhere:</div>
          <div className="code-demo-row">
            <div className="code-block">{`function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initial
  })
  useEffect(() => {
    localStorage.setItem(key,
      JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

// One line per component:
const [theme, setTheme] =
  useLocalStorage("theme", "light")
const [size, setSize] =
  useLocalStorage("fontSize", 14)

// Same pattern for fetch:
const { data, loading } = useFetch(url)`}</div>
            <div className="demo-area">
              <div className="d-flex flex-column gap-2">
                <ThemeToggleClean />
                <FontSizeClean />
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: 2 }}>useFetch demo:</div>
                  <UserListWithHook />
                </div>
              </div>
              <p className="text-success small mt-2 mb-0">Logic extracted into hooks. Refresh page -- values persist!</p>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default CustomHooksPattern

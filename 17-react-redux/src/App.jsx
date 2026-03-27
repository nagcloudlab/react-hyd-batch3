import AccountsView from "./components/AccountsView"
import CounterBox from "./components/CounterBox"
import CounterView from "./components/CounterView"
import "./App.css"



function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Redux Toolkit Playground</p>
        <h1>React Redux Demo</h1>
      </header>

      <main className="dashboard-grid">
        <section className="panel">
          <CounterView />
        </section>

        <section className="panel">
          <CounterBox />
        </section>

        <section className="panel panel-wide">
          <AccountsView />
        </section>
      </main>
    </div>
  )
}

export default App
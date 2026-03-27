import {
  useState,
  useReducer,
  useEffect
} from "react";

import Footer from "./components/Footer";
import Input from "./components/Input";
import List from "./components/List";

import todosReducer from "./reducers/todos.js";
import TodosContext from "./contexts/TodosContext.jsx";

import {
  useLocalStorage
} from './hooks'

function App() {

  const [localStorageTodos, setLocalStorageTodos] = useLocalStorage("todos", []);
  const [todos, dispatch] = useReducer(todosReducer, localStorageTodos);
  const [tab, setTab] = useState('all');
  useEffect(() => {
    setLocalStorageTodos(todos); // Sync todos with localStorage
  }, [todos, setLocalStorageTodos])

  const handleToggleAll = (e) => {
    dispatch({
      type: "TOGGLE_ALL_TODOS"
    });
  }

  const handleTabChange = (tab) => {
    setTab(tab);
  }

  return (
    <section className="todoapp">
      <TodosContext.Provider value={{ todos, tab, dispatch }}>
        <header className="header">
          <h1>todos</h1>
          <Input /*onEnter={handleEnter} */ />
        </header>
        <main className="main">
          <div className="toggle-all-container" onClick={handleToggleAll} >
            <input className="toggle-all" type="checkbox" />
            <label className="toggle-all-label" htmlFor="toggle-all">Mark all as complete</label>
          </div>
          <List /*todos={todos}*/ />
        </main>
        <Footer onTabChange={handleTabChange} />
      </TodosContext.Provider>
    </section>
  )
}

export default App;
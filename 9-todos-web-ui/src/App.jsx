import {
  useState,
  useReducer,
  use
} from "react";

import Footer from "./components/Footer";
import Input from "./components/Input";
import List from "./components/List";

import todosReducer from "./reducers/todos.js";
import TodosContext from "./contexts/TodosContext.jsx";

function App() {

  const [todos, dispatch] = useReducer(todosReducer, [
    { id: 1, title: "Learn Javscript", completed: true },
    { id: 2, title: "Learn React", completed: false },
    { id: 3, title: "Learn Redux!", completed: false }
  ]);

  // const handleEnter = (value) => {
  //   if (!value) return;
  //   dispatch({
  //     type: "ADD_TODO",
  //     title: value
  //   });
  // }

  const handleToggleAll = (e) => {
    dispatch({
      type: "TOGGLE_ALL_TODOS"
    });
  }

  return (
    <section className="todoapp">
      <TodosContext.Provider value={{ todos, dispatch }}>
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
        <Footer />
      </TodosContext.Provider>
    </section>
  )
}

export default App;
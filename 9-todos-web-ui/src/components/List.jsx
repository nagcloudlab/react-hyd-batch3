import { useContext } from "react";
import TodosContext from "../contexts/TodosContext";
import Item from "./Item";



function List({ /*todos*/ }) {
    const { todos } = useContext(TodosContext);
    return (
        <ul className="todo-list">
            {todos.map(todo => <Item key={todo.id} todo={todo} />)}
        </ul>
    )
}

export default List;
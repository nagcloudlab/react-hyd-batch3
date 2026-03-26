import { useContext, useState } from "react";
import TodosContext from "../contexts/TodosContext";
import Input from "./Input";


function Item({ todo }) {
    const [isEditing, setIsEditing] = useState(false);
    const { dispatch } = useContext(TodosContext);
    const handleDelete = () => {
        dispatch({
            type: "DELETE_TODO",
            id: todo.id
        });
    }
    const handleToggle = () => {
        dispatch({
            type: "TOGGLE_TODO",
            id: todo.id
        });
    }
    const toggleEdit = () => {
        setIsEditing(true);
    }
    const handleEdit = (title) => {
        dispatch({
            type: "EDIT_TODO",
            id: todo.id,
            title
        });
        setIsEditing(false);
    }
    return (
        <li className={`todo ${todo.completed ? "completed" : ""}`}>
            {isEditing ? (
                <Input
                    title={todo.title}
                    onEnter={handleEdit}
                    onBlur={() => setIsEditing(false)}
                />
            ) : (
                <>
                    <div className="view" onDoubleClick={toggleEdit}>
                        <input checked={todo.completed} onChange={handleToggle} className="toggle" type="checkbox" />
                        <label>{todo.title}</label>
                        <button onClick={handleDelete} className="destroy"></button>
                    </div>
                </>
            )}
        </li>
    )
}

export default Item;
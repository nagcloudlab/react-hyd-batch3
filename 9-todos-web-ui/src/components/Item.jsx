

function Item() {
    return (
        <li className="todo">
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>Todo 1</label>
                <button className="destroy"></button>
            </div>
        </li>
    )
}

export default Item;
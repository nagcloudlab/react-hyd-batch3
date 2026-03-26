
/*
ADD_TODO
EDIT_TODO
DELETE_TODO
TOGGLE_TODO
TOGGLE_ALL_TODOS
CLEAR_COMPLETED
*/


function todosReducer(todos = [], action) {
    console.log("todosReducer", action);
    let { type } = action;
    switch (type) {
        case "ADD_TODO": {
            let { title } = action;
            let todo = {
                id: todos.length + 1,
                title,
                completed: false
            }
            return [...todos, todo];
        }
        case "EDIT_TODO": {
            let { id, title } = action;
            return todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, title }
                }
                return todo;
            })
        }
        case "DELETE_TODO": {
            let { id } = action;
            return todos.filter(todo => todo.id !== id);
        }
        case "TOGGLE_TODO": {
            let { id } = action;
            return todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo;
            })
        }
        case "TOGGLE_ALL_TODOS": {
            let allCompleted = todos.every(todo => todo.completed);
            return todos.map(todo => {
                return { ...todo, completed: !allCompleted }
            })
        }
        case "CLEAR_COMPLETED": {
            return todos.filter(todo => !todo.completed);
        }
        default:
            return todos;
    }
}

export default todosReducer;
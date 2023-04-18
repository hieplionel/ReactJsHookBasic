// props ra đời để giúp tái sử dụng component, chia tách code ra cho hiệu quả

const Todo = (props) => {
    // properties
    // truyền dữ liệu từ cha xuống con
    // const todos = props.todos;
    const { todos, title, deleteDataTodo} = props;
    const handleDelete = (id) => {
        deleteDataTodo(id)
    }

    return (
        <div className="todos-container">
            <div className="title">
                {title}
            </div>
          {todos.map(todo => {
            return (
                <div key={todo.id}>
                    <li className="todo-child">
                        {todo.title} 
                        &nbsp; &nbsp; <button onClick={() => handleDelete(todo.id)}>X</button> 
                    </li>
                </div>
            )
          })}

          <hr/>
        </div>
    )
}

export default Todo
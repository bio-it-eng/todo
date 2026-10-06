function TodoItem({
  todo,
  onUpdate,
  onDelete,
}) {
  const handleToggle = () => {
    onUpdate(todo._id, {
      title: todo.title,
      completed: !todo.completed,
    });
  };

  return (
    <div className="todo-item">

      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />

        <span
          style={{
            textDecoration: todo.completed
              ? "line-through"
              : "none",
          }}
        >
          {todo.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo._id)}
      >
        Delete
      </button>

    </div>
  );
}

export default TodoItem;
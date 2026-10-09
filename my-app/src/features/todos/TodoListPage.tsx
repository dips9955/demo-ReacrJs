import { useState, type FormEvent } from 'react'
import type { Todo } from '../../types/dashboard'

type TodoListPageProps = {
  todos: Todo[]
  addTodo: (title: string) => void
  updateTodo: (id: number, done: boolean) => void
  deleteTodo: (id: number) => void
}

export function TodoListPage({ todos, addTodo, updateTodo, deleteTodo }: TodoListPageProps) {
  const [todoInput, setTodoInput] = useState('')
  const openTodoCount = todos.filter((todo) => !todo.done).length
  const completedTodoCount = todos.length - openTodoCount

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = todoInput.trim()
    if (!title) return
    addTodo(title)
    setTodoInput('')
  }

  return (
    <section className="panel list-panel">
      <div className="list-panel-heading">
        <div>
          <h2>Tasks for your next session</h2>
          <p>{openTodoCount} left to do · {completedTodoCount} completed</p>
        </div>
        <span className="large-tool-icon lavender">✓</span>
      </div>
      <form className="add-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="todo-input">Add a task</label>
        <input
          id="todo-input"
          value={todoInput}
          onChange={(event) => setTodoInput(event.target.value)}
          placeholder="What would you like to get done?"
        />
        <button className="button-primary" type="submit">Add task <span aria-hidden="true">+</span></button>
      </form>
      {todos.length ? (
        <ul className="item-list">
          {todos.map((todo) => (
            <li className={`todo-row ${todo.done ? 'todo-done' : ''}`} key={todo.id}>
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={(event) => updateTodo(todo.id, event.target.checked)}
                />
                <span className="custom-check" />
                <span>{todo.title}</span>
              </label>
              <button
                type="button"
                className="delete-button"
                aria-label={`Delete ${todo.title}`}
                onClick={() => deleteTodo(todo.id)}
              >×</button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span>✦</span><strong>Your list is clear</strong>
          <p>Add a task above when you’re ready for the next one.</p>
        </div>
      )}
    </section>
  )
}

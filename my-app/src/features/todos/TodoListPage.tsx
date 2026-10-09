import { useState, type FormEvent } from 'react'
import { useTodoSearch } from '../../hooks/useTodoSearch'
import type { Todo } from '../../types/dashboard'

type TodoListPageProps = {
  todos: Todo[]
  addTodo: (title: string) => void
  updateTodo: (id: number, done: boolean) => void
  deleteTodo: (id: number) => void
}

export function TodoListPage({ todos, addTodo, updateTodo, deleteTodo }: TodoListPageProps) {
  const [todoInput, setTodoInput] = useState('')
  const { query, setQuery, results, isLoading, error, retry } = useTodoSearch(todos)
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
      <div className="todo-search">
        <label className="sr-only" htmlFor="todo-search">Search tasks</label>
        <span className="todo-search-icon" aria-hidden="true">⌕</span>
        <input
          id="todo-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search your tasks..."
          aria-describedby="todo-search-help"
        />
        {query && (
          <button className="clear-search" type="button" onClick={() => setQuery('')}>
            Clear
          </button>
        )}
      </div>
      <p id="todo-search-help" className="search-help">
        Search updates after you pause typing.
      </p>
      <div className="todo-results" aria-live="polite" aria-busy={isLoading}>
        {isLoading && <p className="search-status">Searching your tasks…</p>}
        {error ? (
          <div className="search-error" role="alert">
            <span>{error}</span>
            <button className="button-secondary" type="button" onClick={retry}>Try again</button>
          </div>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <span>✦</span><strong>Your list is clear</strong>
            <p>Add a task above when you’re ready for the next one.</p>
          </div>
        ) : results.length ? (
          <ul className="item-list">
          {results.map((todo) => (
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
          <div className="empty-state search-empty">
            <span>⌕</span><strong>No matching tasks</strong>
            <p>Try another search term or clear your search.</p>
          </div>
        )}
      </div>
    </section>
  )
}

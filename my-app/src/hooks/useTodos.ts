import { useLocalStorageState } from './useLocalStorageState'
import type { Todo } from '../types/dashboard'

export function useTodos() {
  const [todos, setTodos] = useLocalStorageState<Todo[]>('devspace-todos', [])

  const addTodo = (title: string) => {
    setTodos((currentTodos) => [...currentTodos, {
      id: Date.now(),
      title,
      done: false,
    }])
  }

  const updateTodo = (id: number, done: boolean) => {
    setTodos((currentTodos) => currentTodos.map((todo) =>
      todo.id === id ? { ...todo, done } : todo,
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  return { todos, addTodo, updateTodo, deleteTodo }
}

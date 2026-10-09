import type { Todo } from '../types/dashboard'

/** Searches the current local todo collection; replace this with an API client when a backend exists. */
export async function searchTodos(
  todos: Todo[],
  query: string,
  signal: AbortSignal,
): Promise<Todo[]> {
  if (signal.aborted) {
    throw new DOMException('Search cancelled', 'AbortError')
  }

  const normalizedQuery = query.trim().toLocaleLowerCase()
  const results = todos.filter((todo) =>
    todo.title.toLocaleLowerCase().includes(normalizedQuery),
  )

  if (signal.aborted) {
    throw new DOMException('Search cancelled', 'AbortError')
  }

  return results
}

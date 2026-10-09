import { useEffect, useRef, useState } from 'react'
import type { Todo } from '../types/dashboard'
import { searchTodos } from '../services/todoSearch'

const DEBOUNCE_DELAY_MS = 300

type SearchState = {
  query: string
  status: 'idle' | 'loading' | 'success' | 'error'
  results: Todo[]
  error: string | null
}

export function useTodoSearch(todos: Todo[]) {
  const [query, setQuery] = useState('')
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    status: 'idle',
    results: todos,
    error: null,
  })
  const [retryKey, setRetryKey] = useState(0)
  const latestRequestId = useRef(0)
  const normalizedQuery = query.trim()

  useEffect(() => {
    const controller = new AbortController()
    const requestId = ++latestRequestId.current
    if (!query.trim()) return () => controller.abort()

    const debounceTimer = window.setTimeout(async () => {
      if (controller.signal.aborted) return
      setSearchState({ query: query.trim(), status: 'loading', results: [], error: null })

      try {
        const nextResults = await searchTodos(todos, query.trim(), controller.signal)
        if (!controller.signal.aborted && requestId === latestRequestId.current) {
          setSearchState({ query: query.trim(), status: 'success', results: nextResults, error: null })
        }
      } catch (searchError) {
        if (
          !controller.signal.aborted &&
          requestId === latestRequestId.current &&
          !(searchError instanceof DOMException && searchError.name === 'AbortError')
        ) {
          setSearchState({
            query: query.trim(),
            status: 'error',
            results: [],
            error: 'Search could not be completed. Please try again.',
          })
        }
      }
    }, DEBOUNCE_DELAY_MS)

    return () => {
      window.clearTimeout(debounceTimer)
      controller.abort()
    }
  }, [query, retryKey, todos])

  const hasCurrentResults = searchState.query === normalizedQuery

  return {
    query,
    setQuery,
    results: normalizedQuery && hasCurrentResults ? searchState.results : todos,
    isLoading: Boolean(normalizedQuery) && hasCurrentResults && searchState.status === 'loading',
    error: hasCurrentResults ? searchState.error : null,
    retry: () => setRetryKey((current) => current + 1),
  }
}

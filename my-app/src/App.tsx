import { useState } from 'react'
import { PageHeading } from './components/PageHeading'
import { Sidebar, Topbar } from './components/layout'
import { useProjects } from './hooks/useProjects'
import { useTodos } from './hooks/useTodos'
import { CounterPage } from './features/counter'
import { HomePage } from './features/home'
import { ProjectsPage } from './features/projects'
import { TodoListPage } from './features/todos'
import type { Page } from './types/dashboard'
import './App.css'

function App() {
  const [page, setPage] = useState<Page>('Home')
  const [count, setCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos()
  const { projects: lldProjects, addProject: addLldProject } = useProjects('lld')
  const { projects: hldProjects, addProject: addHldProject } = useProjects('hld')

  const openPage = (nextPage: Page) => {
    setPage(nextPage)
    setMobileMenuOpen(false)
  }

  const pendingTodoCount = todos.filter((todo) => !todo.done).length

  return (
    <div className="app-shell">
      <Sidebar
        activePage={page}
        open={mobileMenuOpen}
        openPage={openPage}
        pendingTodoCount={pendingTodoCount}
        close={() => setMobileMenuOpen(false)}
      />

      <div className="main-column">
        <Topbar
          activePage={page}
          menuOpen={mobileMenuOpen}
          toggleMenu={() => setMobileMenuOpen((isOpen) => !isOpen)}
        />
        <main className="page-content">
          <PageHeading page={page} />

          {page === 'Home' && (
            <HomePage
              todos={todos}
              lldProjects={lldProjects}
              hldProjects={hldProjects}
              onNavigate={openPage}
            />
          )}
          {page === 'Counter' && <CounterPage count={count} setCount={setCount} />}
          {page === 'Todo List' && (
            <TodoListPage
              todos={todos}
              addTodo={addTodo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          )}
          {page === 'LLD Projects' && (
            <ProjectsPage page="LLD Projects" projects={lldProjects} addProject={addLldProject} />
          )}
          {page === 'HLD Projects' && (
            <ProjectsPage page="HLD Projects" projects={hldProjects} addProject={addHldProject} />
          )}

          <footer className="page-footer">
            <span>Made for ideas worth building.</span>
            <span>devspace <span aria-hidden="true">✦</span></span>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App

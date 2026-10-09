import type { Page, Project, Todo } from '../../types/dashboard'

type HomePageProps = {
  todos: Todo[]
  lldProjects: Project[]
  hldProjects: Project[]
  onNavigate: (page: Page) => void
}

export function HomePage({ todos, lldProjects, hldProjects, onNavigate }: HomePageProps) {
  const openTodoCount = todos.filter((todo) => !todo.done).length
  const completedTodoCount = todos.length - openTodoCount
  const progressMaximum = Math.max(todos.length, 1)
  const progress = todos.length ? (completedTodoCount / todos.length) * 100 : 0

  return (
    <>
      <section className="welcome-banner" aria-label="Welcome">
        <div className="welcome-copy">
          <span className="banner-kicker">A LITTLE PROGRESS ADDS UP</span>
          <h2>Make room for your next<br />great idea.</h2>
          <p>Keep your learning, plans, and architecture projects moving forward.</p>
          <button type="button" className="banner-button" onClick={() => onNavigate('LLD Projects')}>
            Explore your projects <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="banner-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="art-card">
            <span className="art-card-dot" />
            <span className="art-line art-line-long" />
            <span className="art-line" />
            <span className="art-mini-grid"><i /><i /><i /><i /></span>
          </div>
          <div className="art-sparkle">✳</div>
          <div className="art-circle">⌘</div>
        </div>
      </section>

      <section className="stats-grid" aria-label="Workspace summary">
        <article className="stat-card">
          <div className="stat-top"><span>Open tasks</span><span className="stat-icon lavender">✓</span></div>
          <strong>{openTodoCount.toString().padStart(2, '0')}</strong>
          <span className="stat-foot">Things to do next</span>
        </article>
        <article className="stat-card">
          <div className="stat-top"><span>LLD projects</span><span className="stat-icon peach">◇</span></div>
          <strong>{lldProjects.length.toString().padStart(2, '0')}</strong>
          <span className="stat-foot">Designing the details</span>
        </article>
        <article className="stat-card">
          <div className="stat-top"><span>HLD projects</span><span className="stat-icon mint">▦</span></div>
          <strong>{hldProjects.length.toString().padStart(2, '0')}</strong>
          <span className="stat-foot">Thinking at scale</span>
        </article>
      </section>

      <section className="home-lower">
        <article className="panel quick-panel">
          <div className="panel-heading">
            <div><h2>Quick access</h2><p>Jump back into your workspace</p></div>
            <span className="panel-heading-icon">↗</span>
          </div>
          <div className="quick-links">
            <button type="button" onClick={() => onNavigate('Todo List')}>
              <span className="quick-icon lavender">✓</span>
              <span><strong>Todo list</strong><small>{todos.length} {todos.length === 1 ? 'task' : 'tasks'} in your list</small></span>
              <span className="quick-arrow">→</span>
            </button>
            <button type="button" onClick={() => onNavigate('LLD Projects')}>
              <span className="quick-icon peach">◇</span>
              <span><strong>LLD projects</strong><small>{lldProjects.length} design ideas</small></span>
              <span className="quick-arrow">→</span>
            </button>
            <button type="button" onClick={() => onNavigate('HLD Projects')}>
              <span className="quick-icon mint">▦</span>
              <span><strong>HLD projects</strong><small>{hldProjects.length} systems to explore</small></span>
              <span className="quick-arrow">→</span>
            </button>
          </div>
        </article>

        <article className="panel progress-panel">
          <div className="panel-heading">
            <div><h2>Your momentum</h2><p>Every completed task counts</p></div>
            <span className="progress-emoji" aria-hidden="true">✦</span>
          </div>
          <div className="progress-number">
            <strong>{completedTodoCount}</strong>
            <span>completed<br />{completedTodoCount === 1 ? 'task' : 'tasks'}</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Completed tasks"
            aria-valuenow={completedTodoCount}
            aria-valuemin={0}
            aria-valuemax={progressMaximum}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <p className="progress-caption">
            {todos.length ? `${completedTodoCount} of ${todos.length} tasks checked off` : 'Add a task to start your streak'}
          </p>
        </article>
      </section>
    </>
  )
}

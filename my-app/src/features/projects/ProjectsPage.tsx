import { useState, type FormEvent } from 'react'
import type { Project } from '../../types/dashboard'

type ProjectsPageProps = {
  page: 'LLD Projects' | 'HLD Projects'
  projects: Project[]
  addProject: (name: string) => void
}

export function ProjectsPage({ page, projects, addProject }: ProjectsPageProps) {
  const [projectInput, setProjectInput] = useState('')
  const isLld = page === 'LLD Projects'

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = projectInput.trim()
    if (!name) return
    addProject(name)
    setProjectInput('')
  }

  return (
    <section className="panel list-panel">
      <div className="list-panel-heading">
        <div>
          <h2>{isLld ? 'Low-level design ideas' : 'High-level system designs'}</h2>
          <p>{isLld ? 'Patterns, components, and object-oriented design' : 'Architecture, services, and distributed systems'}</p>
        </div>
        <span className={`large-tool-icon ${isLld ? 'peach' : 'mint'}`}>{isLld ? '◇' : '▦'}</span>
      </div>
      <form className="add-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="project-input">Add a project</label>
        <input
          id="project-input"
          value={projectInput}
          onChange={(event) => setProjectInput(event.target.value)}
          placeholder="Name a project to explore..."
        />
        <button className="button-primary" type="submit">Add project <span aria-hidden="true">+</span></button>
      </form>
      {projects.length ? (
        <ul className="project-grid">
          {projects.map((project, index) => (
            <li className="project-card" key={project.id}>
              <div className={`project-symbol project-symbol-${index % 3}`}>{isLld ? '◇' : '▦'}</div>
              <div><h3>{project.name}</h3><p>{project.description}</p></div>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span>✦</span><strong>No projects here yet</strong>
          <p>Add a project above to make this space yours.</p>
        </div>
      )}
    </section>
  )
}

import { navigationGroups, navigationItems } from '../../data/navigation'
import type { Page } from '../../types/dashboard'

type SidebarProps = {
  activePage: Page
  open: boolean
  openPage: (page: Page) => void
  pendingTodoCount: number
  close: () => void
}

export function Sidebar({ activePage, open, openPage, pendingTodoCount, close }: SidebarProps) {
  return (
    <>
      {open && (
        <button
          className="sidebar-scrim"
          type="button"
          aria-label="Close navigation"
          onClick={close}
        />
      )}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`} aria-label="Main navigation">
        <a
          className="brand"
          href="#home"
          onClick={(event) => {
            event.preventDefault()
            openPage('Home')
          }}
        >
          <span className="brand-mark">d</span>
          <span>devspace<small>PERSONAL WORKSPACE</small></span>
        </a>
        <div className="sidebar-label">MENU</div>
        {navigationGroups.map((group) => (
          <nav className="nav-group" aria-label={group} key={group}>
            <p className="nav-heading">{group}</p>
            {navigationItems.filter((item) => item.group === group).map((item) => (
              <button
                className={`nav-item ${activePage === item.label ? 'nav-item-active' : ''}`}
                key={item.label}
                type="button"
                aria-current={activePage === item.label ? 'page' : undefined}
                onClick={() => openPage(item.label)}
              >
                <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
                {item.label === 'Todo List' && pendingTodoCount > 0 && (
                  <span className="nav-count">{pendingTodoCount}</span>
                )}
              </button>
            ))}
          </nav>
        ))}
        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <span className="tip-spark">✦</span>
            <strong>Keep building</strong>
            <p>Small steps make great systems.</p>
          </div>
          <div className="profile">
            <div className="avatar">Y</div>
            <div><strong>Your workspace</strong><span>Personal account</span></div>
            <span className="profile-dots" aria-hidden="true">•••</span>
          </div>
        </div>
      </aside>
    </>
  )
}

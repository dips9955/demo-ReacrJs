import type { Page } from '../../types/dashboard'

type TopbarProps = {
  activePage: Page
  menuOpen: boolean
  toggleMenu: () => void
}

export function Topbar({ activePage, menuOpen, toggleMenu }: TopbarProps) {
  return (
    <header className="topbar">
      <button
        className="mobile-menu-button"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        ☰
      </button>
      <div className="breadcrumbs">
        <span>Workspace</span>
        <span className="breadcrumb-separator">/</span>
        <strong>{activePage}</strong>
      </div>
      <div className="topbar-right">
        <span className="status-dot" />
        <span>All changes saved</span>
        <div className="topbar-avatar" aria-label="Your profile">Y</div>
      </div>
    </header>
  )
}

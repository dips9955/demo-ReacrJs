import { pageDescriptions } from '../data/navigation'
import type { Page } from '../types/dashboard'

type PageHeadingProps = { page: Page }

export function PageHeading({ page }: PageHeadingProps) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
        <h1>{page === 'Home' ? 'Good things start here.' : page}</h1>
        <p className="page-description">{pageDescriptions[page]}</p>
      </div>
      {page === 'Home' && (
        <div className="date-chip"><span aria-hidden="true">◷</span> Your ideas, in one place</div>
      )}
    </div>
  )
}

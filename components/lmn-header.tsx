import { Home, Map as MapIcon, MapPin, UserRound } from 'lucide-react'

export function LmnHeader() {
  return (
    <header className="prototype-header">
      <a className="brand-lockup" href="/" aria-label="Last Mile Navigator home">
        <span className="brand-mark" aria-hidden="true">
          <MapPin />
        </span>
        <span className="brand-copy">
          <strong>Last Mile Navigator</strong>
          <small>University of Washington · Seattle</small>
        </span>
      </a>
      <nav className="prototype-nav" aria-label="Primary navigation">
        <a className="nav-pill active" href="/" aria-current="page">
          <Home aria-hidden="true" />
          Home
        </a>
        <button className="nav-pill" type="button" disabled>
          <MapIcon aria-hidden="true" />
          Routes <span className="nav-coming-soon">Coming soon</span>
        </button>
        <button className="nav-pill" type="button" disabled>
          <UserRound aria-hidden="true" />
          Profile <span className="nav-coming-soon">Coming soon</span>
        </button>
      </nav>
      <span className="prototype-badge">Sample map</span>
    </header>
  )
}

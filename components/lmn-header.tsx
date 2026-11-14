import { MapPin } from 'lucide-react'

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
      <span className="prototype-badge">Prototype · sample data</span>
    </header>
  )
}

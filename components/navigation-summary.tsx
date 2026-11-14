import { ChevronDown, Crosshair, Navigation } from 'lucide-react'

type NavigationSummaryProps = {
  onLocate: () => void
}

export function NavigationSummary({ onLocate }: NavigationSummaryProps) {
  return (
    <section className="prototype-bottom-sheet" aria-label="Navigation summary">
      <div className="sheet-handle" aria-hidden="true" />
      <div className="sheet-heading">
        <div>
          <p className="section-label">NEAR YOU</p>
          <h2>Explore UW Seattle</h2>
        </div>
        <button className="locate-button" type="button" onClick={onLocate} aria-label="Locate me">
          <Crosshair aria-hidden="true" />
        </button>
      </div>
      <button className="route-preview" type="button">
        <span className="route-icon"><Navigation aria-hidden="true" /></span>
        <span>
          <strong>Plan an accessible route</strong>
          <small>Choose a start and destination</small>
        </span>
        <ChevronDown aria-hidden="true" />
      </button>
    </section>
  )
}

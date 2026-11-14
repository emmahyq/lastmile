import { Crosshair } from 'lucide-react'

type NavigationSummaryProps = {
  onLocate: () => void
}

export function NavigationSummary({ onLocate }: NavigationSummaryProps) {
  return (
    <section className="prototype-bottom-sheet" aria-label="Navigation summary">
      <div className="sheet-handle" aria-hidden="true" />
      <div className="sheet-heading">
        <div>
          <p className="section-label">CAMPUS DETAILS</p>
          <h2>Explore UW Seattle</h2>
        </div>
        <button className="locate-button" type="button" onClick={onLocate} aria-label="Locate me">
          <Crosshair aria-hidden="true" />
        </button>
      </div>
      <p className="prototype-note">
        Route planning is not available yet. Map details are illustrative and have not been verified
        for current conditions.
      </p>
    </section>
  )
}

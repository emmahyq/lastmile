import { Accessibility, Crosshair, Filter } from 'lucide-react'
import type { MapAction } from '@/lib/map-types'

type MapControlsProps = {
  activeFilterCount: number
  accessibleRoutesEnabled: boolean
  onFilterToggle: () => void
  onAccessibleRoutesToggle: () => void
  onMapAction: (action: MapAction['type']) => void
  filtersExpanded: boolean
}

export function MapControls({
  activeFilterCount,
  accessibleRoutesEnabled,
  onFilterToggle,
  onAccessibleRoutesToggle,
  onMapAction,
  filtersExpanded,
}: MapControlsProps) {
  return (
    <>
      <div className="prototype-map-controls">
        <button
          className="filter-pill"
          type="button"
          onClick={onFilterToggle}
          aria-expanded={filtersExpanded}
        >
          <Filter aria-hidden="true" />
          Filter{activeFilterCount > 0 ? ` · ${activeFilterCount}` : ''}
        </button>
        <button
          className={accessibleRoutesEnabled ? 'accessibility-button selected' : 'accessibility-button'}
          type="button"
          onClick={onAccessibleRoutesToggle}
          aria-pressed={accessibleRoutesEnabled}
          aria-label="Toggle accessible routes"
        >
          <Accessibility aria-hidden="true" />
        </button>
      </div>

      <div className="prototype-zoom-controls" aria-label="Map zoom controls">
        <button type="button" onClick={() => onMapAction('zoom-in')} aria-label="Zoom in">
          +
        </button>
        <button type="button" onClick={() => onMapAction('zoom-out')} aria-label="Zoom out">
          −
        </button>
        <button type="button" onClick={() => onMapAction('locate')} aria-label="Find my location">
          <Crosshair aria-hidden="true" />
        </button>
      </div>
    </>
  )
}

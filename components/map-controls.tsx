import { Accessibility, Crosshair, Filter } from 'lucide-react'
import type { RefObject } from 'react'
import type { MapAction } from '@/lib/map-types'

type MapControlsProps = {
  activeFilterCount: number
  onFilterToggle: () => void
  onMapAction: (action: MapAction['type']) => void
  filtersExpanded: boolean
  filtersPanelId: string
  filterToggleRef: RefObject<HTMLButtonElement | null>
}

export function MapControls({
  activeFilterCount,
  onFilterToggle,
  onMapAction,
  filtersExpanded,
  filtersPanelId,
  filterToggleRef,
}: MapControlsProps) {
  return (
    <>
      <div className="prototype-map-controls">
        <button
          ref={filterToggleRef}
          className="filter-pill"
          type="button"
          onClick={onFilterToggle}
          aria-expanded={filtersExpanded}
          aria-controls={filtersPanelId}
        >
          <Filter aria-hidden="true" />
          Filter{activeFilterCount > 0 ? ` · ${activeFilterCount}` : ''}
        </button>
        <button
          className="accessibility-button"
          type="button"
          aria-label="Accessible routes (coming soon)"
          title="Accessible route guidance is coming soon."
          disabled
        >
          <Accessibility aria-hidden="true" />
        </button>
      </div>

      <div className="prototype-zoom-controls" role="group" aria-label="Map controls">
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

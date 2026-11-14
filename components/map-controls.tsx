import { Crosshair, Filter } from 'lucide-react'
import type { MapAction } from '@/lib/map-types'

type MapControlsProps = {
  activeFilterCount: number
  onFilterToggle: () => void
  onMapAction: (action: MapAction['type']) => void
  filtersExpanded: boolean
  filtersPanelId: string
}

export function MapControls({
  activeFilterCount,
  onFilterToggle,
  onMapAction,
  filtersExpanded,
  filtersPanelId,
}: MapControlsProps) {
  return (
    <>
      <div className="prototype-map-controls">
        <button
          className="filter-pill"
          type="button"
          onClick={onFilterToggle}
          aria-expanded={filtersExpanded}
          aria-controls={filtersPanelId}
        >
          <Filter aria-hidden="true" />
          Filter{activeFilterCount > 0 ? ` · ${activeFilterCount}` : ''}
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

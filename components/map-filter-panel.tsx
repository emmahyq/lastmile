import { X } from 'lucide-react'
import type { MapLayerId } from '@/lib/map-types'

type FilterOption = {
  id: MapLayerId
  label: string
  tone: 'coral' | 'amber' | 'blue'
}

type MapFilterPanelProps = {
  id: string
  activeLayers: MapLayerId[]
  hidden: boolean
  onLayerToggle: (layer: MapLayerId) => void
  onClose: () => void
}

const filterOptions: FilterOption[] = [
  { id: 'no-go', label: 'Lime no-go zones', tone: 'coral' },
  { id: 'terrain', label: 'Stairs & slopes', tone: 'amber' },
  { id: 'parking', label: 'Parking areas', tone: 'blue' },
]

export function MapFilterPanel({
  id,
  activeLayers,
  hidden,
  onLayerToggle,
  onClose,
}: MapFilterPanelProps) {
  return (
    <section
      id={id}
      className="prototype-filter-panel"
      aria-labelledby={`${id}-title`}
      hidden={hidden}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose()
      }}
    >
      <div className="filter-panel-heading">
        <div>
          <p className="section-label">MAP FILTERS</p>
          <h2 id={`${id}-title`}>Map filters</h2>
        </div>
        <button className="close-filter" type="button" onClick={onClose} aria-label="Close filters">
          <X aria-hidden="true" />
        </button>
      </div>
      <p className="filter-help">Toggle layers to highlight accessibility details on the map.</p>
      {filterOptions.map(({ id, label, tone }) => {
        const isActive = activeLayers.includes(id)

        return (
          <button
            key={id}
            className={`filter-option ${tone}${isActive ? ' active' : ''}`}
            type="button"
            onClick={() => onLayerToggle(id)}
            aria-pressed={isActive}
          >
            <span className={`filter-swatch ${tone}`} aria-hidden="true" />
            {label}
            <span className={`filter-check${isActive ? ' checked' : ''}`} aria-hidden="true">
              {isActive ? '✓' : ''}
            </span>
          </button>
        )
      })}
    </section>
  )
}

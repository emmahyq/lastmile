'use client'

import { useId, useState } from 'react'
import { CampusMap } from '@/components/campus-map'
import { MapControls } from '@/components/map-controls'
import { MapFilterPanel } from '@/components/map-filter-panel'
import { NavigationSummary } from '@/components/navigation-summary'
import { LmnHeader } from '@/components/lmn-header'
import type { MapAction, MapLayerId } from '@/lib/map-types'

export function LmnApp() {
  const filterPanelId = useId()
  const [activeLayers, setActiveLayers] = useState<MapLayerId[]>([])
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [mapAction, setMapAction] = useState<MapAction>()
  const [locationError, setLocationError] = useState<string | null>(null)

  const requestMapAction = (type: MapAction['type']) => {
    setMapAction({ type, id: Date.now() })
  }

  const toggleMapLayer = (layer: MapLayerId) => {
    setActiveLayers((currentLayers) =>
      currentLayers.includes(layer)
        ? currentLayers.filter((activeLayer) => activeLayer !== layer)
        : [...currentLayers, layer],
    )
  }

  return (
    <main className="prototype-shell">
      <LmnHeader />

      <aside className="prototype-sidebar">
        <section className="prototype-intro">
          <h1>Last Mile Navigator</h1>
          <p>Explore illustrative accessibility details around campus.</p>
        </section>
        <NavigationSummary onLocate={() => requestMapAction('locate')} />
      </aside>

      <section className="prototype-map-section" aria-label="UW Seattle campus map">
        <CampusMap
          activeLayers={activeLayers}
          action={mapAction}
          onLocationError={setLocationError}
        />
        {locationError && <p className="location-status" role="status">{locationError}</p>}
        <MapControls
          activeFilterCount={activeLayers.length}
          filtersExpanded={filtersVisible}
          filtersPanelId={filterPanelId}
          onFilterToggle={() => setFiltersVisible((isVisible) => !isVisible)}
          onMapAction={requestMapAction}
        />
        <MapFilterPanel
          id={filterPanelId}
          activeLayers={activeLayers}
          hidden={!filtersVisible}
          onLayerToggle={toggleMapLayer}
          onClose={() => setFiltersVisible(false)}
        />
      </section>
    </main>
  )
}

'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { CampusMap } from '@/components/campus-map'
import { MapControls } from '@/components/map-controls'
import { MapFilterPanel } from '@/components/map-filter-panel'
import { NavigationSummary } from '@/components/navigation-summary'
import { LmnHeader } from '@/components/lmn-header'
import type { MapAction, MapLayerId } from '@/lib/map-types'

export function LmnApp() {
  const filterPanelId = useId()
  const filterToggleRef = useRef<HTMLButtonElement>(null)
  const filterCloseRef = useRef<HTMLButtonElement>(null)
  const [activeLayers, setActiveLayers] = useState<MapLayerId[]>([])
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [mapAction, setMapAction] = useState<MapAction>()
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    if (filtersVisible) filterCloseRef.current?.focus()
  }, [filtersVisible])

  const requestMapAction = (type: MapAction['type']) => {
    setMapAction({ type, id: Date.now() })
  }

  const closeFilterPanel = () => {
    setFiltersVisible(false)
    filterToggleRef.current?.focus()
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
          <label className="prototype-search">
            <Search aria-hidden="true" />
            <span className="sr-only">Search campus locations (coming soon)</span>
            <input
              type="search"
              placeholder="Search campus locations"
              aria-label="Search campus locations (coming soon)"
              disabled
            />
            <span className="prototype-search-status" aria-hidden="true">Soon</span>
          </label>
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
          filterToggleRef={filterToggleRef}
          onFilterToggle={() => setFiltersVisible((isVisible) => !isVisible)}
          onMapAction={requestMapAction}
        />
        <MapFilterPanel
          id={filterPanelId}
          closeButtonRef={filterCloseRef}
          activeLayers={activeLayers}
          hidden={!filtersVisible}
          onLayerToggle={toggleMapLayer}
          onClose={closeFilterPanel}
        />
      </section>
    </main>
  )
}

'use client'

import { useState } from 'react'
import { Menu, Search } from 'lucide-react'
import { CampusMap } from '@/components/campus-map'
import { MapControls } from '@/components/map-controls'
import { MapFilterPanel } from '@/components/map-filter-panel'
import { NavigationSummary } from '@/components/navigation-summary'
import { WayfinderHeader, type NavigationTab } from '@/components/wayfinder-header'
import type { MapAction, MapLayerId } from '@/lib/map-types'

export function WayfinderApp() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('Home')
  const [activeLayers, setActiveLayers] = useState<MapLayerId[]>([])
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [accessibleRoutesEnabled, setAccessibleRoutesEnabled] = useState(false)
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
      <WayfinderHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <aside className="prototype-sidebar">
        <section className="prototype-intro">
          <h1>Last Mile Navigator</h1>
          <p>Find the best accessible routes across campus</p>
          <label className="prototype-search">
            <Menu aria-hidden="true" />
            <span className="sr-only">Search last mile navigator</span>
            <input placeholder="Search Last Mile Navigator" aria-label="Search Last Mile Navigator" />
            <Search aria-hidden="true" />
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
          accessibleRoutesEnabled={accessibleRoutesEnabled}
          filtersExpanded={filtersVisible}
          onFilterToggle={() => setFiltersVisible((isVisible) => !isVisible)}
          onAccessibleRoutesToggle={() => setAccessibleRoutesEnabled((isEnabled) => !isEnabled)}
          onMapAction={requestMapAction}
        />
      </section>

      {filtersVisible && (
        <MapFilterPanel
          activeLayers={activeLayers}
          onLayerToggle={toggleMapLayer}
          onClose={() => setFiltersVisible(false)}
        />
      )}
    </main>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import type L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { MapAction, MapLayerId } from '@/lib/map-types'

type CampusMapProps = {
  activeLayers: MapLayerId[]
  action?: MapAction
  onLocationError?: (message: string | null) => void
}

type MapOverlays = Record<MapLayerId, L.LayerGroup>

const CAMPUS_CENTER: [number, number] = [47.6553, -122.3035]
const INITIAL_ZOOM = 16
const LOCATION_MARKER_STYLE = {
  radius: 9,
  color: '#ffffff',
  weight: 3,
  fillColor: '#1178b5',
  fillOpacity: 1,
}

function createMapOverlays(leaflet: typeof import('leaflet')): MapOverlays {
  const noGoZones = leaflet.layerGroup([
    leaflet
      .circle([47.658, -122.307], {
        radius: 140,
        color: '#b42318',
        fillColor: '#fecdca',
        fillOpacity: 0.55,
        weight: 2,
      })
      .bindTooltip('Lime no-go zone', { sticky: true }),
    leaflet
      .polygon(
        [
          [47.6539, -122.3025],
          [47.6552, -122.3012],
          [47.6548, -122.2994],
          [47.6536, -122.3003],
        ],
        {
          color: '#b42318',
          fillColor: '#fecdca',
          fillOpacity: 0.65,
          weight: 2,
        },
      )
      .bindTooltip('Scooters not permitted here', { sticky: true }),
  ])

  const terrain = leaflet.layerGroup([
    leaflet
      .polyline(
        [
          [47.6575, -122.305],
          [47.6567, -122.3042],
          [47.6558, -122.3036],
          [47.6547, -122.303],
        ],
        { color: '#b54708', weight: 7, opacity: 0.85 },
      )
      .bindTooltip('Steep slope · 8%', { sticky: true }),
    leaflet
      .marker([47.6538, -122.304], {
        icon: leaflet.divIcon({
          className: 'stairs-marker',
          html: '<span aria-label="Stairs">≋</span>',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
      })
      .bindTooltip('Stairs · 12 steps', { sticky: true }),
    leaflet
      .marker([47.6562, -122.3008], {
        icon: leaflet.divIcon({
          className: 'stairs-marker',
          html: '<span aria-label="Stairs">≋</span>',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
      })
      .bindTooltip('Stairs · alternate route available', { sticky: true }),
  ])

  const parking = leaflet.layerGroup([
    leaflet
      .circleMarker([47.6542, -122.3065], {
        radius: 10,
        color: '#075985',
        fillColor: '#38bdf8',
        fillOpacity: 0.9,
        weight: 3,
      })
      .bindTooltip('Accessible parking · 4 spaces', { sticky: true }),
    leaflet
      .circleMarker([47.6572, -122.3005], {
        radius: 10,
        color: '#075985',
        fillColor: '#38bdf8',
        fillOpacity: 0.9,
        weight: 3,
      })
      .bindTooltip('Micromobility parking · 8 docks', { sticky: true }),
    leaflet
      .circleMarker([47.6526, -122.302], {
        radius: 10,
        color: '#075985',
        fillColor: '#38bdf8',
        fillOpacity: 0.9,
        weight: 3,
      })
      .bindTooltip('Accessible parking · 2 spaces', { sticky: true }),
  ])

  return { 'no-go': noGoZones, terrain, parking }
}

export function CampusMap({ activeLayers, action, onLocationError }: CampusMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mapReady, setMapReady] = useState(false)
  const mapRef = useRef<L.Map | null>(null)
  const leafletRef = useRef<typeof import('leaflet') | null>(null)
  const overlaysRef = useRef<MapOverlays | null>(null)
  const locationMarkerRef = useRef<L.CircleMarker | null>(null)
  const locationWatchRef = useRef<number | null>(null)

  useEffect(() => {
    let isUnmounted = false
    let map: L.Map | null = null

    async function initializeMap() {
      const leaflet = (await import('leaflet')).default
      const container = containerRef.current

      if (isUnmounted || !container) return

      map = leaflet
        .map(container, { zoomControl: false, attributionControl: true })
        .setView(CAMPUS_CENTER, INITIAL_ZOOM)

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors',
        })
        .addTo(map)
      leaflet.control.zoom({ position: 'bottomright' }).addTo(map)

      leafletRef.current = leaflet
      mapRef.current = map
      overlaysRef.current = createMapOverlays(leaflet)
      setMapReady(true)
    }

    void initializeMap()

    return () => {
      isUnmounted = true

      if (locationWatchRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(locationWatchRef.current)
      }

      map?.remove()
      locationWatchRef.current = null
      mapRef.current = null
      leafletRef.current = null
      overlaysRef.current = null
      locationMarkerRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const overlays = overlaysRef.current

    if (!mapReady || !map || !overlays) return

    Object.entries(overlays).forEach(([layerId, layer]) => {
      if (activeLayers.includes(layerId as MapLayerId)) {
        layer.addTo(map)
      } else {
        map.removeLayer(layer)
      }
    })
  }, [activeLayers, mapReady])

  useEffect(() => {
    const map = mapRef.current

    if (!mapReady || !map || !action) return

    if (action.type === 'zoom-in') {
      map.zoomIn()
      return
    }

    if (action.type === 'zoom-out') {
      map.zoomOut()
      return
    }

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      onLocationError?.('Location is not available in this browser.')
      return
    }

    onLocationError?.(null)

    if (locationWatchRef.current !== null) {
      navigator.geolocation.clearWatch(locationWatchRef.current)
    }

    let isFirstPosition = true

    locationWatchRef.current = navigator.geolocation.watchPosition(
      ({ coords }) => {
        onLocationError?.(null)

        const position: L.LatLngExpression = [coords.latitude, coords.longitude]

        if (locationMarkerRef.current) {
          locationMarkerRef.current.setLatLng(position)
        } else {
          const leaflet = leafletRef.current

          if (!leaflet) return

          locationMarkerRef.current = leaflet
            .circleMarker(position, LOCATION_MARKER_STYLE)
            .bindTooltip('Your current location')
            .addTo(map)
        }

        if (isFirstPosition) {
          map.setView(position, Math.max(map.getZoom(), 17))
          isFirstPosition = false
        }
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? 'Allow location access in your browser to show your position.'
            : error.code === error.TIMEOUT
              ? 'Could not get your location yet. Please try again.'
              : 'Your location is unavailable right now.'

        onLocationError?.(message)
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 },
    )
  }, [action, mapReady, onLocationError])

  return (
    <div
      ref={containerRef}
      className="campus-map"
      aria-label="Interactive map of the University of Washington Seattle campus"
      role="region"
      aria-roledescription="map"
    />
  )
}

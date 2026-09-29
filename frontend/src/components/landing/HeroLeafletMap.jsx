import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  Tooltip as LeafletTooltip,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { REGIONS_FALLBACK } from '../../utils/api.js';
import { go } from '../../router.js';

/**
 * Interactive Leaflet Map for the Landing Page Hero section.
 * Replaces the canvas storm cloud with high-resolution GEBCO elevation & ocean bathymetry relief
 * centered over the Indian subcontinent with interactive radar beacons for the 8 metro regions.
 */
export default function HeroLeafletMap({ regions = REGIONS_FALLBACK, worstSev = 'yellow' }) {
  const [basemap, setBasemap] = useState('dark'); // 'dark' | 'relief' | 'satellite'

  const metroList = regions && regions.length > 0 ? regions : REGIONS_FALLBACK;

  const handleMetroClick = (regionId) => {
    try {
      sessionStorage.setItem('br_region', regionId);
    } catch {
      // storage unavailable
    }
    go('/app');
  };

  return (
    <div className="hero-leaflet-wrap">
      <MapContainer
        center={[22.5, 82.5]}
        zoom={4.4}
        minZoom={3}
        maxZoom={10}
        scrollWheelZoom={false}
        attributionControl={false}
        className="hero-leaflet-container"
      >
        {/* Basemap Selection */}
        {basemap === 'relief' || basemap === 'gebco' ? (
          <TileLayer
            key="relief"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri &mdash; World Topography &amp; Relief"
            maxZoom={18}
          />
        ) : basemap === 'satellite' ? (
          <>
            <TileLayer
              key="sat-base"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri World Imagery"
              maxZoom={18}
            />
            <TileLayer
              key="sat-ref"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
              zIndex={5}
              opacity={0.85}
              maxZoom={18}
            />
          </>
        ) : (
          <>
            {/* Esri Dark Canvas Base (Continents, oceans, terrain) */}
            <TileLayer
              key="dark-base"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri &mdash; Dark Canvas GIS"
              maxZoom={16}
            />
            {/* Reference Overlay: Country boundaries, coastlines, and place labels */}
            <TileLayer
              key="dark-ref"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
              zIndex={5}
              opacity={0.88}
              maxZoom={16}
            />
          </>
        )}

        {/* 8 Indian Metro Convective Nowcast Beacons */}
        {metroList.map((m) => (
          <React.Fragment key={m.id}>
            {/* Outer animated radar pulse ring */}
            <Circle
              center={m.center}
              radius={68000}
              pathOptions={{
                color: '#38bdf8',
                fillColor: '#38bdf8',
                fillOpacity: 0.16,
                weight: 1.4,
                dashArray: '4, 4',
              }}
              eventHandlers={{
                click: () => handleMetroClick(m.id),
              }}
            />

            {/* Inner radar ping */}
            <Circle
              center={m.center}
              radius={32000}
              pathOptions={{
                color: '#60a5fa',
                fillColor: '#38bdf8',
                fillOpacity: 0.28,
                weight: 1.2,
              }}
              eventHandlers={{
                click: () => handleMetroClick(m.id),
              }}
            />

            {/* Center Beacon Marker */}
            <CircleMarker
              center={m.center}
              radius={7.5}
              pathOptions={{
                color: '#ffffff',
                fillColor: '#0284c7',
                fillOpacity: 0.95,
                weight: 2.5,
              }}
              eventHandlers={{
                click: () => handleMetroClick(m.id),
              }}
            >
              <LeafletTooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                <div style={{ padding: '3px 6px', textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 800, fontSize: 12, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: 10, color: '#38bdf8', marginTop: 2, fontWeight: 600 }}>
                    Live Convective Nowcast →
                  </div>
                </div>
              </LeafletTooltip>
            </CircleMarker>
          </React.Fragment>
        ))}
      </MapContainer>

      {/* Floating Basemap Style Switcher */}
      <div className="hero-map-basemap-toggle">
        <button
          type="button"
          className={`hero-map-btn ${basemap === 'dark' || basemap === 'osm_dark' ? 'active' : ''}`}
          onClick={() => setBasemap('dark')}
          title="Esri Dark Canvas GIS"
        >
          🌌 Dark GIS
        </button>
        <button
          type="button"
          className={`hero-map-btn ${basemap === 'relief' || basemap === 'gebco' ? 'active' : ''}`}
          onClick={() => setBasemap('relief')}
          title="Physical Topographic & Mountain Relief"
        >
          🏔️ Topo Relief
        </button>
        <button
          type="button"
          className={`hero-map-btn ${basemap === 'satellite' ? 'active' : ''}`}
          onClick={() => setBasemap('satellite')}
          title="High-Resolution Satellite Imagery"
        >
          🛰️ Satellite
        </button>
      </div>
    </div>
  );
}

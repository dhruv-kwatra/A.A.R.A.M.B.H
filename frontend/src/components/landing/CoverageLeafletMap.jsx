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

const SEV_COLORS = {
  yellow: '#facc15',
  orange: '#fb923c',
  red: '#f87171',
};

/**
 * High-resolution Leaflet map replacing the static SVG outline in the 
 * "Built for India's storm corridors" (COVERAGE) section.
 * Renders the global GEBCO Topographic & Bathymetric Physical Relief layer
 * with live convective nowcast beacon radars for all 8 Indian metros.
 */
export default function CoverageLeafletMap({
  regions = REGIONS_FALLBACK,
  byId = {},
  hoveredId = null,
  onSelectRegion,
}) {
  const [basemap, setBasemap] = useState('dark'); // 'dark' | 'relief' | 'satellite'
  const metroList = regions && regions.length > 0 ? regions : REGIONS_FALLBACK;

  const handleMetroClick = (regionId) => {
    if (onSelectRegion) {
      onSelectRegion(regionId);
      return;
    }
    try {
      sessionStorage.setItem('br_region', regionId);
    } catch {
      // storage unavailable
    }
    go('/app');
  };

  return (
    <div className="coverage-map-card">
      {/* Top Glassmorphic Status Bar */}
      <div className="coverage-map-head">
        <div className="coverage-map-title">
          <span className="cov-pulse-dot" />
          <span className="cov-badge">Interactive GIS Coverage</span>
          <span className="cov-sub">8 Convective Radar Domains</span>
        </div>
        <div className="coverage-map-actions">
          <button
            type="button"
            className={`cov-btn ${basemap === 'dark' || basemap === 'osm_dark' ? 'active' : ''}`}
            onClick={() => setBasemap('dark')}
            title="Esri Dark Canvas GIS"
          >
            🌌 Dark GIS
          </button>
          <button
            type="button"
            className={`cov-btn ${basemap === 'relief' || basemap === 'gebco' ? 'active' : ''}`}
            onClick={() => setBasemap('relief')}
            title="Physical Topographic & Mountain Relief"
          >
            🏔️ Topo Relief
          </button>
          <button
            type="button"
            className={`cov-btn ${basemap === 'satellite' ? 'active' : ''}`}
            onClick={() => setBasemap('satellite')}
            title="Satellite Imagery"
          >
            🛰️ Satellite
          </button>
        </div>
      </div>

      {/* Interactive Map Viewport */}
      <div className="coverage-map-viewport">
        <MapContainer
          center={[22.8, 80.5]}
          zoom={4.3}
          minZoom={3.5}
          maxZoom={9}
          scrollWheelZoom={false}
          attributionControl={false}
          className="coverage-map-leaflet"
        >
          {basemap === 'relief' || basemap === 'gebco' ? (
            <TileLayer
              key="cov-relief"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri World Topography"
              maxZoom={18}
            />
          ) : basemap === 'satellite' ? (
            <>
              <TileLayer
                key="cov-sat-base"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="&copy; Esri Satellite"
                maxZoom={18}
              />
              <TileLayer
                key="cov-sat-ref"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                zIndex={5}
                opacity={0.85}
                maxZoom={18}
              />
            </>
          ) : (
            <>
              {/* Esri Dark Canvas Base */}
              <TileLayer
                key="cov-dark-base"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                attribution="&copy; Esri Dark Canvas GIS"
                maxZoom={16}
              />
              {/* Reference Boundaries & City Labels */}
              <TileLayer
                key="cov-dark-ref"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
                zIndex={5}
                opacity={0.88}
                maxZoom={16}
              />
            </>
          )}

          {/* 8 Indian Convective Radar Windows */}
          {metroList.map((m) => {
            const isHovered = hoveredId === m.id;
            const live = byId[m.id];
            const cellCount = live ? live.total : 0;
            const worst = live ? live.worst : 'yellow';
            const accent = SEV_COLORS[worst] || '#38bdf8';

            return (
              <React.Fragment key={m.id}>
                {/* Outer animated radar pulse ring */}
                <Circle
                  center={m.center}
                  radius={isHovered ? 95000 : 70000}
                  pathOptions={{
                    color: isHovered ? '#67e8f9' : accent,
                    fillColor: isHovered ? '#38bdf8' : accent,
                    fillOpacity: isHovered ? 0.35 : 0.16,
                    weight: isHovered ? 2.5 : 1.4,
                    dashArray: isHovered ? '2, 2' : '4, 4',
                  }}
                  eventHandlers={{
                    click: () => handleMetroClick(m.id),
                  }}
                />

                {/* Inner radar ping */}
                <Circle
                  center={m.center}
                  radius={isHovered ? 45000 : 32000}
                  pathOptions={{
                    color: '#ffffff',
                    fillColor: accent,
                    fillOpacity: isHovered ? 0.5 : 0.28,
                    weight: isHovered ? 2 : 1.2,
                  }}
                  eventHandlers={{
                    click: () => handleMetroClick(m.id),
                  }}
                />

                {/* Center Beacon Marker */}
                <CircleMarker
                  center={m.center}
                  radius={isHovered ? 9.5 : 7.5}
                  pathOptions={{
                    color: '#ffffff',
                    fillColor: isHovered ? '#0284c7' : '#0369a1',
                    fillOpacity: 0.95,
                    weight: 2.5,
                  }}
                  eventHandlers={{
                    click: () => handleMetroClick(m.id),
                  }}
                >
                  <LeafletTooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                    <div className="cov-marker-popup">
                      <div className="cov-marker-name">{m.name}</div>
                      <div className="cov-marker-coords">
                        {m.center[0].toFixed(2)}°N {m.center[1].toFixed(2)}°E
                      </div>
                      <div className="cov-marker-cells">
                        <span className="cov-dot" style={{ background: accent }} />
                        {cellCount} convective cells
                      </div>
                      <div className="cov-marker-cta">Tap to Launch Nowcast →</div>
                    </div>
                  </LeafletTooltip>
                </CircleMarker>
              </React.Fragment>
            );
          })}
        </MapContainer>

        {/* Legend / Overlay Hint */}
        <div className="coverage-map-legend">
          <div className="cov-leg-item">
            <span className="cov-leg-swatch brown" />
            <span>High Relief / Himalayas</span>
          </div>
          <div className="cov-leg-item">
            <span className="cov-leg-swatch green" />
            <span>Lowland Basins</span>
          </div>
          <div className="cov-leg-item">
            <span className="cov-leg-swatch blue" />
            <span>Ocean Bathymetry</span>
          </div>
        </div>
      </div>
    </div>
  );
}

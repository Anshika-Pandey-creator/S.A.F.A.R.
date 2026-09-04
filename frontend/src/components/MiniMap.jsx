import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

const createMiniIcon = (color) => {
  const svgHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="24" height="24" style="filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.5));">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;
  return L.divIcon({
    html: svgHtml,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -20]
  });
};

export default function MiniMap({
  center = { lat: 26.1445, lng: 91.7362 },
  zoom = 11,
  height = "160px",
  geofences = [],
  title = "Location Preview",
  markerColor = "#10B981"
}) {
  const lat = center?.lat || 26.1445;
  const lng = center?.lng || 91.7362;

  return (
    <div className="w-full relative rounded-xl overflow-hidden border border-slate-700/80 shadow-md">
      <div className="absolute top-2 left-2 z-20 bg-navy-900/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-slate-300 border border-slate-700">
        📍 {title}
      </div>
      <div style={{ height }}>
        <MapContainer
          center={[lat, lng]}
          zoom={zoom}
          maxZoom={22}
          scrollWheelZoom={false}
          dragging={true}
          zoomControl={false}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; Google Maps HD'
            url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            maxZoom={22}
            maxNativeZoom={20}
          />

          {geofences.map((gf) => (
            <Polygon
              key={gf.id}
              positions={gf.coordinates}
              pathOptions={{
                color: gf.strokeColor || gf.color,
                fillColor: gf.color,
                fillOpacity: 0.2,
                weight: 1.5
              }}
            />
          ))}

          <Marker position={[lat, lng]} icon={createMiniIcon(markerColor)}>
            <Popup>
              <span className="text-xs font-bold text-white">Target Location</span>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

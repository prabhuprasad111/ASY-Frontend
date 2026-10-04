import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, LayersControl, LayerGroup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import apiClient from '../api/client';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom highly visible icons for the overlays
const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color}; 
        width: 28px; 
        height: 28px; 
        border-radius: 50%; 
        border: 3px solid #ffffff; 
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 8px; height: 8px; background: white; border-radius: 50%; opacity: 0.8;"></div>
      </div>
    `,
    className: 'custom-leaflet-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

// Data sourced from the provided master Excel
const VILLAGE_LOCATIONS = [
  { id: 1, name: 'Gendapokhari', range: 'Pithabata North', lat: 21.9500, lng: 86.7200, shgs: 5, income: '12.5L', pop: 890 },
  { id: 2, name: 'Digdiga', range: 'Pithabata South', lat: 21.9200, lng: 86.7000, shgs: 4, income: '10.8L', pop: 815 },
  { id: 3, name: 'Kabatghai', range: 'Dukura', lat: 21.8500, lng: 86.7500, shgs: 5, income: '13.2L', pop: 860 },
  { id: 4, name: 'Podadiha', range: 'Podadiha', lat: 21.6500, lng: 86.5000, shgs: 7, income: '21.5L', pop: 1180 },
  { id: 5, name: 'Mohanpur', range: 'Nawana North', lat: 21.8833, lng: 86.4167, shgs: 6, income: '18.6L', pop: 1045 },
  { id: 6, name: 'Barehipani', range: 'Barehipani', lat: 21.9333, lng: 86.3833, shgs: 4, income: '8.5L', pop: 575 },
  { id: 7, name: 'Gudgudia', range: 'Gudgudia', lat: 21.9211, lng: 86.3911, shgs: 5, income: '14.2L', pop: 701 },
  { id: 8, name: 'Talabandha', range: 'Talabandha', lat: 21.9800, lng: 86.3500, shgs: 7, income: '21.4L', pop: 980 },
  { id: 9, name: 'Kendumundi', range: 'Kendumundi', lat: 21.8000, lng: 86.2000, shgs: 6, income: '18.9L', pop: 1120 },
  { id: 10, name: 'Rajpal', range: 'Thakurmunda', lat: 21.6000, lng: 86.1500, shgs: 7, income: '24.5L', pop: 1285 },
];

const SHG_ENTERPRISES = [
  { lat: 21.9500, lng: 86.7200, label: 'Honey Processing Hub', type: 'NTFP', color: '#f59e0b' },
  { lat: 21.8500, lng: 86.7500, label: 'Lac Cultivation Cluster', type: 'NTFP', color: '#f59e0b' },
  { lat: 21.6500, lng: 86.5000, label: 'NTFP Aggregation Centre', type: 'Marketing', color: '#3b82f6' },
  { lat: 21.8833, lng: 86.4167, label: 'Tamarind Processing Unit', type: 'NTFP', color: '#f59e0b' },
  { lat: 21.9211, lng: 86.3911, label: 'Eco-Tourism Guide Services', type: 'Eco-Tourism', color: '#10b981' },
  { lat: 21.9800, lng: 86.3500, label: 'NTFP Marketing Hub', type: 'Marketing', color: '#3b82f6' },
  { lat: 21.6000, lng: 86.1500, label: 'Handicrafts & Eco-Tourism', type: 'Eco-Tourism', color: '#10b981' },
  { lat: 21.9000, lng: 86.4500, label: 'Similipal Nature Camp', type: 'Eco-Tourism', color: '#10b981' },
  { lat: 21.9300, lng: 86.6000, label: 'Sal Leaf Plate Making', type: 'NTFP', color: '#f59e0b' },
  { lat: 21.8200, lng: 86.4000, label: 'Spices Marketing Unit', type: 'Marketing', color: '#3b82f6' },
];

export default function GISMap() {
  const [activeLayer, setActiveLayer] = useState('All');
  const [dynamicEnterprises, setDynamicEnterprises] = useState<any[]>(SHG_ENTERPRISES);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Fetch dynamically created resources from backend
    apiClient.get('/resources')
      .then(res => {
        if (res.data && res.data.success) {
          const newPins = res.data.data.map((r: any) => {
            let color = '#ec4899'; // Pink for Newly Added
            let type = 'Newly Added';
            
            if (r.description === 'NTFP') { color = '#f59e0b'; type = 'NTFP'; }
            else if (r.description === 'Eco-Tourism') { color = '#10b981'; type = 'Eco-Tourism'; }
            else if (r.description === 'Marketing') { color = '#3b82f6'; type = 'Marketing'; }

            return {
              lat: r.latitude || (21.85 + Math.random() * 0.1),
              lng: r.longitude || (86.45 + Math.random() * 0.1),
              label: r.resourceName || 'New Resource',
              type: type,
              color: color
            };
          });
          setDynamicEnterprises([...SHG_ENTERPRISES, ...newPins]);
        }
      })
      .catch(err => console.warn("Backend not running yet, using master data only."))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredEnterprises = activeLayer === 'All'
    ? dynamicEnterprises
    : dynamicEnterprises.filter(r => r.type === activeLayer);

  return (
    <div>
      <style>{`
        .custom-leaflet-icon { background: transparent; border: none; }
        .pulse { animation: pulse-animation 2s infinite; }
        @keyframes pulse-animation { 0% { box-shadow: 0 0 0 0px rgba(0,0,0,0.2); } 100% { box-shadow: 0 0 0 10px rgba(0,0,0,0); } }
      `}</style>
      
      <div className="page-head" style={{ marginBottom: '16px' }}>
        <div>
          <div className="eyebrow" style={{ color: '#0ea5e9' }}>Spatial Intelligence</div>
          <h1 style={{ fontSize: '2.2rem' }}>Similipal GIS & Livelihood Overlays</h1>
          <p style={{ color: '#64748b' }}>Interactive map overlays tracking EDCs, SHG Enterprise Hubs, and NTFP value chains across the ranges.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {['All', 'NTFP', 'Eco-Tourism', 'Marketing', 'Newly Added'].map(l => (
          <button
            key={l}
            style={{
              padding: '10px 20px', borderRadius: '24px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
              background: activeLayer === l ? '#0f172a' : '#fff',
              color: activeLayer === l ? '#fff' : '#475569',
              border: activeLayer === l ? '2px solid #0f172a' : '2px solid #cbd5e1',
              boxShadow: activeLayer === l ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
            }}
            onClick={() => setActiveLayer(l)}
          >
            {l === 'All' ? 'All Enterprise Layers' : l}
          </button>
        ))}
      </div>

      <div className="grid-12">
        <article className="panel span-12" style={{ padding: 0, overflow: 'hidden', position: 'relative', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
          
          {/* Floating Action Panel Over Map */}
          <div style={{
            position: 'absolute', top: '24px', right: '24px', zIndex: 1000, 
            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
            padding: '16px 20px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.5)', minWidth: '220px'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', color: '#0f172a' }}>
              {activeLayer === 'All' ? 'All Enterprises' : activeLayer} Overlays
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#3b82f6' }}>{filteredEnterprises.length}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.2 }}>Active Projects<br/>in this view</div>
            </div>
          </div>

          <MapContainer
            center={[21.8500, 86.4500]}
            zoom={10}
            style={{ height: '650px', width: '100%', zIndex: 1 }}
            zoomControl={false}
          >
            <LayersControl position="bottomright">
              <LayersControl.BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Satellite (Esri)">
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution="Tiles &copy; Esri"
                />
              </LayersControl.BaseLayer>
              
              {/* Village Nodes */}
              <LayersControl.Overlay name="Show Village Borders (EDCs)">
                <LayerGroup>
                  {VILLAGE_LOCATIONS.map((v) => (
                    <Marker key={v.id} position={[v.lat, v.lng]}>
                      <Popup>
                        <div style={{ minWidth: 160, padding: '4px' }}>
                          <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{v.name}</strong><br />
                          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Range: {v.range}</span><br />
                          <hr style={{margin: '8px 0', border: 'none', borderTop: '1px solid #e2e8f0'}}/>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.85rem', color: '#475569' }}>Population:</span>
                            <strong style={{ fontSize: '0.85rem' }}>{v.pop}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.85rem', color: '#475569' }}>Active SHGs:</span>
                            <strong style={{ fontSize: '0.85rem' }}>{v.shgs}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.85rem', color: '#475569' }}>Income Gen:</span>
                            <strong style={{ fontSize: '0.85rem', color: '#059669' }}>₹{v.income}</strong>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
            </LayersControl>

            {/* Enterprise Clusters - NO LAYER CONTROL (Always Visible to prevent hiding) */}
            {filteredEnterprises.map((r, i) => (
              <Marker
                key={`res-${i}`}
                position={[r.lat, r.lng]}
                icon={createCustomIcon(r.color)}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  <div style={{ textAlign: 'center', padding: '4px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{r.label}</div>
                    <div style={{ fontSize: '0.75rem', color: r.color, fontWeight: 600, marginTop: '2px', textTransform: 'uppercase' }}>
                      {r.type} LAYER
                    </div>
                  </div>
                </Tooltip>
              </Marker>
            ))}

          </MapContainer>
        </article>
      </div>

      {/* Legend */}
      <div style={{ marginTop: '24px', padding: '16px 24px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#0f172a', fontSize: '0.9rem', textTransform: 'uppercase' }}>Map Legend</h4>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#334155', fontWeight: 500 }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#f59e0b', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></span>
            NTFP Processing
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#334155', fontWeight: 500 }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#10b981', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></span>
            Eco-Tourism
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#334155', fontWeight: 500 }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#3b82f6', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></span>
            Marketing / Aggregation Hub
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#334155', fontWeight: 500 }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#ec4899', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></span>
            Newly Added
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#334155', fontWeight: 500 }}>
            <img src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png" style={{ height: 20 }} alt="marker" />
            Village / EDC Base Node (Toggleable in Layers)
          </div>
        </div>
      </div>
    </div>
  );
}

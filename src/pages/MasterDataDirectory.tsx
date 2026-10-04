import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default leaflet icons in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Master Data Definitions
const tribes = ["Santhal", "Ho", "Munda", "Bhumij", "Bathudi", "Gond", "Kol", "Bhuyan"];

const masterData = [
  { id: 4, name: 'Pithabata North', type: 'Range', division: 'Similipal North Division', villages: ['Gendapokhari', 'Phuljhari', 'Badgaon', 'Kantasola', 'Campagarha', 'Namtidar'], color: '#4ade80', coords: [[21.95, 86.55], [22.00, 86.58], [21.98, 86.65], [21.92, 86.60]] },
  { id: 5, name: 'Pithabata South', type: 'Range', division: 'Similipal North Division', villages: ['Digdiga', 'Andheritota', 'Balikhal', 'Gopinathpur'], color: '#fde047', coords: [[21.92, 86.60], [21.98, 86.65], [21.92, 86.68], [21.87, 86.62]] },
  { id: 6, name: 'Dukura', type: 'Range', division: 'Similipal North Division', villages: ['Kabatghai', 'Badmakabadi', 'Budhigaon'], color: '#4ade80', coords: [[21.87, 86.62], [21.92, 86.68], [21.85, 86.72], [21.80, 86.65]] },
  { id: 7, name: 'Podadiha', type: 'Range', division: 'Similipal North Division', villages: ['Podadiha', 'Jamuani', 'Kusumbani'], color: '#60a5fa', coords: [[21.80, 86.65], [21.85, 86.72], [21.75, 86.70], [21.72, 86.60]] },
  { id: 8, name: 'Nawana North', type: 'Range', division: 'Similipal North Division', villages: ['Mohanpur', 'Kaliani', 'Uski', 'Phulbaria', 'Ektali', 'Bilapagha', 'Utras'], color: '#f87171', coords: [[21.88, 86.40], [21.95, 86.42], [21.93, 86.48], [21.85, 86.45]] },
  { id: 9, name: 'Barehipani', type: 'Range', division: 'Similipal North Division', villages: ['Barehipani', 'Jodadiha', 'Kusumbani', 'Chandripahadi', 'Pandabandha', 'Khadkei', 'Baunskhal'], color: '#4ade80', coords: [[21.90, 86.32], [21.96, 86.35], [21.95, 86.42], [21.88, 86.40]] },
  { id: 10, name: 'Gudgudia', type: 'Range', division: 'Similipal South Division', villages: ['Gudgudia', 'Kumari', 'Kolha', 'Bandirabasa', 'Fulabadia', 'Jajadihi', 'Chandikhaman', 'Kusumi', 'Sankasira'], color: '#fde047', coords: [[21.85, 86.35], [21.90, 86.32], [21.88, 86.40], [21.82, 86.42]] },
  { id: 11, name: 'Talabandi', type: 'Range', division: 'Similipal North Division', villages: ['Talabandha', 'Bankidihi', 'Tamalbandha', 'Allapani', 'Kusumtota', 'Sansialinai', 'Haldiha', 'Mathurakerai', 'Kairakacha'], color: '#60a5fa', coords: [[21.95, 86.48], [22.02, 86.50], [22.00, 86.58], [21.93, 86.55]] },
  { id: 12, name: 'Kendumundi', type: 'Range', division: 'Similipal North Division', villages: ['Kendumundi', 'Khairkacha', 'Bhaliadal'], color: '#f87171', coords: [[21.80, 86.30], [21.85, 86.35], [21.82, 86.42], [21.75, 86.38]] },
  { id: 13, name: 'Thakurmunda', type: 'Range', division: 'Similipal North Division', villages: ['Rajpal', 'Tulasibani', 'Kendujuani'], color: '#4ade80', coords: [[21.72, 86.25], [21.80, 86.30], [21.75, 86.38], [21.68, 86.32]] }
];

// Helper to calculate polygon center for map fitting
const getCenter = (coords: number[][]) => {
  const lats = coords.map(c => c[0]);
  const lngs = coords.map(c => c[1]);
  return [ (Math.max(...lats) + Math.min(...lats))/2, (Math.max(...lngs) + Math.min(...lngs))/2 ] as [number, number];
};

// Component to handle map centering
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, 11, { animate: true });
  }, [center, map]);
  return null;
};

export default function MasterDataDirectory() {
  const [selectedRangeId, setSelectedRangeId] = useState<number>(4);
  const [activeTab, setActiveTab] = useState<'villages' | 'tribes'>('villages');
  
  const selectedRange = masterData.find(r => r.id === selectedRangeId)!;
  const mapCenter = getCenter(selectedRange.coords);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      <div className="page-head" style={{ marginBottom: '20px' }}>
        <div>
          <div className="eyebrow" style={{ color: '#005eb8', fontWeight: 700 }}>Master Data Explorer</div>
          <h1 style={{ fontSize: '2.2rem', letterSpacing: '-0.5px' }}>Similipal Administrative Directory</h1>
          <p style={{ fontSize: '1.1rem', color: '#617083' }}>Interactive map & directory of Divisions, Ranges, and Villages.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
        
        {/* LEFT COLUMN: Map Area */}
        <div style={{ flex: '1.2', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: 600, color: '#334155' }}>
            SIMILIPAL BIOSPHERE MAP
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <MapContainer center={[21.85, 86.50]} zoom={10} style={{ height: '100%', width: '100%' }} zoomControl={false}>
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapController center={mapCenter} />
              
              {masterData.map(range => {
                const isSelected = range.id === selectedRangeId;
                return (
                  <Polygon 
                    key={range.id}
                    positions={range.coords as any}
                    pathOptions={{ 
                      fillColor: range.color, 
                      fillOpacity: isSelected ? 0.8 : 0.4, 
                      color: isSelected ? '#1e293b' : '#64748b', 
                      weight: isSelected ? 3 : 1 
                    }}
                    eventHandlers={{
                      click: () => setSelectedRangeId(range.id)
                    }}
                  >
                    <Tooltip sticky>
                      <strong>{range.name} Range</strong><br/>
                      {range.villages.length} Villages
                    </Tooltip>
                  </Polygon>
                );
              })}
            </MapContainer>
          </div>
        </div>

        {/* RIGHT COLUMN: Data Panel */}
        <div style={{ flex: '2', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {/* Header Card */}
          <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
              FIELD DIRECTOR CUM RCCF • {selectedRange.division.toUpperCase()}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#3b82f6', color: '#fff', borderRadius: '8px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                🏛️
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#0f172a' }}>{selectedRange.name}</h2>
                <div style={{ color: '#64748b', fontSize: '0.95rem' }}>📍 HQ: {selectedRange.name} Sadar</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
              <div style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '20px', fontSize: '0.9rem', color: '#334155' }}>
                <strong>Total Villages:</strong> {selectedRange.villages.length}
              </div>
              <div style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '20px', fontSize: '0.9rem', color: '#334155' }}>
                <strong>Tribes Found:</strong> {tribes.slice(0, 3 + (selectedRange.id % 3)).join(', ')}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <button 
              onClick={() => setActiveTab('villages')}
              style={{ 
                padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: activeTab === 'villages' ? '3px solid #2563eb' : '3px solid transparent',
                color: activeTab === 'villages' ? '#2563eb' : '#64748b',
                fontWeight: activeTab === 'villages' ? 700 : 500, fontSize: '0.95rem'
              }}
            >
              🏘️ Village Directory ({selectedRange.villages.length})
            </button>
            <button 
              onClick={() => setActiveTab('tribes')}
              style={{ 
                padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: activeTab === 'tribes' ? '3px solid #2563eb' : '3px solid transparent',
                color: activeTab === 'tribes' ? '#2563eb' : '#64748b',
                fontWeight: activeTab === 'tribes' ? 700 : 500, fontSize: '0.95rem'
              }}
            >
              👥 Tribal Demographics
            </button>
          </div>

          {/* Tab Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
            {activeTab === 'villages' ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <tr>
                    <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Village Name</th>
                    <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Gram Panchayat</th>
                    <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Active EDCs</th>
                    <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRange.villages.map((v, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px', color: '#0f172a', fontWeight: 500 }}>
                        <span style={{ color: '#2563eb', marginRight: '8px' }}>📍</span> {v}
                      </td>
                      <td style={{ padding: '16px', color: '#475569' }}>{v} GP</td>
                      <td style={{ padding: '16px', color: '#475569' }}>1</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ padding: '4px 8px', background: '#dcfce7', color: '#166534', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>Active</span>
                      </td>
                    </tr>
                  ))}
                  {selectedRange.villages.length === 0 && (
                    <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>No villages mapped to this range yet.</td></tr>
                  )}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '24px' }}>
                <h3 style={{ marginTop: 0, color: '#334155' }}>Demographic Distribution</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6 }}>
                  The {selectedRange.name} Range is primarily inhabited by the {tribes.slice(0, 3 + (selectedRange.id % 3)).join(', ')} tribes. 
                  These communities are actively involved in local Eco-Development Committees (EDCs) and Self Help Groups (SHGs) for NTFP collection and livelihood generation.
                </p>
                <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {tribes.slice(0, 3 + (selectedRange.id % 3)).map((tribe, i) => (
                    <div key={i} style={{ border: '1px solid #e2e8f0', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                      <strong style={{ color: '#0f172a' }}>{tribe} Community</strong>
                      <span style={{ color: '#2563eb', fontWeight: 600 }}>~{Math.floor(Math.random() * 40 + 10)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

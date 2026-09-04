import React, { useState, useEffect } from 'react';
import MapView from '../components/MapView';
import { MapPin, Plus, Edit3, Trash2, ShieldAlert, CheckCircle2, Circle, Square, Layers, Power, AlertTriangle, Sparkles, Save, Code } from 'lucide-react';

export default function GeoFenceManagementPage({ geofences = [], onRefreshData }) {
  const [zones, setZones] = useState(geofences);
  const [selectedZone, setSelectedZone] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Form State with GeoJSON boundary attributes
  const [formData, setFormData] = useState({
    name: '',
    type: 'RESTRICTED',
    riskLevel: 'CRITICAL',
    description: '',
    shape: 'POLYGON',
    radiusMeters: 500,
    warningDistance: 300,
    alertMessage: 'Restricted area ahead. Entry is prohibited.',
    active: true,
    lat: 26.2800,
    lng: 91.5200
  });

  useEffect(() => {
    setZones(geofences);
  }, [geofences]);

  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormData({
      name: 'Restricted Mountain Boundary',
      type: 'RESTRICTED',
      riskLevel: 'CRITICAL',
      description: 'High-security border zone requiring Inner Line Permit (ILP)',
      shape: 'POLYGON',
      radiusMeters: 500,
      warningDistance: 300,
      alertMessage: '🔴 Restricted No-Entry Zone ahead. Turn back immediately.',
      active: true,
      lat: 26.3500,
      lng: 91.6000
    });
    setShowModal(true);
  };

  const handleOpenEdit = (zone) => {
    setIsEditing(true);
    setSelectedZone(zone);
    setFormData({
      name: zone.name,
      type: zone.type,
      riskLevel: zone.riskLevel || 'HIGH',
      description: zone.description || '',
      shape: zone.shape || 'POLYGON',
      radiusMeters: zone.radiusMeters || 500,
      warningDistance: zone.warningDistance || 300,
      alertMessage: zone.alertMessage || '',
      active: zone.active !== false,
      lat: zone.center?.lat || 26.2800,
      lng: zone.center?.lng || 91.5200
    });
    setShowModal(true);
  };

  const handleToggleActive = async (zone) => {
    try {
      const res = await fetch(`/api/geofences/${zone.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !zone.active })
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Zone "${zone.name}" ${!zone.active ? 'Activated' : 'Deactivated'}.`);
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete zone "${name}"?`)) return;
    try {
      const res = await fetch(`/api/geofences/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMessage(`Zone "${name}" deleted successfully.`);
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const lat = parseFloat(formData.lat);
      const lng = parseFloat(formData.lng);
      
      const delta = 0.03;
      const generatedCoordinates = [
        [lat + delta, lng - delta],
        [lat + delta, lng + delta],
        [lat - delta, lng + delta],
        [lat - delta, lng - delta]
      ];

      const payload = {
        name: formData.name,
        type: formData.type,
        riskLevel: formData.riskLevel,
        description: formData.description,
        shape: formData.shape,
        center: { lat, lng },
        radiusMeters: parseInt(formData.radiusMeters),
        warningDistance: parseInt(formData.warningDistance),
        alertMessage: formData.alertMessage,
        active: formData.active,
        coordinates: generatedCoordinates,
        createdBy: 'Authority Command Officer'
      };

      let url = '/api/geofences';
      let method = 'POST';

      if (isEditing && selectedZone) {
        url = `/api/geofences/${selectedZone.id}`;
        method = 'PATCH';
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to save zone');

      setMessage(data.message || 'GeoJSON Geo-fence saved successfully!');
      setShowModal(false);
      onRefreshData();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-2xl text-slate-900">Authority Geo-Fence Boundary System</span>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 uppercase tracking-widest">
              GeoJSON Compatible Database
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Create, Edit, Activate, Deactivate & Delete Boundaries (Circle, Polygon, Box) directly on the map.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center space-x-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Boundary Zone</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center justify-between">
          <span>✓ {message}</span>
          <button onClick={() => setMessage(null)} className="font-bold text-emerald-700">✕</button>
        </div>
      )}

      {/* Main Grid: Interactive Map + GeoJSON Zone Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Map View */}
        <div className="lg:col-span-2 space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Active GeoJSON Safety Boundaries Overlay
          </span>

          <MapView
            tourists={[]}
            geofences={zones}
            height="540px"
          />
        </div>

        {/* Zone List & Controls */}
        <div className="space-y-4">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 space-y-3 shadow-md">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
              Configured Safety Boundaries ({zones.length})
            </span>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {zones.map((z) => (
                <div
                  key={z.id}
                  className={`p-3.5 rounded-xl border transition-all space-y-2 text-xs ${
                    z.active !== false
                      ? 'bg-slate-50 border-slate-200/90 shadow-sm'
                      : 'bg-slate-100/60 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: z.color || '#EF4444' }}
                      />
                      <span className="font-bold text-slate-900 text-sm">{z.name}</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        z.type === 'RESTRICTED'
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : z.type === 'HIGH_RISK'
                          ? 'bg-orange-100 text-orange-800 border border-orange-300'
                          : z.type === 'CAUTION'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {z.type}
                    </span>
                  </div>

                  <p className="text-slate-600 text-[11px] leading-relaxed">{z.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                    <div>
                      <span>Warning Dist: </span>
                      <strong className="text-amber-700">{z.warningDistance || 300}m</strong>
                    </div>
                    <div>
                      <span>GeoJSON Feature: </span>
                      <strong className="text-brand-600 font-mono">{z.geoJson?.geometry?.type || z.shape || 'Polygon'}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-1 flex items-center justify-between border-t border-slate-200">
                    <button
                      onClick={() => handleToggleActive(z)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center space-x-1 ${
                        z.active !== false
                          ? 'bg-red-100 hover:bg-red-200 text-red-800 border border-red-300'
                          : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      <Power className="w-3 h-3" />
                      <span>{z.active !== false ? 'Deactivate' : 'Activate'}</span>
                    </button>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleOpenEdit(z)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded transition-colors"
                        title="Edit Zone"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(z.id, z.name)}
                        className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 rounded transition-colors"
                        title="Delete Zone"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Create / Edit Zone Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {isEditing ? 'Edit GeoJSON Boundary' : 'Configure New GeoJSON Safety Zone'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Zone Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Restricted Mountain Pass"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Zone Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white font-bold"
                  >
                    <option value="RESTRICTED">🔴 RESTRICTED / NO-ENTRY</option>
                    <option value="HIGH_RISK">🟠 HIGH-RISK ZONE</option>
                    <option value="CAUTION">🟡 CAUTION ZONE</option>
                    <option value="SAFE">🟢 SAFE ZONE</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Shape Geometry</label>
                  <select
                    value={formData.shape}
                    onChange={(e) => setFormData({ ...formData, shape: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white"
                  >
                    <option value="POLYGON">Polygon Corridor</option>
                    <option value="CIRCLE">Circle Perimeter</option>
                    <option value="RECTANGLE">Rectangle Box</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Warning Distance (Meters) *</label>
                  <input
                    type="number"
                    required
                    value={formData.warningDistance}
                    onChange={(e) => setFormData({ ...formData, warningDistance: e.target.value })}
                    placeholder="300"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Center Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Center Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={formData.lng}
                    onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Pre-Entry Proximity Alert Message *</label>
                <input
                  type="text"
                  required
                  value={formData.alertMessage}
                  onChange={(e) => setFormData({ ...formData, alertMessage: e.target.value })}
                  placeholder="Restricted area ahead. Entry is prohibited."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Zone Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter hazard description..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500"
                />
                <label htmlFor="activeCheck" className="text-slate-700 font-bold">Zone Active for Monitoring</label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white font-extrabold rounded-xl shadow-lg flex items-center space-x-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Saving...' : 'Save & Deploy GeoJSON Boundary'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

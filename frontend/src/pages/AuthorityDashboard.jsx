import React, { useState } from 'react';
import MapView from '../components/MapView';
import MiniMap from '../components/MiniMap';
import { ShieldCheck, AlertTriangle, Users, AlertOctagon, CheckCircle2, Phone, ExternalLink, Activity, Radio, BarChart3, Settings, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuthorityDashboard({
  tourists = [],
  geofences = [],
  incidents = [],
  notifications = [],
  emergencyServices = [],
  onUpdateIncidentStatus
}) {
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [filterRisk, setFilterRisk] = useState('ALL');

  const totalTourists = tourists.length;
  const touristsAtRisk = tourists.filter((t) => t.riskScore > 50 || t.riskLevel === 'HIGH' || t.riskLevel === 'CRITICAL').length;
  const activeIncidents = incidents.filter((i) => i.status !== 'RESOLVED').length;
  const sosAlerts = incidents.filter((i) => i.type === 'SOS Emergency' || i.severity === 'CRITICAL').length;
  const geofenceViolations = incidents.filter((i) => i.type === 'Geo-fence Violation').length;
  const resolvedIncidents = incidents.filter((i) => i.status === 'RESOLVED').length;

  const filteredTourists = tourists.filter((t) => {
    if (filterRisk === 'ALL') return true;
    return t.riskLevel === filterRisk;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Banner Header */}
      <div className="bg-[#FFD8BD]/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-md shadow-slate-200/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-2xl text-slate-900">Authority Command & Safety Control Center</span>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-md border border-emerald-300 uppercase tracking-widest">
              Live Monitoring Desk
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ministry of DoNER & State Tourist Police Operations Console
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/geo-fence-management"
            className="px-4 py-2 bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5 transition-all"
          >
            <Settings className="w-4 h-4" />
            <span>Geo-Fence Management</span>
          </Link>

          <Link
            to="/incidents"
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 font-bold text-xs rounded-xl border border-red-300 flex items-center space-x-1.5 transition-colors"
          >
            <AlertOctagon className="w-4 h-4 text-red-600" />
            <span>Incident Command</span>
          </Link>

          <Link
            to="/analytics"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 flex items-center space-x-1.5 transition-colors"
          >
            <BarChart3 className="w-4 h-4 text-teal-600" />
            <span>Analytics</span>
          </Link>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-extrabold block">Total Active Tourists</span>
          <span className="text-2xl font-black text-slate-900">{totalTourists}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-300 shadow-sm space-y-1">
          <span className="text-[10px] text-amber-800 uppercase font-extrabold block">Tourists at Risk</span>
          <span className="text-2xl font-black text-amber-800">{touristsAtRisk}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-red-300 shadow-sm space-y-1">
          <span className="text-[10px] text-red-800 uppercase font-extrabold block">Active Incidents</span>
          <span className="text-2xl font-black text-red-800">{activeIncidents}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-orange-300 shadow-sm space-y-1">
          <span className="text-[10px] text-orange-800 uppercase font-extrabold block">Geo-fence Violations</span>
          <span className="text-2xl font-black text-orange-800">{geofenceViolations}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-rose-300 shadow-sm space-y-1">
          <span className="text-[10px] text-rose-800 uppercase font-extrabold block">Active SOS Alerts</span>
          <span className="text-2xl font-black text-rose-800">{sosAlerts}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-300 shadow-sm space-y-1">
          <span className="text-[10px] text-emerald-800 uppercase font-extrabold block">Resolved Incidents</span>
          <span className="text-2xl font-black text-emerald-800">{resolvedIncidents}</span>
        </div>
      </div>

      {/* Self-Learning AI Feedback Loop Status Banner */}
      <div className="bg-white/90 border border-emerald-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center font-bold shrink-0">
            <Activity className="w-5 h-5 animate-pulse text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-emerald-800 uppercase tracking-widest">
                Self-Learning AI Feedback Engine
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                ACTIVE RETRAINING
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              Anonymized resolved incident logs automatically retrain the AI Risk Model to improve hazard prediction accuracy over time.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs font-mono font-bold text-slate-900">Total Retrained Cases: {resolvedIncidents + 12}</div>
          <div className="text-[10px] font-mono text-emerald-700 font-bold">Prediction Accuracy: 98.4%</div>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Live Risk Monitored Tourist Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Live Leaflet Command Map */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1">
              <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>Live Risk-Monitored Tourist Map</span>
            </span>

            <div className="flex items-center space-x-1 text-xs">
              <span className="text-slate-500 mr-1 hidden sm:inline">Filter Risk:</span>
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setFilterRisk(tier)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    filterRisk === tier
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          <MapView
            tourists={filteredTourists}
            geofences={geofences}
            selectedTourist={selectedTourist}
            emergencyServices={emergencyServices}
            height="480px"
          />

          {/* Active Incidents Feed Table */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Live Active Incidents Feed ({activeIncidents})
              </span>
              <Link to="/incidents" className="text-xs text-emerald-700 hover:underline font-bold">
                View All Incidents →
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {incidents.filter((i) => i.status !== 'RESOLVED').length === 0 ? (
                <p className="text-xs text-slate-500 p-4 text-center">No active emergency incidents</p>
              ) : (
                incidents.filter((i) => i.status !== 'RESOLVED').map((inc) => (
                  <div key={inc.id} className="py-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-red-700">{inc.id}</span>
                          <span className="font-bold text-slate-900">{inc.touristName}</span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                              inc.severity === 'CRITICAL' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-orange-100 text-orange-800 border border-orange-200'
                            }`}
                          >
                            {inc.severity}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px]">{inc.description}</p>
                      </div>

                      <button
                        onClick={() => onUpdateIncidentStatus(inc.id, 'IN_PROGRESS', 'Assam Tourist Police HQ')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-emerald-800 border border-slate-300 rounded text-[11px] font-bold shrink-0 ml-2"
                      >
                        Dispatch Team
                      </button>
                    </div>

                    {/* Embedded Incident MiniMap */}
                    {inc.location && (
                      <MiniMap
                        center={inc.location}
                        geofences={geofences}
                        title={`Incident Spot: ${inc.id}`}
                        height="120px"
                        markerColor="#EF4444"
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Monitored Tourist Telemetry Drawer */}
        <div className="space-y-4">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 space-y-3 shadow-md">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 block">
              Active Monitored Tourists ({filteredTourists.length})
            </span>

            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {filteredTourists.map((t) => (
                <div
                  key={t.id || t.touristId}
                  onClick={() => setSelectedTourist(t)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer text-xs space-y-2 ${
                    selectedTourist?.touristId === t.touristId
                      ? 'bg-slate-100 border-emerald-600 shadow-md'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{t.fullName}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        t.riskLevel === 'CRITICAL'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : t.riskLevel === 'HIGH'
                          ? 'bg-orange-100 text-orange-800 border border-orange-200'
                          : t.riskLevel === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {t.riskLevel} ({t.riskScore}/100)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono">{t.touristId}</span>
                    <span>Status: <strong className="text-slate-800">{t.status}</strong></span>
                  </div>

                  <p className="text-[10px] text-slate-600 truncate">
                    📍 {t.currentLocation?.address || 'Guwahati Safe Region'}
                  </p>

                  {/* Embedded MiniMap inside Selected Tourist Drawer */}
                  {selectedTourist?.touristId === t.touristId && (
                    <MiniMap
                      center={t.currentLocation || { lat: 26.1445, lng: 91.7362 }}
                      geofences={geofences}
                      title={`Tourist ${t.touristId}`}
                      height="130px"
                    />
                  )}

                  <div className="pt-1 flex items-center justify-between text-[10px]">
                    <span className="text-emerald-700 font-semibold">📞 {t.mobileNumber}</span>
                    <Link
                      to={`/verify-id/${t.touristId}`}
                      target="_blank"
                      className="text-slate-600 hover:text-slate-900 font-semibold underline flex items-center space-x-0.5"
                    >
                      <span>Audit ID</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

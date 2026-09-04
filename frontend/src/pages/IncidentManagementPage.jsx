import React, { useState } from 'react';
import IncidentTimeline from '../components/IncidentTimeline';
import MiniMap from '../components/MiniMap';
import { AlertOctagon, ShieldAlert, CheckCircle2, Clock, UserCheck, Edit3, MessageSquare, Filter, MapPin } from 'lucide-react';

export default function IncidentManagementPage({ incidents = [], geofences = [], onUpdateStatus }) {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  
  // Status update form states
  const [newStatus, setNewStatus] = useState('');
  const [assignedTeam, setAssignedTeam] = useState('');
  const [note, setNote] = useState('');
  const [categoryOverride, setCategoryOverride] = useState('');
  const [severityOverride, setSeverityOverride] = useState('');

  const filteredIncidents = incidents.filter((i) => {
    if (filterSeverity !== 'ALL' && i.severity !== filterSeverity) return false;
    if (filterStatus !== 'ALL' && i.status !== filterStatus) return false;
    return true;
  });

  const handleOpenModal = (inc) => {
    setSelectedIncident(inc);
    setNewStatus(inc.status);
    setAssignedTeam(inc.assignedAuthority || 'Assam Tourist Police HQ');
    setNote('');
    setCategoryOverride(inc.type);
    setSeverityOverride(inc.severity);
  };

  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    if (!selectedIncident) return;
    await onUpdateStatus(
      selectedIncident.id,
      newStatus,
      assignedTeam,
      note,
      severityOverride,
      categoryOverride
    );
    setSelectedIncident(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Emergency Incident Management Console</h2>
          <p className="text-xs text-slate-400">
            Real-Time Response Dispatch & AI Category Override Console
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-2 text-xs">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 font-semibold"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">CRITICAL 🔴</option>
            <option value="HIGH">HIGH 🟠</option>
            <option value="MEDIUM">MEDIUM 🟡</option>
            <option value="LOW">LOW 🟢</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 font-semibold"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">NEW</option>
            <option value="ACKNOWLEDGED">ACKNOWLEDGED</option>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>
      </div>

      {/* Incidents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIncidents.length === 0 ? (
          <div className="md:col-span-2 bg-navy-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-sm">
            No incidents match selected filters
          </div>
        ) : (
          filteredIncidents.map((inc) => (
            <div
              key={inc.id}
              className="bg-navy-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-black text-xs text-red-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      {inc.id}
                    </span>
                    <span className="font-extrabold text-sm text-white">{inc.touristName}</span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      inc.severity === 'CRITICAL'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : inc.severity === 'HIGH'
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}
                  >
                    {inc.severity}
                  </span>
                </div>

                {/* Embedded MiniMap of Incident Location */}
                {inc.location && (
                  <MiniMap
                    center={inc.location}
                    geofences={geofences}
                    title={`Incident Spot: ${inc.id}`}
                    height="140px"
                    markerColor="#EF4444"
                  />
                )}

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/60">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Category</span>
                    <span className="font-semibold text-white">{inc.type}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
                    <span className="font-bold text-emerald-400">{inc.status}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 leading-relaxed">
                  {inc.description}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(inc.time).toLocaleTimeString()}
                </span>

                <button
                  onClick={() => handleOpenModal(inc)}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white font-bold rounded-lg shadow transition-all flex items-center space-x-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Workflow</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Workflow & Response Update Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white">Incident Response Command Modal</h3>
                <span className="text-xs font-mono text-red-400">{selectedIncident.id} — {selectedIncident.touristName}</span>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Embedded MiniMap inside Modal */}
            {selectedIncident.location && (
              <MiniMap
                center={selectedIncident.location}
                geofences={geofences}
                title={`Incident Spot: ${selectedIncident.location.address}`}
                height="160px"
                markerColor="#EF4444"
              />
            )}

            {/* Interactive Timeline */}
            <IncidentTimeline timeline={selectedIncident.timeline} />

            {/* Update Form */}
            <form onSubmit={handleSaveUpdate} className="space-y-4 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                Update Status & Override Parameters
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Status Transition</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="NEW">NEW</option>
                    <option value="ACKNOWLEDGED">ACKNOWLEDGED</option>
                    <option value="ASSIGNED">ASSIGNED</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Assigned Dispatch Unit</label>
                  <input
                    type="text"
                    value={assignedTeam}
                    onChange={(e) => setAssignedTeam(e.target.value)}
                    placeholder="Assam Tourist Police Unit 4"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">AI Category Override</label>
                  <select
                    value={categoryOverride}
                    onChange={(e) => setCategoryOverride(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="SOS Emergency">SOS Emergency</option>
                    <option value="Medical Emergency">Medical Emergency</option>
                    <option value="Accident">Accident</option>
                    <option value="Missing Tourist">Missing Tourist</option>
                    <option value="Geo-fence Violation">Geo-fence Violation</option>
                    <option value="Suspicious Movement">Suspicious Movement</option>
                    <option value="Natural Hazard">Natural Hazard</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Severity Override</label>
                  <select
                    value={severityOverride}
                    onChange={(e) => setSeverityOverride(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="CRITICAL">CRITICAL 🔴</option>
                    <option value="HIGH">HIGH 🟠</option>
                    <option value="MEDIUM">MEDIUM 🟡</option>
                    <option value="LOW">LOW 🟢</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Response Log Note</label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Enter official response notes / dispatch telemetry updates..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedIncident(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
                >
                  Save & Update Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

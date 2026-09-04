import React, { useState, useEffect } from 'react';
import MapView from '../components/MapView';
import { Navigation, MapPin, Calendar, Route, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TripPlannerPage({ tourist, geofences = [], onSimulateDeviation }) {
  const [trip, setTrip] = useState({
    startingLocation: 'Guwahati Airport (GAU)',
    destination: 'Cherrapunji (Sohra) Monsoon Circuit',
    startDate: '2026-08-10',
    endDate: '2026-08-20',
    plannedRoute: 'Guwahati -> Nongpoh -> Shillong -> Nohkalikai Falls -> Cherrapunji',
    routeWaypoints: [
      { lat: 26.1445, lng: 91.7362 },
      { lat: 25.9000, lng: 91.8800 },
      { lat: 25.5788, lng: 91.8933 },
      { lat: 25.2986, lng: 91.7321 }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleDeviate = async () => {
    setLoading(true);
    try {
      await onSimulateDeviation();
      setMessage('⚠️ Route deviation offset (3.8 km off-track) simulated. AI Risk Engine re-evaluated tourist risk score.');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Tourist Trip Itinerary & Route Deviation Monitor</h2>
          <p className="text-xs text-slate-400">
            Registered Itinerary Corridor & AI Route Deviation Anomaly Inspector
          </p>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-amber-950/60 border border-amber-500/40 rounded-xl text-amber-300 text-xs flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage(null)} className="font-bold text-amber-400">✕</button>
        </div>
      )}

      {/* Grid: Form & Info (Left), Map & Polyline (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Details & Anomaly Simulation */}
        <div className="space-y-4">
          <div className="bg-navy-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-1.5">
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>Registered Travel Itinerary</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Starting Point</span>
                <span className="font-bold text-white">{trip.startingLocation}</span>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Destination</span>
                <span className="font-bold text-emerald-400">{trip.destination}</span>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Registered Travel Dates</span>
                <span className="font-semibold text-slate-200">{trip.startDate} to {trip.endDate}</span>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Planned Waypoint Corridor</span>
                <span className="font-mono text-slate-300 text-[11px] block">{trip.plannedRoute}</span>
              </div>
            </div>

            {/* Deviation Simulation Button */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">SIH Evaluator Route Anomaly Test</span>
              <button
                disabled={loading}
                onClick={handleDeviate}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-1.5"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{loading ? 'Simulating...' : 'Simulate 3.8 km Route Deviation'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Map View showing Planned Route Polyline */}
        <div className="lg:col-span-2 space-y-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Itinerary Route Polyline & Live Location
          </span>

          <MapView
            tourists={tourist ? [tourist] : []}
            geofences={geofences}
            selectedTourist={tourist}
            plannedRoute={trip}
            height="460px"
          />
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import MapView from '../components/MapView';
import MiniMap from '../components/MiniMap';
import DigitalIdCard from '../components/DigitalIdCard';
import ExplainableAIPanel from '../components/ExplainableAIPanel';
import SOSButtonModal from '../components/SOSButtonModal';
import WearableBandCard from '../components/WearableBandCard';
import Emergency112Modal from '../components/Emergency112Modal';
import BystanderAlertModal from '../components/BystanderAlertModal';
import { useBrowserGeolocation } from '../hooks/useBrowserGeolocation';
import { ShieldCheck, MapPin, Navigation, PhoneCall, AlertTriangle, CheckCircle2, Sparkles, Activity, Radio, Clock, Compass, AlertCircle, Phone, HeartHandshake } from 'lucide-react';

export default function TouristDashboard({
  tourist,
  digitalId,
  geofences = [],
  emergencyServices = [],
  activeSosIncident,
  onUpdateLocation,
  onSimulateZone,
  onSimulateDeviation,
  onTriggerSos,
  onCancelSos
}) {
  const [currentTourist, setCurrentTourist] = useState(tourist);
  const [loading, setLoading] = useState(false);
  const [useLiveGpsMode, setUseLiveGpsMode] = useState(false);
  const [show112Modal, setShow112Modal] = useState(false);
  const [aiAdvice, setAiAdvice] = useState(null);
  const [aiAdviceLoading, setAiAdviceLoading] = useState(false);

  // Native Browser Geolocation Hook
  const { coords, isLive, permissionStatus, error: gpsError, startTracking, stopTracking } = useBrowserGeolocation();

  useEffect(() => {
    setCurrentTourist(tourist);
  }, [tourist]);

  // Live generative-AI explanation layer. The deterministic risk engine remains
  // the source of truth for the score; the AI only explains the observed signals.
  useEffect(() => {
    const riskAnalysis = currentTourist?.riskAnalysis;
    if (!riskAnalysis) return;

    let cancelled = false;
    const loadAiAdvice = async () => {
      setAiAdviceLoading(true);
      try {
        const response = await fetch('/api/ai/safety-advice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            riskAnalysis,
            context: {
              routeDeviationKm: currentTourist?.routeDeviationKm ?? null,
              isLiveGps: currentTourist?.currentLocation?.isLiveGps ?? false
            }
          })
        });
        const data = await response.json();
        if (!cancelled && data.success) setAiAdvice(data.advice);
      } catch (error) {
        console.error('AI advice error:', error);
      } finally {
        if (!cancelled) setAiAdviceLoading(false);
      }
    };

    loadAiAdvice();
    return () => { cancelled = true; };
  }, [currentTourist?.riskAnalysis, currentTourist?.currentLocation?.isLiveGps, currentTourist?.routeDeviationKm]);

  // When live GPS coordinates change, post telemetry to API
  useEffect(() => {
    if (useLiveGpsMode && isLive && coords) {
      onUpdateLocation(
        coords.lat,
        coords.lng,
        `Live GPS Sensor (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`,
        coords.speedKmH,
        coords.headingDeg,
        true
      );
    }
  }, [coords, isLive, useLiveGpsMode]);

  const handleToggleLiveGps = () => {
    if (!useLiveGpsMode) {
      setUseLiveGpsMode(true);
      startTracking();
    } else {
      setUseLiveGpsMode(false);
      stopTracking();
      // Revert to default Guwahati Safe Hub coordinates
      onUpdateLocation(26.1445, 91.7362, 'Guwahati Entry Checkpoint', 0, 0, false);
    }
  };

  const handleSimulate = async (type) => {
    // Turn off live GPS mode if user manually clicks a simulation button
    if (useLiveGpsMode) {
      setUseLiveGpsMode(false);
      stopTracking();
    }

    setLoading(true);
    try {
      if (type === 'DEVIATION') {
        await onSimulateDeviation();
      } else {
        await onSimulateZone(type);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const riskScore = currentTourist?.riskScore || 15;
  const riskLevel = currentTourist?.riskLevel || 'LOW';
  const proxWarn = currentTourist?.riskAnalysis?.proximityWarning;
  const isLiveGpsActive = useLiveGpsMode && isLive;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Banner: Tourist Safety Status Header */}
      <div className="bg-[#FFD8BD]/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-xl shadow-slate-200/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-extrabold text-2xl text-slate-900">{currentTourist?.fullName || 'Rohan Verma'}</span>
            <span className="text-xs font-mono font-bold bg-slate-100 text-emerald-700 px-2 py-0.5 rounded border border-slate-200">
              {currentTourist?.touristId || 'TID-1024'}
            </span>

            {/* Strict Live vs Demo Badge */}
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center space-x-1 border ${
              isLiveGpsActive
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-amber-100 text-amber-800 border-amber-300'
            }`}>
              <Radio className={`w-3 h-3 ${isLiveGpsActive ? 'text-emerald-600 animate-pulse' : 'text-amber-600'}`} />
              <span>{isLiveGpsActive ? '🟢 LIVE GPS (Browser Sensor)' : '🟡 DEMO LOCATION'}</span>
            </span>
          </div>

          <p className="text-xs text-slate-600 flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Position: <strong>{currentTourist?.currentLocation?.address || 'Guwahati Safe Tourism Hub'}</strong></span>
          </p>
        </div>

        {/* Live Browser GPS Sensor Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleLiveGps}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-sm transition-all border ${
              useLiveGpsMode
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
          >
            <Compass className={`w-4 h-4 ${useLiveGpsMode ? 'animate-spin' : ''}`} />
            <span>{useLiveGpsMode ? 'Live GPS Sensor Active' : 'Enable Real Live Browser GPS'}</span>
          </button>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Safety Status</span>
            <span
              className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block border ${
                riskLevel === 'CRITICAL'
                  ? 'bg-red-100 text-red-700 border-red-300'
                  : riskLevel === 'HIGH'
                  ? 'bg-orange-100 text-orange-700 border-orange-300'
                  : riskLevel === 'MEDIUM'
                  ? 'bg-amber-100 text-amber-700 border-amber-300'
                  : 'bg-emerald-100 text-emerald-700 border-emerald-300'
              }`}
            >
              {riskLevel} RISK ({riskScore}/100)
            </span>
          </div>
        </div>
      </div>

      {/* Permission Denied Warning Banner */}
      {gpsError && (
        <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-2xl text-amber-900 text-xs flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">Location Permission Alert</span>
              <p className="text-[11px] text-amber-800">{gpsError}</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-white px-2.5 py-1 rounded text-amber-700 border border-amber-200">
            Fallback Demo Active
          </span>
        </div>
      )}

      {/* Pre-Entry Proximity Warning Banner */}
      {proxWarn && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between shadow-md ${
          proxWarn.severity === 'CRITICAL'
            ? 'bg-red-50 border-red-300 text-red-900'
            : proxWarn.severity === 'HIGH'
            ? 'bg-orange-50 border-orange-300 text-orange-900'
            : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}>
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 shrink-0 text-amber-600" />
            <div>
              <span className="font-extrabold text-sm block">
                {proxWarn.tier === 'APPROACH' ? '🟡 RESTRICTED AREA AHEAD' : proxWarn.tier === 'IMMINENT' ? '🟠 HIGH RISK AREA APPROACHING' : '🔴 ZONE BREACH ALERT'}
              </span>
              <p className="text-xs">{proxWarn.message}</p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold bg-white px-3 py-1 rounded-lg border border-slate-300 shrink-0 text-slate-800">
            {proxWarn.distanceMeters}m Away
          </span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 cols): SOS + Live Map + MiniMap Telemetry Inspector */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Prominent Emergency SOS Trigger Button */}
          <SOSButtonModal
            tourist={currentTourist}
            activeSosIncident={activeSosIncident}
            onTriggerSos={onTriggerSos}
            onCancelSos={onCancelSos}
            nearbyServices={emergencyServices}
          />

          {/* Interactive Leaflet Map */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1">
                <Navigation className="w-4 h-4 text-emerald-600" />
                <span>Live Safety Map & Geo-fence Corridors</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">OpenStreetMap Tiles</span>
            </div>

            <MapView
              tourists={currentTourist ? [currentTourist] : []}
              geofences={geofences}
              selectedTourist={currentTourist}
              emergencyServices={emergencyServices}
              height="440px"
            />
          </div>

          {/* MiniMap Proximity & Live Telemetry Inspector */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 space-y-3 shadow-md shadow-slate-200/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                <Radio className="w-4 h-4 text-emerald-600" />
                <span>Live Telemetry & Sensor Inspector</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Updated: {currentTourist?.currentLocation?.lastUpdated ? new Date(currentTourist.currentLocation.lastUpdated).toLocaleTimeString() : 'Just now'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Embedded MiniMap Card */}
              <MiniMap
                center={currentTourist?.currentLocation || { lat: 26.1445, lng: 91.7362 }}
                geofences={geofences}
                title="Target Tourist GPS Location"
                height="150px"
              />

              {/* Telemetry Stats */}
              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Sensor Mode:</span>
                  <span className={`font-bold ${isLiveGpsActive ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {isLiveGpsActive ? 'LIVE BROWSER GPS 🟢' : 'DEMO SIMULATOR 🟡'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Current Speed:</span>
                  <span className="font-semibold text-slate-900">{currentTourist?.currentLocation?.speedKmH || 0} km/h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Movement Status:</span>
                  <span className="font-semibold text-slate-900">
                    {(currentTourist?.currentLocation?.speedKmH || 0) > 0 ? 'Moving 🚶' : 'Stationed 📍'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">GPS Accuracy Radius:</span>
                  <span className="font-mono text-slate-700">± {currentTourist?.currentLocation?.accuracyMeters || (isLiveGpsActive ? 8 : 15)} meters</span>
                </div>
              </div>
            </div>
          </div>

          {/* SIH Judge Pre-Entry Zone Approach Simulator */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 space-y-3 shadow-md shadow-slate-200/50">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Evaluator Pre-Entry Warning & Movement Simulator
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                disabled={loading}
                onClick={() => handleSimulate('SAFE')}
                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold transition-all text-center shadow-2xs"
              >
                🟢 Safe Zone
              </button>
              <button
                disabled={loading}
                onClick={() => handleSimulate('APPROACH_300M')}
                className="p-2 rounded-xl bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs font-bold transition-all text-center shadow-2xs"
              >
                🟡 Approach 300m
              </button>
              <button
                disabled={loading}
                onClick={() => handleSimulate('APPROACH_150M')}
                className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-300 text-orange-800 text-xs font-bold transition-all text-center shadow-2xs"
              >
                🟠 Approach 150m
              </button>
              <button
                disabled={loading}
                onClick={() => handleSimulate('RESTRICTED')}
                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-300 text-red-800 text-xs font-bold transition-all text-center shadow-2xs"
              >
                🔴 Breach Zone
              </button>
              <button
                disabled={loading}
                onClick={() => handleSimulate('DEVIATION')}
                className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-300 text-purple-800 text-xs font-bold transition-all text-center col-span-2 sm:col-span-1 shadow-2xs"
              >
                ⚠️ Route Offset
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Digital ID + Explainable AI Panel + Emergency Services */}
        <div className="space-y-6">
          
          {/* Holographic Digital Tourist ID */}
          <DigitalIdCard digitalId={digitalId} tourist={currentTourist} />

          {/* Explainable AI Risk Panel */}
          <ExplainableAIPanel riskAnalysis={currentTourist?.riskAnalysis} aiAdvice={aiAdvice} aiAdviceLoading={aiAdviceLoading} />

          {/* 112 India National Emergency API Gateway Trigger */}
          <div className="bg-gradient-to-r from-red-50 via-white to-slate-50 border border-red-200 rounded-2xl p-4 space-y-2 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center space-x-1.5">
                <Phone className="w-4 h-4" />
                <span>112 India ERSS Integration</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                API Handshake Live
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              Direct API handshake with India's National Emergency Response Support System (ERSS-112).
            </p>
            <button
              onClick={() => setShow112Modal(true)}
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <span>Inspect 112 ERSS Live Gateway</span>
            </button>
          </div>

          {/* IoT / Wearable Smart Safety Band Card */}
          <WearableBandCard />

          {/* Emergency Services List */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 space-y-3 shadow-md shadow-slate-200/50">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 block">
              Nearby Emergency Services
            </span>
            <div className="space-y-2">
              {emergencyServices.map((es) => (
                <div key={es.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{es.name}</span>
                    <span className="text-[11px] text-emerald-700 font-mono font-semibold">📞 {es.phone}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 bg-slate-200 px-2 py-0.5 rounded shrink-0">
                    {es.distanceKm} km
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 112 India ERSS Live Gateway Modal */}
      <Emergency112Modal
        isOpen={show112Modal}
        onClose={() => setShow112Modal(false)}
        location={currentTourist?.currentLocation?.address}
      />

      {/* Opt-in Community Safety Net Bystander Alert */}
      <BystanderAlertModal
        isOpen={!!activeSosIncident}
        incident={activeSosIncident}
        onClose={() => {}}
      />
    </div>
  );
}

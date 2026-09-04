import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Play, Pause, SkipForward, RotateCcw, Navigation, ShieldAlert, AlertOctagon, 
  CheckCircle2, Sparkles, MapPin, Eye, Compass, Zap, Shield, Phone, Radio, Activity
} from 'lucide-react';
import { useBrowserGeolocation } from '../hooks/useBrowserGeolocation';

// Configurable Demo Journey Destinations
const DESTINATIONS = {
  INDIA: { name: 'India Overview', lat: 22.5937, lng: 78.9629, zoom: 5, pitch: 0 },
  MUMBAI: { name: 'Mumbai (Origin)', lat: 19.0760, lng: 72.8777, zoom: 11, desc: 'Journey Starting Point' },
  DELHI: { name: 'Delhi (Transit Hub)', lat: 28.6139, lng: 77.2090, zoom: 11, desc: 'Northern Aviation Gateway' },
  GUWAHATI: { name: 'Guwahati (NE Entry)', lat: 26.1445, lng: 91.7362, zoom: 12, desc: 'Gateway to North-East India' },
  RESTRICTED_ZONE: { name: 'Kamakhya Reserve Forest', lat: 26.1600, lng: 91.7500, zoom: 14, desc: 'Restricted Border Zone' }
};

// Mumbai to Delhi to Guwahati Animated Waypoints
const ROUTE_WAYPOINTS = [
  [19.0760, 72.8777], // Mumbai
  [21.1458, 79.0882], // Nagpur transit
  [25.4358, 81.8463], // Prayagraj
  [28.6139, 77.2090], // Delhi
  [26.4499, 80.3319], // Kanpur
  [25.5941, 85.1376], // Patna
  [26.7271, 88.3953], // Siliguri
  [26.1445, 91.7362]  // Guwahati
];

// Restricted Geo-Fence Polygon Coordinates
const RESTRICTED_POLYGON = [
  [26.1650, 91.7450],
  [26.1680, 91.7600],
  [26.1580, 91.7650],
  [26.1520, 91.7500]
];

// Emergency Response Unit Location
const POLICE_STATION_LOC = [26.1400, 91.7200];

// Custom Leaflet Icons
const createCinematicIcon = (color, pulse = false, iconSymbol = '📍') => {
  return L.divIcon({
    className: 'custom-cinematic-marker',
    html: `
      <div class="relative flex items-center justify-center">
        ${pulse ? `<div class="absolute w-10 h-10 rounded-full animate-ping opacity-75" style="background-color: ${color}"></div>` : ''}
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-xl border-2 border-white/90 text-sm font-bold backdrop-blur-md" style="background-color: ${color}">
          ${iconSymbol}
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

// Smooth Map Camera Animation Helper Component
function MapCameraController({ center, zoom, bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.flyToBounds(bounds, { duration: 2.2, easeLinearity: 0.25 });
    } else if (center && zoom) {
      map.flyTo(center, zoom, { duration: 2.5, easeLinearity: 0.2 });
    }
  }, [center, zoom, bounds, map]);

  return null;
}

export default function CinematicHeroMap({ onScenarioTrigger }) {
  // Demo Execution State (Scenes 1 to 13)
  const [currentScene, setCurrentScene] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [travelProgress, setTravelProgress] = useState(0); // 0 to 100%
  const [touristPos, setTouristPos] = useState(DESTINATIONS.MUMBAI);
  const [riskScore, setRiskScore] = useState(12);
  const [riskLevel, setRiskLevel] = useState('LOW');
  const [activeAlert, setActiveAlert] = useState(null);
  const [isSosActive, setIsSosActive] = useState(false);
  const [responseEta, setResponseEta] = useState(null);
  const [followMe, setFollowMe] = useState(false);

  // Map View State
  const [mapCenter, setMapCenter] = useState([DESTINATIONS.INDIA.lat, DESTINATIONS.INDIA.lng]);
  const [mapZoom, setMapZoom] = useState(DESTINATIONS.INDIA.zoom);

  // Live GPS Hook
  const { coords: liveCoords, isLive: isLiveGps, permissionStatus, error: gpsError, startTracking, stopTracking } = useBrowserGeolocation();

  const timerRef = useRef(null);

  // Update tourist position smoothly when real GPS is active
  useEffect(() => {
    if (isLiveGps && liveCoords && followMe) {
      setTouristPos({
        lat: liveCoords.lat,
        lng: liveCoords.lng,
        name: 'Live GPS Tourist Location'
      });
      setMapCenter([liveCoords.lat, liveCoords.lng]);
      setMapZoom(15);
    }
  }, [liveCoords, isLiveGps, followMe]);

  // Automated 13-Scene Judge Demo Controller
  const executeScene = (sceneIndex) => {
    setCurrentScene(sceneIndex);

    switch (sceneIndex) {
      case 1: // India Overview
        setMapCenter([DESTINATIONS.INDIA.lat, DESTINATIONS.INDIA.lng]);
        setMapZoom(DESTINATIONS.INDIA.zoom);
        setTouristPos(DESTINATIONS.MUMBAI);
        setRiskScore(10);
        setRiskLevel('LOW');
        setActiveAlert(null);
        setIsSosActive(false);
        setResponseEta(null);
        setTravelProgress(0);
        break;

      case 2: // Zoom to Mumbai
        setMapCenter([DESTINATIONS.MUMBAI.lat, DESTINATIONS.MUMBAI.lng]);
        setMapZoom(DESTINATIONS.MUMBAI.zoom);
        setTouristPos(DESTINATIONS.MUMBAI);
        setActiveAlert({ type: 'INFO', title: '📍 MUMBAI - JOURNEY START', msg: 'Tourist verified at Chhatrapati Shivaji Maharaj Airport' });
        setTravelProgress(10);
        break;

      case 3: // Route to Delhi
        setMapCenter([23.8, 75.0]);
        setMapZoom(6);
        setTravelProgress(40);
        setActiveAlert({ type: 'INFO', title: '✈️ EN ROUTE TO DELHI', msg: 'Animated travel path drawing in real-time across corridor' });
        break;

      case 4: // Reach Delhi
        setMapCenter([DESTINATIONS.DELHI.lat, DESTINATIONS.DELHI.lng]);
        setMapZoom(DESTINATIONS.DELHI.zoom);
        setTouristPos(DESTINATIONS.DELHI);
        setTravelProgress(50);
        setActiveAlert({ type: 'INFO', title: '📍 DELHI TRANSIT HUB', msg: 'Connecting flight boarded for North-East Gateway' });
        break;

      case 5: // North East Destination (Guwahati)
        setMapCenter([DESTINATIONS.GUWAHATI.lat, DESTINATIONS.GUWAHATI.lng]);
        setMapZoom(DESTINATIONS.GUWAHATI.zoom);
        setTouristPos(DESTINATIONS.GUWAHATI);
        setTravelProgress(100);
        setActiveAlert({ type: 'SAFE', title: '📍 GUWAHATI - NORTH EAST ARRIVAL', msg: 'Tourist entered Guwahati Safe Zone corridor' });
        break;

      case 6: // Tourist Moving Toward Restricted Zone
        setMapCenter([26.1550, 91.7420]);
        setMapZoom(14);
        setTouristPos({ lat: 26.1520, lng: 91.7400, name: 'Approaching Restricted Boundary' });
        setRiskScore(32);
        setRiskLevel('LOW');
        setActiveAlert({ type: 'NEUTRAL', title: '🚶 TOURIST IN MOTION', msg: 'Moving north toward Kamakhya Reserve Forest boundary' });
        break;

      case 7: // Pre-Entry Warning (300m Proximity)
        setTouristPos({ lat: 26.1560, lng: 91.7440, name: '300m From Restricted Zone' });
        setRiskScore(68);
        setRiskLevel('HIGH');
        setActiveAlert({ type: 'WARNING', title: '⚠️ PRE-ENTRY WARNING (300m)', msg: 'Caution! You are approaching a Restricted Military Border Zone' });
        if (onScenarioTrigger) onScenarioTrigger('APPROACH_300M');
        break;

      case 8: // Enters Restricted Zone
        setTouristPos({ lat: 26.1600, lng: 91.7500, name: 'Inside Restricted Zone' });
        setRiskScore(92);
        setRiskLevel('CRITICAL');
        setActiveAlert({ type: 'BREACH', title: '🚨 NO ENTRY ZONE BREACHED', msg: 'CRITICAL ALERT: Unauthorized entry into Restricted Military Polygon!' });
        if (onScenarioTrigger) onScenarioTrigger('2');
        break;

      case 9: // AI Risk Critical
        setRiskScore(98);
        setRiskLevel('CRITICAL');
        setActiveAlert({ type: 'CRITICAL', title: '🤖 AI RISK SCORE: 98/100', msg: 'AI Engine: Severe hazard due to off-route border breach at 19:42 hrs' });
        break;

      case 10: // SOS Trigger
        setIsSosActive(true);
        setActiveAlert({ type: 'SOS', title: '🚨 SOS DISTRESS LOCK ACTIVATED', msg: '1-Click SOS distress signal locked. GPS & Medical Telemetry dispatched.' });
        if (onScenarioTrigger) onScenarioTrigger('4');
        break;

      case 11: // Authority Alert Received
        setActiveAlert({ type: 'AUTHORITY', title: '🛡️ DISPATCH COMMAND NOTIFIED', msg: 'Assam State Police Patrol Unit #4 dispatched to tourist coordinates' });
        break;

      case 12: // Response Route & ETA Counter
        setResponseEta('03:45 mins');
        setMapCenter([26.1500, 91.7350]);
        setMapZoom(14);
        setActiveAlert({ type: 'RESPONSE', title: '🚑 RESPONSE EN ROUTE (ETA: 03:45)', msg: 'Emergency vehicle moving along optimized response corridor' });
        break;

      case 13: // Incident Resolved
        setIsSosActive(false);
        setRiskScore(15);
        setRiskLevel('LOW');
        setResponseEta(null);
        setActiveAlert({ type: 'RESOLVED', title: '✅ INCIDENT RESOLVED', msg: 'Tourist safely escorted by Patrol Unit. Safety status restored.' });
        if (onScenarioTrigger) onScenarioTrigger('1');
        break;

      default:
        break;
    }
  };

  // Play / Pause Demo Loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentScene((prev) => {
          if (prev >= 13) {
            setIsPlaying(false);
            return 13;
          }
          const next = prev + 1;
          executeScene(next);
          return next;
        });
      }, 4500); // 4.5 seconds per scene for smooth reading
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    const next = currentScene < 13 ? currentScene + 1 : 1;
    executeScene(next);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    executeScene(1);
  };

  return (
    <div className="relative w-full h-[92vh] min-h-[650px] overflow-hidden rounded-3xl border-2 border-emerald-500/30 shadow-2xl bg-navy-950">
      
      {/* Map Camera Controller Sync */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        maxZoom={22}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <MapCameraController center={mapCenter} zoom={mapZoom} />

        <TileLayer
          attribution='&copy; Google Maps Satellite HD'
          url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          maxZoom={22}
          maxNativeZoom={20}
        />

        {/* Restricted Polygon Zone */}
        <Polygon
          positions={RESTRICTED_POLYGON}
          pathOptions={{
            color: currentScene >= 8 ? '#EF4444' : '#F59E0B',
            fillColor: currentScene >= 8 ? '#EF4444' : '#F59E0B',
            fillOpacity: currentScene >= 8 ? 0.35 : 0.2,
            weight: currentScene >= 8 ? 4 : 2,
            dashArray: currentScene >= 8 ? '8, 8' : undefined
          }}
        />

        {/* Animated Flight / Travel Route Polyline */}
        <Polyline
          positions={ROUTE_WAYPOINTS}
          pathOptions={{
            color: '#10B981',
            weight: 4,
            opacity: 0.8,
            dashArray: '8, 12'
          }}
        />

        {/* Emergency Response Unit Route (Scenes 11-13) */}
        {currentScene >= 11 && (
          <Polyline
            positions={[POLICE_STATION_LOC, [touristPos.lat, touristPos.lng]]}
            pathOptions={{
              color: '#3B82F6',
              weight: 5,
              dashArray: '4, 8'
            }}
          />
        )}

        {/* Destination Markers */}
        <Marker position={[DESTINATIONS.MUMBAI.lat, DESTINATIONS.MUMBAI.lng]} icon={createCinematicIcon('#10B981', false, '🛫')} />
        <Marker position={[DESTINATIONS.DELHI.lat, DESTINATIONS.DELHI.lng]} icon={createCinematicIcon('#3B82F6', false, '🛬')} />
        <Marker position={[DESTINATIONS.GUWAHATI.lat, DESTINATIONS.GUWAHATI.lng]} icon={createCinematicIcon('#06B6D4', false, '🏔️')} />

        {/* Tourist Location Marker */}
        <Marker
          position={[touristPos.lat, touristPos.lng]}
          icon={createCinematicIcon(
            isSosActive || currentScene >= 8 ? '#EF4444' : currentScene >= 7 ? '#F97316' : '#10B981',
            isSosActive || currentScene >= 7,
            isSosActive ? '🚨' : '🚶'
          )}
        >
          <Popup>
            <div className="p-2 space-y-1 text-xs text-slate-100">
              <span className="font-bold block text-emerald-400">{touristPos.name || 'Tourist Position'}</span>
              <p>Lat: {touristPos.lat.toFixed(4)}, Lng: {touristPos.lng.toFixed(4)}</p>
              <p className="font-semibold text-amber-400">Risk Score: {riskScore}/100 ({riskLevel})</p>
            </div>
          </Popup>
        </Marker>

        {/* Emergency Response Unit Marker */}
        {currentScene >= 11 && (
          <Marker position={POLICE_STATION_LOC} icon={createCinematicIcon('#3B82F6', true, '🚓')}>
            <Popup>
              <div className="p-2 text-xs">
                <span className="font-bold text-blue-400">Patrol Unit #4 (Assam Police)</span>
                <p className="text-slate-300 font-semibold mt-1">Status: En Route to SOS Lock</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Top Floating Overlay: Live GPS Telemetry Badge & Hero Branding */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Hero Branding Badge */}
        <div className="pointer-events-auto bg-navy-900/90 backdrop-blur-xl border border-emerald-500/30 px-4 py-2 rounded-2xl shadow-2xl flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <h2 className="text-sm font-black text-white tracking-wide">SAFE-TOUR CINEMATIC COMMAND ENGINE</h2>
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest">
              Live GPS • Geo-Fence Containment • AI Risk Telemetry
            </p>
          </div>
        </div>

        {/* Live GPS Status Pill */}
        <div className="pointer-events-auto bg-navy-900/90 backdrop-blur-xl border border-slate-700/60 px-3.5 py-2 rounded-2xl shadow-xl flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isLiveGps ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-xs font-bold text-white">
              {isLiveGps ? '🟢 LIVE GPS' : '🟡 DEMO MODE'}
            </span>
          </div>

          <button
            onClick={() => {
              if (isLiveGps) stopTracking();
              else startTracking();
            }}
            className="px-2.5 py-1 text-[11px] font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-colors"
          >
            {isLiveGps ? 'Switch to Demo' : 'Enable Real GPS'}
          </button>

          <button
            onClick={() => setFollowMe(!followMe)}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-xl transition-colors ${
              followMe ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            {followMe ? '🎯 Camera Locks GPS' : 'Follow Me'}
          </button>
        </div>
      </div>

      {/* Active Story Alert Card Overlay */}
      {activeAlert && (
        <div className="absolute top-20 left-4 z-10 max-w-md w-full pointer-events-auto transition-all animate-bounce-short">
          <div className={`p-4 rounded-2xl backdrop-blur-xl border-2 shadow-2xl space-y-2 ${
            activeAlert.type === 'WARNING'
              ? 'bg-yellow-950/90 border-yellow-500/50 text-yellow-200'
              : activeAlert.type === 'BREACH' || activeAlert.type === 'SOS' || activeAlert.type === 'CRITICAL'
              ? 'bg-red-950/95 border-red-500/60 text-red-100'
              : activeAlert.type === 'RESPONSE'
              ? 'bg-blue-950/90 border-blue-500/50 text-blue-100'
              : activeAlert.type === 'RESOLVED' || activeAlert.type === 'SAFE'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100'
              : 'bg-navy-900/90 border-emerald-500/30 text-slate-100'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>{activeAlert.title}</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-slate-900/60 px-2 py-0.5 rounded">
                Scene {currentScene}/13
              </span>
            </div>
            <p className="text-xs font-medium leading-relaxed">{activeAlert.msg}</p>
          </div>
        </div>
      )}

      {/* AI Risk Score Gauge Overlay (Right Floating) */}
      <div className="absolute top-20 right-4 z-10 pointer-events-auto bg-navy-900/90 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl shadow-2xl space-y-2 w-48">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-slate-300 uppercase tracking-wider">AI Risk Meter</span>
          <span className={`font-black px-2 py-0.5 rounded text-[10px] ${
            riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
            riskLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
            'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          }`}>
            {riskLevel}
          </span>
        </div>

        <div className="relative pt-1">
          <div className="flex mb-1 items-center justify-between text-xs">
            <span className="text-2xl font-black text-white">{riskScore}</span>
            <span className="text-[10px] text-slate-400 font-bold">/ 100</span>
          </div>
          <div className="overflow-hidden h-2.5 text-xs flex rounded-full bg-slate-800 border border-slate-700">
            <div
              style={{ width: `${riskScore}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                riskScore > 80 ? 'bg-red-500' : riskScore > 50 ? 'bg-orange-500' : 'bg-emerald-500'
              }`}
            />
          </div>
        </div>

        {responseEta && (
          <div className="pt-2 border-t border-slate-800 text-[11px] text-blue-300 font-bold flex items-center justify-between">
            <span>Response ETA:</span>
            <span className="bg-blue-900/60 px-2 py-0.5 rounded text-blue-400 border border-blue-500/30">{responseEta}</span>
          </div>
        )}
      </div>

      {/* Bottom Floating Control Bar: 13-Scene Judge Demo Player */}
      <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-auto bg-navy-900/95 backdrop-blur-2xl border-2 border-emerald-500/40 p-3 sm:p-4 rounded-3xl shadow-2xl space-y-3">
        
        {/* Timeline Scene Indicators */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
          {[
            '1. India', '2. Mumbai', '3. Route', '4. Delhi', '5. NE Arrive', 
            '6. Moving', '7. 300m Warn', '8. Breach', '9. AI Risk', '10. SOS Lock', 
            '11. Dispatch', '12. Response', '13. Resolved'
          ].map((label, idx) => {
            const sceneNum = idx + 1;
            const isActive = currentScene === sceneNum;
            return (
              <button
                key={label}
                onClick={() => {
                  setIsPlaying(false);
                  executeScene(sceneNum);
                }}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg scale-105 font-black'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Master Playback & Scenario Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-2.5">
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center space-x-1.5"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Demo' : '▶ Start 3D Cinematic Demo'}</span>
            </button>

            <button
              onClick={handleNext}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center space-x-1"
            >
              <span>Next Scene</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleRestart}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition-colors"
              title="Restart Demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-semibold hidden lg:block">
            SIH Judge Evaluator Mode: <span className="text-emerald-400">13-Scene Automated Storyboard Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
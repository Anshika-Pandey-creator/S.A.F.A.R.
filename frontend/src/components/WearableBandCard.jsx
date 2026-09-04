import React, { useState } from 'react';
import { Watch, Heart, ShieldAlert, Wifi, Bluetooth, Radio, BatteryCharging } from 'lucide-react';

export default function WearableBandCard() {
  const [isConnected, setIsConnected] = useState(true);
  const [heartRate, setHeartRate] = useState(76);
  const [satelliteBackup, setSatelliteBackup] = useState(true);

  const simulateFallDetection = () => {
    setHeartRate(124);
    alert('⚠️ Simulated IoT Safety Band Fall Detection Triggered! Automatic SOS queued if no movement for 30s.');
  };

  return (
    <div className="bg-navy-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
            <Watch className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">SafeTour IoT Smart Band</h4>
            <p className="text-[10px] text-slate-400 font-medium">Wearable Hardware Layer • Remote Trekking</p>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 ${
          isConnected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300'
        }`}>
          <Bluetooth className="w-3 h-3" />
          <span>{isConnected ? 'BLE PAIRED' : 'DISCONNECTED'}</span>
        </span>
      </div>

      {/* Sensor Readouts Grid */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-center space-x-1 text-rose-400 mb-0.5">
            <Heart className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400">Heart Rate</span>
          </div>
          <div className="text-base font-black text-white">{heartRate} <span className="text-[9px] font-normal text-slate-400">BPM</span></div>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-center space-x-1 text-cyan-400 mb-0.5">
            <Radio className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold text-slate-400">No-Signal Auto</span>
          </div>
          <div className="text-xs font-black text-cyan-300">Satellite SOS</div>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-center space-x-1 text-emerald-400 mb-0.5">
            <BatteryCharging className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold text-slate-400">Battery</span>
          </div>
          <div className="text-base font-black text-white">88%</div>
        </div>
      </div>

      {/* Fall Detection & Remote Auto-SOS Feature */}
      <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
        <div className="space-y-0.5">
          <div className="font-bold text-slate-200">Fall & Impact Detection</div>
          <div className="text-[10px] text-slate-400">Auto-triggers SOS if phone signal lost in mountains</div>
        </div>
        <button
          onClick={simulateFallDetection}
          className="px-2.5 py-1 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 rounded-lg font-bold text-[10px] transition-colors"
        >
          Test Impact
        </button>
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { Users, AlertTriangle, CheckCircle2, Shield, HeartHandshake, MapPin } from 'lucide-react';

export default function BystanderAlertModal({ isOpen, onClose, incident, onRespond }) {
  const [hasResponded, setHasResponded] = useState(false);

  if (!isOpen || !incident) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-soft">
      <div className="bg-navy-900 border-2 border-amber-500/60 rounded-3xl p-5 shadow-2xl space-y-4 backdrop-blur-xl relative">
        
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-black shrink-0">
            <HeartHandshake className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
                Community Safety Net
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                Nearby Alert (~450m)
              </span>
            </div>
            <h4 className="text-sm font-black text-white">Verified Tourist Emergency Nearby</h4>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
          📍 <span className="font-bold text-white">{incident.touristName || 'Fellow Tourist'}</span> triggered SOS at{' '}
          <span className="text-amber-300 font-semibold">{incident.location?.address || 'Guwahati Sector 4'}</span>.
          Official response team is en-route. Can you offer immediate bystander guidance?
        </p>

        {/* Buttons */}
        {hasResponded ? (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl flex items-center space-x-2 text-xs font-bold text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Response Registered! Official responders notified of your standby.</span>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setHasResponded(true);
                if (onRespond) onRespond();
              }}
              className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
            >
              🤝 I Can Assist / Stay Nearby
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700"
            >
              Dismiss
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

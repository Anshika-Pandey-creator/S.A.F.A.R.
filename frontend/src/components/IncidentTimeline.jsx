import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, UserCheck, AlertTriangle } from 'lucide-react';

export default function IncidentTimeline({ timeline = [] }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
        Incident Response Workflow Timeline
      </h4>
      <div className="relative pl-6 border-l-2 border-emerald-500/40 space-y-6">
        {timeline.map((step, idx) => (
          <div key={idx} className="relative group">
            {/* Step Node Icon */}
            <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-navy-900 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>

            {/* Step Body */}
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{step.title}</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-slate-300">{step.note}</p>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider inline-block">
                Status: {step.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

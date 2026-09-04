import React from 'react';
import AnimatedScore from './AnimatedScore';
import { Cpu, AlertTriangle, CheckCircle2, ShieldAlert, Activity, Navigation } from 'lucide-react';

export default function ExplainableAIPanel({ riskAnalysis }) {
  const score = riskAnalysis?.score || 15;
  const level = riskAnalysis?.level || 'LOW';
  const factors = riskAnalysis?.contributingFactors || [];
  const anomalies = riskAnalysis?.detectedAnomalies || [];
  const actions = riskAnalysis?.recommendedActions || [];
  const proxWarn = riskAnalysis?.proximityWarning;

  const getMeterColor = () => {
    if (level === 'CRITICAL') return 'from-red-600 to-rose-500 text-red-400 border-red-500';
    if (level === 'HIGH') return 'from-orange-500 to-amber-500 text-orange-400 border-orange-500';
    if (level === 'MEDIUM') return 'from-amber-500 to-yellow-400 text-amber-400 border-amber-500';
    return 'from-emerald-500 to-teal-400 text-emerald-400 border-emerald-500';
  };

  return (
    <div className="bg-navy-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white">Explainable AI Safety Engine</h3>
            <p className="text-[10px] text-slate-400">Multi-Factor Real-time Diagnostics</p>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold tracking-wider border bg-slate-900 ${getMeterColor().split(' ')[2]} ${getMeterColor().split(' ')[3]}`}>
          {level} RISK
        </span>
      </div>

      {/* Visual Risk Gauge Meter with Animated Counter */}
      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <span className="text-xs text-slate-400 font-medium">Composite AI Risk Score</span>
          <div className="flex items-baseline space-x-1">
            <AnimatedScore targetScore={score} className={`text-3xl font-black ${getMeterColor().split(' ')[2]}`} />
            <span className="text-xs text-slate-400 font-bold">/ 100</span>
          </div>
        </div>

        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getMeterColor().split(' ')[0]} ${getMeterColor().split(' ')[1]} transition-all duration-700`}
            style={{ width: `${Math.max(5, score)}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-slate-500 font-bold px-1">
          <span>0 (SAFE)</span>
          <span>30 (LOW)</span>
          <span>50 (MEDIUM)</span>
          <span>75 (HIGH)</span>
          <span>100 (CRITICAL)</span>
        </div>
      </div>

      {/* Pre-Entry Proximity Warning Banner */}
      {proxWarn && (
        <div className={`p-3 rounded-xl border space-y-1 ${
          proxWarn.severity === 'CRITICAL'
            ? 'bg-red-950/60 border-red-500/60 text-red-200'
            : proxWarn.severity === 'HIGH'
            ? 'bg-orange-950/60 border-orange-500/60 text-orange-200'
            : 'bg-amber-950/60 border-amber-500/60 text-amber-200'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center space-x-1">
              <Navigation className="w-3.5 h-3.5" />
              <span>{proxWarn.tier} WARNING</span>
            </span>
            <span className="text-[10px] font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded">
              {proxWarn.distanceMeters}m Away
            </span>
          </div>
          <p className="text-xs font-semibold">{proxWarn.message}</p>
        </div>
      )}

      {/* Detected Safety Anomalies */}
      {anomalies.length > 0 && (
        <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-3 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-red-400">
            <ShieldAlert className="w-4 h-4" />
            <span>Detected Safety Anomalies</span>
          </div>
          <ul className="space-y-1 pl-5 list-disc text-xs text-red-200">
            {anomalies.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Contributing Factors Breakdown */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-300 block">Contributing Safety Factors</span>
        <div className="space-y-1.5">
          {factors.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No elevated risk factors detected</p>
          ) : (
            factors.map((f, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-200 block">{f.factor}</span>
                  <span className="text-[11px] text-slate-400">{f.description}</span>
                </div>
                {f.weight > 0 && (
                  <span className="px-2 py-0.5 rounded bg-slate-700 text-amber-400 font-mono font-bold shrink-0 ml-2">
                    +{f.weight} pts
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recommended Safety Actions */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-300 block">AI Recommended Actions</span>
        <div className="space-y-1">
          {actions.map((act, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 bg-emerald-950/20 border border-emerald-500/20 p-2 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{act}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

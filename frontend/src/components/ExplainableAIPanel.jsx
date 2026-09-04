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
    <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-md shadow-slate-200/50 space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">Explainable AI Safety Engine</h3>
            <p className="text-[10px] text-slate-500 font-medium">Multi-Factor Real-time Diagnostics</p>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold tracking-wider border ${getMeterColor().split(' ')[2]} ${getMeterColor().split(' ')[3]}`}>
          {level} RISK
        </span>
      </div>

      {/* Visual Risk Gauge Meter with Animated Counter */}
      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <span className="text-xs text-slate-600 font-medium">Composite AI Risk Score</span>
          <div className="flex items-baseline space-x-1">
            <AnimatedScore targetScore={score} className={`text-3xl font-black ${getMeterColor().split(' ')[2]}`} />
            <span className="text-xs text-slate-500 font-bold">/ 100</span>
          </div>
        </div>

        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
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
            ? 'bg-red-50 border-red-300 text-red-900'
            : proxWarn.severity === 'HIGH'
            ? 'bg-orange-50 border-orange-300 text-orange-900'
            : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center space-x-1">
              <Navigation className="w-3.5 h-3.5 text-amber-600" />
              <span>{proxWarn.tier} WARNING</span>
            </span>
            <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-slate-300 text-slate-800">
              {proxWarn.distanceMeters}m Away
            </span>
          </div>
          <p className="text-xs font-semibold">{proxWarn.message}</p>
        </div>
      )}

      {/* Detected Safety Anomalies */}
      {anomalies.length > 0 && (
        <div className="bg-red-50 border border-red-300 rounded-xl p-3 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-red-700">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>Detected Safety Anomalies</span>
          </div>
          <ul className="space-y-1 pl-5 list-disc text-xs text-red-800">
            {anomalies.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Contributing Factors Breakdown */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-800 block">Contributing Safety Factors</span>
        <div className="space-y-1.5">
          {factors.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No elevated risk factors detected</p>
          ) : (
            factors.map((f, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-900 block">{f.factor}</span>
                  <span className="text-[11px] text-slate-600">{f.description}</span>
                </div>
                {f.weight > 0 && (
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-amber-800 font-mono font-bold shrink-0 ml-2 border border-slate-300">
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
        <span className="text-xs font-bold text-slate-800 block">AI Recommended Actions</span>
        <div className="space-y-1">
          {actions.map((act, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-slate-800 bg-emerald-50 border border-emerald-200 p-2 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{act}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

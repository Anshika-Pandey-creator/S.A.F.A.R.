import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ShieldAlert, Route, AlertOctagon, CheckCircle2, FileCode, ChevronUp, ChevronDown, Sparkles, UserCheck, ShieldCheck, Navigation, Video } from 'lucide-react';

export default function DemoControlPanel({ onTriggerScenario, onSwitchUser }) {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleScenarioClick = async (scenarioId, path = null) => {
    setLoading(true);
    try {
      if (onTriggerScenario) await onTriggerScenario(scenarioId);
      if (path) {
        navigate(path);
      }
    } catch (err) {
      console.error('Scenario Execution Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 transition-all duration-300 max-w-sm sm:max-w-md">
      <div className="bg-navy-900/95 backdrop-blur-xl border-2 border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Panel Header */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-gradient-to-r from-emerald-950 via-slate-900 to-navy-900 cursor-pointer flex items-center justify-between border-b border-emerald-500/20"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-white">
              SIH Evaluator Guided Scenario Panel
            </span>
          </div>
          <button className="text-slate-400 hover:text-white p-1">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Panel Body */}
        {isOpen && (
          <div className="p-4 space-y-3">
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              Execute live pre-entry warnings, geo-fence breaches, SOS dispatch, or 3D Cinematic Story Demo in 1 click:
            </p>

            {/* Master 3D Cinematic Demo CTA */}
            <button
              disabled={loading}
              onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center space-x-2 group"
            >
              <Video className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>🎬 Start 3D Cinematic Journey Demo</span>
            </button>

            {/* Scenarios Grid */}
            <div className="grid grid-cols-2 gap-2">
              <button
                disabled={loading}
                onClick={() => handleScenarioClick('1', '/tourist-dashboard')}
                className="flex items-center space-x-2 p-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-left group transition-all text-xs font-semibold text-emerald-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>1. Safe Location</span>
              </button>

              <button
                disabled={loading}
                onClick={() => handleScenarioClick('APPROACH_300M', '/tourist-dashboard')}
                className="flex items-center space-x-2 p-2 rounded-lg bg-yellow-950/40 hover:bg-yellow-900/60 border border-yellow-500/30 text-left group transition-all text-xs font-semibold text-yellow-300"
              >
                <Navigation className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>2. Approach 300m</span>
              </button>

              <button
                disabled={loading}
                onClick={() => handleScenarioClick('APPROACH_150M', '/tourist-dashboard')}
                className="flex items-center space-x-2 p-2 rounded-lg bg-orange-950/40 hover:bg-orange-900/60 border border-orange-500/30 text-left group transition-all text-xs font-semibold text-orange-300"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>3. Approach 150m</span>
              </button>

              <button
                disabled={loading}
                onClick={() => handleScenarioClick('2', '/tourist-dashboard')}
                className="flex items-center space-x-2 p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-left group transition-all text-xs font-semibold text-red-300"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>4. Breach Zone</span>
              </button>

              <button
                disabled={loading}
                onClick={() => handleScenarioClick('3', '/tourist-dashboard')}
                className="flex items-center space-x-2 p-2 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-left group transition-all text-xs font-semibold text-purple-300"
              >
                <Route className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>5. Route Offset</span>
              </button>

              <button
                disabled={loading}
                onClick={() => handleScenarioClick('4', '/tourist-dashboard')}
                className="flex items-center space-x-2 p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-left group transition-all text-xs font-semibold text-rose-300"
              >
                <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>6. Trigger SOS</span>
              </button>

              <button
                disabled={loading}
                onClick={() => handleScenarioClick('5', '/blockchain-ledger')}
                className="flex items-center space-x-2 p-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-left group transition-all text-xs font-semibold text-cyan-300"
              >
                <FileCode className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>7. Verify Blockchain</span>
              </button>

              <button
                disabled={loading}
                onClick={() => handleScenarioClick('6', '/blockchain-ledger')}
                className="flex items-center space-x-2 p-2 rounded-lg bg-rose-950/50 hover:bg-rose-900/70 border border-rose-500/40 text-left group transition-all text-xs font-semibold text-rose-300"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>8. Tampering Test</span>
              </button>
            </div>

            {/* Quick Role Switcher */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Role Switch:</span>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => {
                    if (onSwitchUser) onSwitchUser('TOURIST');
                    navigate('/tourist-dashboard');
                  }}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 rounded flex items-center space-x-1 border border-slate-700"
                >
                  <UserCheck className="w-3 h-3 text-emerald-400" />
                  <span>Tourist Hub</span>
                </button>
                <button
                  onClick={() => {
                    if (onSwitchUser) onSwitchUser('AUTHORITY');
                    navigate('/authority-dashboard');
                  }}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 rounded flex items-center space-x-1 border border-slate-700"
                >
                  <ShieldCheck className="w-3 h-3 text-teal-400" />
                  <span>Authority Command</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
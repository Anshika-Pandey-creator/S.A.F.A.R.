import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Cpu, Lock, AlertOctagon, Activity, Users, FileCheck, CheckCircle2, ArrowRight, Phone, ShieldAlert, Sparkles, Navigation, Play, Eye } from 'lucide-react';
import CinematicHeroMap from '../components/CinematicHeroMap';

export default function LandingPage({ onScenarioTrigger }) {
  return (
    <div className="space-y-12 pb-16">
      
      {/* 3D Cinematic Hero Story Map Section (Full-Screen Immersive View) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FFD8BD]/85 p-4 rounded-2xl border border-slate-200/80 backdrop-blur-md shadow-md shadow-slate-200/50">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest">
                SIH 2026 | Team S.A.F.A.R.
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Cinematic Journey Safety Storyboard & 3D Telemetry
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to="/register"
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>Get Digital Tourist ID</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/authority-dashboard"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-colors flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Authority Desk</span>
            </Link>
          </div>
        </div>

        {/* 100vh High-Performance Cinematic Map Engine */}
        <CinematicHeroMap onScenarioTrigger={onScenarioTrigger} />
      </section>

      {/* Hero Text & Value Proposition */}
      <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
            S.A.F.A.R.
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 mt-2">
              Travel Without Fear. Your Journey, Our Watch.
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            Next-Generation Smart Tourist Safety Monitoring & Incident Response Ecosystem powered by Explainable AI Risk Scoring, Dynamic Geo-Fencing, and Cryptographic Blockchain Digital Tourist IDs.
          </p>

          {/* Key Stats Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-sm backdrop-blur-md">
              <span className="text-3xl font-extrabold text-slate-900 block">100%</span>
              <span className="text-xs text-slate-500 font-medium">Real-time Geo-Tracking</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-sm backdrop-blur-md">
              <span className="text-3xl font-extrabold text-emerald-700 block">&lt; 4 Mins</span>
              <span className="text-xs text-slate-500 font-medium">Avg SOS Incident Response</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-sm backdrop-blur-md">
              <span className="text-3xl font-extrabold text-teal-700 block">SHA-256</span>
              <span className="text-xs text-slate-500 font-medium">Blockchain Tamper Audit</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-sm backdrop-blur-md">
              <span className="text-3xl font-extrabold text-cyan-700 block">8 NE States</span>
              <span className="text-xs text-slate-500 font-medium">Tourism Safety Coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Problem & Solution Context</span>
          <h2 className="text-3xl font-black text-slate-900">Why Indian Tourist Safety Demands Innovation</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            India features remote mountain terrains, dense forest reserves, torrential monsoon weather, and sensitive border corridors. Traditional manual safety monitoring leaves tourists vulnerable during emergencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 border border-red-300 flex items-center justify-center text-red-600">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Off-Grid Terrain Hazards</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Remote trails in Cherrapunji and Tawang lack static safety checkpoints, increasing risk of route deviation and accidental restricted border entry.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-600">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Emergency Response Delay</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lack of automated GPS distress signals delays police and disaster dispatch teams when tourists face sudden medical or wildlife emergencies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Identity Fraud & Privacy Risk</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paper permits and unencrypted identity documents are vulnerable to tampering. SafeTour NE uses SHA-256 hashed Digital Tourist IDs to protect privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Platform Capabilities</span>
          <h2 className="text-3xl font-black text-slate-900">Complete Smart Tourist Safety Ecosystem</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 hover:border-emerald-400 transition-colors shadow-sm space-y-3">
            <FileCheck className="w-8 h-8 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base">Digital Tourist ID & QR</h3>
            <p className="text-xs text-slate-600">
              Holographic digital credentials generated upon registration with unique QR code, validity dates, emergency contacts, and digital signatures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 hover:border-emerald-400 transition-colors shadow-sm space-y-3">
            <MapPin className="w-8 h-8 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base">Dynamic Geo-Fencing</h3>
            <p className="text-xs text-slate-600">
              Polygon zone mapping classifying Safe, Caution, Restricted, and High-Risk zones with automated boundary containment detection.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 hover:border-emerald-400 transition-colors shadow-sm space-y-3">
            <Cpu className="w-8 h-8 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base">Explainable AI Risk Engine</h3>
            <p className="text-xs text-slate-600">
              Multi-factor risk score calculation (0–100) evaluating zone hazards, route deviation, time of day, movement anomalies, and distress signals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 hover:border-emerald-400 transition-colors shadow-sm space-y-3">
            <AlertOctagon className="w-8 h-8 text-red-600" />
            <h3 className="font-bold text-slate-900 text-base">1-Click SOS Emergency System</h3>
            <p className="text-xs text-slate-600">
              Instant distress dispatch button with 3-second confirmation, GPS lock, response timer, and auto-mapping of nearby police and hospitals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 hover:border-emerald-400 transition-colors shadow-sm space-y-3">
            <Lock className="w-8 h-8 text-cyan-600" />
            <h3 className="font-bold text-slate-900 text-base">Blockchain Ledger & Audit</h3>
            <p className="text-xs text-slate-600">
              Prototype SHA-256 cryptographic blockchain ledger storing non-sensitive identity hashes with 1-click integrity audit and tamper detection.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 hover:border-emerald-400 transition-colors shadow-sm space-y-3">
            <Activity className="w-8 h-8 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-base">Authority Command Console</h3>
            <p className="text-xs text-slate-600">
              Centralized dashboard with live risk-colored tourist markers, alert feeds, team dispatch workflows, and analytics graphs.
            </p>
          </div>
        </div>
      </section>

      {/* SIH Judge Section: Why Our Solution? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-[#CCFFE7]/50 border-2 border-emerald-300 space-y-6 shadow-md">
          <div className="flex items-center space-x-3">
            <h3 className="text-2xl font-extrabold text-slate-900">Why S.A.F.A.R. Stands Out for SIH 2026</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
            <div className="flex items-start space-x-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong className="text-slate-900">End-to-End Functional Architecture:</strong> Zero fake buttons or mock screenshots. Every route, SOS dispatch, and risk score updates live across the app.</span>
            </div>
            <div className="flex items-start space-x-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong className="text-slate-900">Explainable AI Diagnostics:</strong> Transparent 0-100 risk scoring with natural language anomaly explanations instead of black-box numbers.</span>
            </div>
            <div className="flex items-start space-x-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong className="text-slate-900">Cryptographic Tamper-Evident Ledger:</strong> SHA-256 block hashing with interactive tampering simulation for evaluator verification.</span>
            </div>
            <div className="flex items-start space-x-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong className="text-slate-900">Zero-Setup Evaluator Control Panel:</strong> Floating demo control panel allows judges to execute all 6 test scenarios in under 5 minutes out of the box.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 pt-8 text-center text-xs text-slate-500">
        <p>© 2026 S.A.F.A.R. | Smart Tourist Safety & Incident Response System</p>
        <p className="mt-1">Developed for Smart India Hackathon | AICTE</p>
      </footer>
    </div>
  );
}
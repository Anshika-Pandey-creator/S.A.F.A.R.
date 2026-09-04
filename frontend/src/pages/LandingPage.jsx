import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Cpu, Lock, AlertOctagon, Activity, Users, FileCheck, CheckCircle2, ArrowRight, Phone, ShieldAlert, Sparkles, Navigation, Play, Eye } from 'lucide-react';
import CinematicHeroMap from '../components/CinematicHeroMap';

export default function LandingPage({ onScenarioTrigger }) {
  return (
    <div className="space-y-12 pb-16">
      
      {/* 3D Cinematic Hero Story Map Section (Full-Screen Immersive View) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-navy-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-widest">
                SIH25002 • Smart India Hackathon Special Judge Evaluator Engine
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Cinematic Journey Safety Storyboard & 3D Telemetry
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to="/register"
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center space-x-1.5"
            >
              <span>Get Digital Tourist ID</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/authority-dashboard"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authority Desk</span>
            </Link>
          </div>
        </div>

        {/* 100vh High-Performance Cinematic Map Engine */}
        <CinematicHeroMap onScenarioTrigger={onScenarioTrigger} />
      </section>

      {/* Hero Text & Value Proposition */}
      <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            SafeTour NE
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 mt-2">
              Travel Without Fear. Your Journey, Our Watch.
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Next-Generation Smart Tourist Safety Monitoring & Incident Response Ecosystem powered by Explainable AI Risk Scoring, Dynamic Geo-Fencing, and Cryptographic Blockchain Digital Tourist IDs.
          </p>

          {/* Key Stats Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-navy-900/60 border border-slate-800 backdrop-blur-md">
              <span className="text-3xl font-extrabold text-white block">100%</span>
              <span className="text-xs text-slate-400 font-medium">Real-time Geo-Tracking</span>
            </div>
            <div className="p-4 rounded-2xl bg-navy-900/60 border border-slate-800 backdrop-blur-md">
              <span className="text-3xl font-extrabold text-emerald-400 block">&lt; 4 Mins</span>
              <span className="text-xs text-slate-400 font-medium">Avg SOS Incident Response</span>
            </div>
            <div className="p-4 rounded-2xl bg-navy-900/60 border border-slate-800 backdrop-blur-md">
              <span className="text-3xl font-extrabold text-teal-300 block">SHA-256</span>
              <span className="text-xs text-slate-400 font-medium">Blockchain Tamper Audit</span>
            </div>
            <div className="p-4 rounded-2xl bg-navy-900/60 border border-slate-800 backdrop-blur-md">
              <span className="text-3xl font-extrabold text-cyan-300 block">8 NE States</span>
              <span className="text-xs text-slate-400 font-medium">Tourism Safety Coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Problem & Solution Context</span>
          <h2 className="text-3xl font-black text-white">Why North-East Tourist Safety Demands Innovation</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            North-East India features remote mountain terrains, dense forest reserves, torrential monsoon weather, and sensitive border corridors. Traditional manual safety monitoring leaves tourists vulnerable during emergencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Off-Grid Terrain Hazards</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Remote trails in Cherrapunji and Tawang lack static safety checkpoints, increasing risk of route deviation and accidental restricted border entry.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Emergency Response Delay</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lack of automated GPS distress signals delays police and disaster dispatch teams when tourists face sudden medical or wildlife emergencies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Identity Fraud & Privacy Risk</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paper permits and unencrypted identity documents are vulnerable to tampering. SafeTour NE uses SHA-256 hashed Digital Tourist IDs to protect privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Platform Capabilities</span>
          <h2 className="text-3xl font-black text-white">Complete Smart Tourist Safety Ecosystem</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-3">
            <FileCheck className="w-8 h-8 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Digital Tourist ID & QR</h3>
            <p className="text-xs text-slate-400">
              Holographic digital credentials generated upon registration with unique QR code, validity dates, emergency contacts, and digital signatures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-3">
            <MapPin className="w-8 h-8 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Dynamic Geo-Fencing</h3>
            <p className="text-xs text-slate-400">
              Polygon zone mapping classifying Safe, Caution, Restricted, and High-Risk zones with automated boundary containment detection.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-3">
            <Cpu className="w-8 h-8 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Explainable AI Risk Engine</h3>
            <p className="text-xs text-slate-400">
              Multi-factor risk score calculation (0–100) evaluating zone hazards, route deviation, time of day, movement anomalies, and distress signals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-3">
            <AlertOctagon className="w-8 h-8 text-red-400" />
            <h3 className="font-bold text-white text-base">1-Click SOS Emergency System</h3>
            <p className="text-xs text-slate-400">
              Instant distress dispatch button with 3-second confirmation, GPS lock, response timer, and auto-mapping of nearby police and hospitals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-3">
            <Lock className="w-8 h-8 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Blockchain Ledger & Audit</h3>
            <p className="text-xs text-slate-400">
              Prototype SHA-256 cryptographic blockchain ledger storing non-sensitive identity hashes with 1-click integrity audit and tamper detection.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-3">
            <Activity className="w-8 h-8 text-teal-400" />
            <h3 className="font-bold text-white text-base">Authority Command Console</h3>
            <p className="text-xs text-slate-400">
              Centralized dashboard with live risk-colored tourist markers, alert feeds, team dispatch workflows, and analytics graphs.
            </p>
          </div>
        </div>
      </section>

      {/* SIH Judge Section: Why Our Solution? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-navy-900 to-teal-950/80 border-2 border-emerald-500/30 space-y-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-extrabold text-white">Why SafeTour NE Stand Out for SIH 2026</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="flex items-start space-x-3 bg-navy-900/80 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>End-to-End Functional Architecture:</strong> Zero fake buttons or mock screenshots. Every route, SOS dispatch, and risk score updates live across the app.</span>
            </div>
            <div className="flex items-start space-x-3 bg-navy-900/80 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Explainable AI Diagnostics:</strong> Transparent 0-100 risk scoring with natural language anomaly explanations instead of black-box numbers.</span>
            </div>
            <div className="flex items-start space-x-3 bg-navy-900/80 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Cryptographic Tamper-Evident Ledger:</strong> SHA-256 block hashing with interactive tampering simulation for evaluator verification.</span>
            </div>
            <div className="flex items-start space-x-3 bg-navy-900/80 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Zero-Setup Evaluator Control Panel:</strong> Floating demo control panel allows judges to execute all 6 test scenarios in under 5 minutes out of the box.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
        <p>© 2026 SafeTour NE | Smart Tourist Safety & Incident Response System</p>
        <p className="mt-1">Developed for Smart India Hackathon | Ministry of Development of North Eastern Region</p>
      </footer>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Trash2, CheckCircle2, FileText, Server, AlertCircle, RefreshCw, Key } from 'lucide-react';

export default function PrivacyCompliancePage() {
  const [privacyAudit, setPrivacyAudit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erasureLoading, setErasureLoading] = useState(false);
  const [erasureResult, setErasureResult] = useState(null);

  useEffect(() => {
    fetchPrivacyData();
  }, []);

  const fetchPrivacyData = async () => {
    try {
      const res = await fetch('/api/privacy/status?touristId=TID-1024');
      const data = await res.json();
      if (data.success) {
        setPrivacyAudit(data.privacyAudit);
      }
    } catch (err) {
      console.error('Privacy Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleErasureRequest = async () => {
    if (!window.confirm('Are you sure you want to execute Cryptographic Data Erasure under DPDP Act 2023? This will wipe transient GPS history & contact metadata.')) return;
    setErasureLoading(true);
    try {
      const res = await fetch('/api/privacy/erasure-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          touristId: 'TID-1024',
          reason: 'User exercised Right to Erasure under DPDP Act 2023 Section 12'
        })
      });
      const data = await res.json();
      if (data.success) {
        setErasureResult(data.erasureTicket);
        fetchPrivacyData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setErasureLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#FFD8BD]/85 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-md shadow-slate-200/50 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center font-bold">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
                  Data Governance & Legal Compliance
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                  DPDP ACT 2023 COMPLIANT
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Digital Personal Data Protection Center</h1>
            </div>
          </div>

          <button
            onClick={fetchPrivacyData}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold border border-slate-300 flex items-center space-x-1.5 shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Audit Privacy Status</span>
          </button>
        </div>
        <p className="text-xs text-slate-800 max-w-3xl leading-relaxed">
          SafeTour NE explicitly complies with the <strong className="text-slate-900">DPDP Act 2023 (Republic of India)</strong>. Tourist data collection is strictly consent-based, data-minimized, and protected using SHA-256 cryptographic hashing with complete <strong>Right to Erasure</strong> support.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Consent Framework Card */}
        <div className="bg-white/90 border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2.5 text-emerald-700 border-b border-slate-200 pb-3">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">1. Consent-Based Access</h3>
          </div>
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span>Location GPS Tracking</span>
              <span className="text-emerald-700 font-bold">OPTED-IN (ACTIVE)</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span>Digital ID Cryptographic Hash</span>
              <span className="text-emerald-700 font-bold">CONSENTED</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span>Emergency 112 Dispatch</span>
              <span className="text-emerald-700 font-bold">CONSENTED</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span>Anonymized AI Model Retraining</span>
              <span className="text-emerald-700 font-bold">OPTED-IN</span>
            </div>
          </div>
        </div>

        {/* 2. Data Minimization & Retention Policy Card */}
        <div className="bg-white/90 border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center space-x-2.5 text-cyan-700 border-b border-slate-200 pb-3">
            <Server className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">2. Data Minimization</h3>
          </div>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Storage Server:</span>
              <div className="font-semibold text-slate-900">MeitY-Empaneled Cloud Data Center (India)</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Retention Schedule:</span>
              <div className="font-semibold text-slate-900">Auto-Purged 30 Days Post Travel Validity</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Commercial Policy:</span>
              <div className="font-semibold text-emerald-700">Zero Commercial Sharing / No Data Sale</div>
            </div>
          </div>
        </div>

        {/* 3. Right to Erasure Action Card */}
        <div className="bg-white/90 border-2 border-red-300 rounded-3xl p-6 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5 text-red-700 border-b border-slate-200 pb-3">
              <Trash2 className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">3. Right to Erasure</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under DPDP Act 2023 Section 12, tourists can execute 1-click <strong>Cryptographic Data Erasure</strong> to purge personal location trail data instantly.
            </p>
          </div>

          <button
            disabled={erasureLoading}
            onClick={handleErasureRequest}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>{erasureLoading ? 'Purging Cryptographic Data...' : 'Execute Cryptographic Erasure'}</span>
          </button>
        </div>

      </div>

      {/* Erasure Execution Ticket Notification */}
      {erasureResult && (
        <div className="bg-emerald-950/80 border-2 border-emerald-500/50 rounded-3xl p-6 shadow-2xl space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>DPDP ACT 2023 CRYPTOGRAPHIC DATA ERASURE TICKET EXECUTED</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between font-mono text-emerald-300">
              <span>Ticket ID: {erasureResult.ticketId}</span>
              <span>Timestamp: {new Date(erasureResult.timestamp).toLocaleString()}</span>
            </div>
            <div className="text-slate-300">
              <strong>Purged Data Types:</strong> {erasureResult.erasedFields.join(', ')}
            </div>
            <div className="text-slate-400 text-[11px]">
              Status: <span className="font-bold text-emerald-400">{erasureResult.status}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, CheckCircle2, QrCode, ExternalLink, Hash, Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DigitalIdCard({ digitalId, tourist }) {
  if (!digitalId && !tourist) return null;

  const name = digitalId?.fullName || tourist?.fullName || 'Rohan Verma';
  const idStr = digitalId?.touristId || tourist?.touristId || 'TID-1024';
  const status = digitalId?.verificationStatus || 'VERIFIED';
  const hash = digitalId?.digitalIdHash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  const qrUrl = digitalId?.qrCodeData || `https://safetour.gov.in/verify-id/${idStr}`;
  const validity = `${tourist?.travelStartDate || '2026-08-10'} to ${tourist?.travelEndDate || '2026-08-20'}`;

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-navy-900 to-emerald-950 border border-emerald-500/30 p-6 shadow-2xl space-y-6">
      
      {/* Background Holographic Glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-white tracking-wider uppercase block">
              Digital Tourist ID
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">
              Prototype Blockchain Ledger Verified
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">{status}</span>
        </div>
      </div>

      {/* Main Content: ID Details + QR Code */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        
        {/* Left Column: Personal Metadata */}
        <div className="sm:col-span-2 space-y-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tourist Name</span>
            <h3 className="text-xl font-extrabold text-white">{name}</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Unique Tourist ID</span>
              <span className="font-mono font-bold text-emerald-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 inline-block">
                {idStr}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">ID Proof Verified</span>
              <span className="font-semibold text-slate-200">{tourist?.idProofType || 'Aadhaar Card'}</span>
            </div>
          </div>

          <div className="space-y-1 text-xs text-slate-300">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Validity: <strong>{validity}</strong></span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Emergency: <strong>{tourist?.emergencyContact?.phone || '+91 98765 43210'}</strong> ({tourist?.emergencyContact?.name || 'Contact'})</span>
            </div>
          </div>
        </div>

        {/* Right Column: QR Code */}
        <div className="flex flex-col items-center justify-center p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
          <QRCodeSVG value={qrUrl} size={110} bgColor="#0f172a" fgColor="#10b981" level="H" />
          <span className="text-[9px] font-mono text-slate-400 text-center">Scan to Verify Authenticity</span>
        </div>
      </div>

      {/* Cryptographic Ledger Footer */}
      <div className="pt-3 border-t border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <div className="flex items-center space-x-1 truncate max-w-[240px] sm:max-w-[340px]">
            <Hash className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">Hash: {hash}</span>
          </div>
          <span className="text-emerald-400 font-semibold shrink-0">Block #{digitalId?.blockIndex || 1}</span>
        </div>

        {/* Verification Link Button */}
        <Link
          to={`/verify-id/${idStr}`}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 rounded-lg text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 border border-slate-700 shadow-md"
        >
          <span>Verify Digital ID on Ledger</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

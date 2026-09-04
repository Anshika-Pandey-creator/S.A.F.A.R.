import React, { useState, useEffect } from 'react';
import { ShieldCheck, QrCode, CheckCircle2, Car, Home, Compass, Star, AlertCircle, Search, ExternalLink } from 'lucide-react';

export default function VendorMarketplacePage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await fetch('/api/blockchain/vendors');
      const data = await res.json();
      if (data.success) {
        setVendors(data.vendors);
      }
    } catch (err) {
      console.error('Vendor Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyVendor = async (vendor) => {
    setSelectedVendor(vendor);
    try {
      const res = await fetch(`/api/blockchain/verify-vendor/${vendor.id}`);
      const data = await res.json();
      setVerificationResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-navy-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
            <QrCode className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
                Blockchain-Verified Operator Registry
              </span>
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-cyan-500/30">
                SHA-256 LEDGER AUTHENTICATED
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Verified Local Vendor Marketplace</h1>
          </div>
        </div>
        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          Verify authentic local tour guides, taxis, and homestays registered on the government-backed blockchain. Scanning vendor QR hashes eliminates fake operators and ensures complaint history tracking.
        </p>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-navy-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5 flex flex-col justify-between group hover:border-cyan-500/50 transition-all"
          >
            <div className="space-y-3">
              
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {vendor.type === 'CERTIFIED_GUIDE' ? (
                    <Compass className="w-5 h-5" />
                  ) : vendor.type === 'VERIFIED_TAXI' ? (
                    <Car className="w-5 h-5" />
                  ) : (
                    <Home className="w-5 h-5" />
                  )}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase border border-emerald-500/30 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>BLOCKCHAIN VERIFIED</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                  {vendor.name}
                </h3>
                <p className="text-xs text-slate-400 font-semibold">{vendor.category}</p>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Govt License:</span>
                  <span className="font-mono text-slate-200 font-bold">{vendor.licenseNo}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Location:</span>
                  <span className="text-slate-200 font-semibold">{vendor.location}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Complaint History:</span>
                  <span className="text-emerald-400 font-extrabold">{vendor.complaintHistory} Complaints</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center space-x-1 text-amber-400 font-extrabold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{vendor.rating}</span>
                  <span className="text-slate-500 font-normal">({vendor.reviewsCount} reviews)</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Block #{vendor.blockIndex}</span>
              </div>

            </div>

            <button
              onClick={() => handleVerifyVendor(vendor)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-extrabold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center space-x-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Verify SHA-256 QR Hash</span>
            </button>
          </div>
        ))}
      </div>

      {/* Verification Result Modal */}
      {selectedVendor && verificationResult && (
        <div className="bg-slate-900 border-2 border-cyan-500/50 rounded-3xl p-6 shadow-2xl space-y-4 max-w-xl mx-auto">
          <div className="flex items-center space-x-3 text-emerald-400 font-black text-sm">
            <CheckCircle2 className="w-6 h-6" />
            <span>{verificationResult.message}</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-cyan-300 font-bold">Vendor: {selectedVendor.name}</div>
            <div className="text-slate-400">Blockchain Hash: {selectedVendor.blockchainHash}</div>
            <div className="text-slate-400">License: {selectedVendor.licenseNo}</div>
            <div className="text-emerald-400 font-bold">Verification: {selectedVendor.verificationStatus}</div>
          </div>
          <button
            onClick={() => {
              setSelectedVendor(null);
              setVerificationResult(null);
            }}
            className="w-full py-2 bg-slate-800 text-white font-bold text-xs rounded-xl"
          >
            Close Verification Window
          </button>
        </div>
      )}

    </div>
  );
}

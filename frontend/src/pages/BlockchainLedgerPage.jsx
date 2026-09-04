import React, { useState, useEffect } from 'react';
import { FileCode, ShieldCheck, AlertTriangle, CheckCircle2, RefreshCw, Lock, Hash, ShieldAlert, Cpu } from 'lucide-react';

export default function BlockchainLedgerPage() {
  const [ledgerData, setLedgerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auditResult, setAuditResult] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  useEffect(() => {
    fetchLedger();
  }, []);

  const fetchLedger = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blockchain');
      const data = await res.json();
      setLedgerData(data);
      setAuditResult(data.auditResult);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blockchain/verify', { method: 'POST' });
      const data = await res.json();
      setAuditResult(data.audit);
      setActionMessage('SHA-256 cryptographic chain audit completed.');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTamper = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blockchain/tamper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetIndex: 1 })
      });
      const data = await res.json();
      setActionMessage(data.message);
      fetchLedger();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blockchain/restore', { method: 'POST' });
      const data = await res.json();
      setActionMessage(data.message);
      fetchLedger();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isChainValid = auditResult?.isValid;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-2xl text-white">Prototype Blockchain Ledger & Tamper Audit</span>
            <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-cyan-500/30 uppercase tracking-widest">
              Private SHA-256 Ledger
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-Evident Digital Tourist ID Verification Engine
          </p>
        </div>

        {/* Audit Actions Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            disabled={loading}
            onClick={handleVerify}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center space-x-1.5 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Verify Integrity Audit</span>
          </button>

          <button
            disabled={loading}
            onClick={handleTamper}
            className="px-4 py-2 bg-rose-900/60 hover:bg-rose-800/80 text-rose-300 font-bold text-xs rounded-xl border border-rose-500/40 flex items-center space-x-1.5 transition-all"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Simulate Tampering (Block #1)</span>
          </button>

          <button
            disabled={loading}
            onClick={handleRestore}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center space-x-1.5 transition-all"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span>Restore Ledger</span>
          </button>
        </div>
      </div>

      {/* Audit Banner Result */}
      {auditResult && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          isChainValid ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-red-950/60 border-red-500/60 text-red-300 glow-red'
        }`}>
          <div className="flex items-center space-x-3">
            {isChainValid ? <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />}
            <div>
              <span className="font-extrabold text-sm block">
                {isChainValid ? '✓ Prototype Blockchain Ledger Integrity Verified' : '✗ Tampering Detected! Cryptographic Audit Failed'}
              </span>
              <p className="text-xs text-slate-300">{auditResult.error || auditResult.message}</p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            Total Blocks: {ledgerData?.chain?.length || 0}
          </span>
        </div>
      )}

      {/* Blocks Chain Visual Explorer */}
      <div className="space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 block">
          Block Ledger Chain Visualization
        </span>

        <div className="space-y-4">
          {ledgerData?.chain?.map((block, idx) => {
            const isTamperedBlock = ledgerData.isTampered && ledgerData.tamperedBlockIndex === block.index;

            return (
              <div
                key={block.index}
                className={`p-5 rounded-2xl border transition-all ${
                  isTamperedBlock
                    ? 'bg-red-950/80 border-red-500 glow-red'
                    : 'bg-navy-900 border-slate-800 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-black bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                      Block #{block.index}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {block.index === 0 ? 'Genesis Node' : `Tourist Digital ID Record (${block.data?.touristId || 'TID-1024'})`}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    Timestamp: {new Date(block.timestamp).toLocaleString()}
                  </span>
                </div>

                {/* Hashes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 font-mono text-[11px]">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Previous Block Hash</span>
                    <span className="text-slate-400 break-all">{block.previousHash}</span>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Current Block SHA-256 Hash</span>
                    <span className={`break-all font-bold ${isTamperedBlock ? 'text-red-400' : 'text-emerald-400'}`}>
                      {block.hash}
                    </span>
                  </div>
                </div>

                {/* Block Data Metadata */}
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Payload Verification Data</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300 text-[11px]">
                    <div>
                      <span>Status: </span>
                      <strong className={isTamperedBlock ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                        {block.data?.verificationStatus}
                      </strong>
                    </div>
                    <div>
                      <span>Issuer: </span>
                      <strong className="text-slate-200">{block.data?.issuer}</strong>
                    </div>
                    <div className="truncate font-mono">
                      <span>Digital ID Hash: </span>
                      <strong className="text-cyan-400">{block.data?.digitalIdHash?.substring(0, 16)}...</strong>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BarChart3, TrendingUp, ShieldCheck, Clock, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analytics');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return <div className="p-12 text-center text-slate-400">Loading Intelligence Analytics...</div>;
  }

  const { overview, riskDistribution, incidentsByType, incidentsBySeverity, dailyTrend } = data;

  const COLORS = ['#EF4444', '#F97316', '#F59E0B', '#10B981'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="bg-[#FFD8BD]/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-md shadow-slate-200/50 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Authority Analytics & Intelligence</h2>
          <p className="text-xs text-slate-500">
            Real-Time Statistical Insights on Incident Trends, Geo-Fence Breaches, and Emergency Response Times
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-extrabold block">Avg Emergency Response Time</span>
          <span className="text-2xl font-black text-emerald-700">{overview.avgResponseTimeMinutes} mins</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-extrabold block">Total Monitored Tourists</span>
          <span className="text-2xl font-black text-slate-900">{overview.totalTourists}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-extrabold block">Geo-Fence Violations</span>
          <span className="text-2xl font-black text-amber-700">{overview.geofenceViolations}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-extrabold block">Resolution Success Rate</span>
          <span className="text-2xl font-black text-teal-700">94.2%</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Incident Trend Area Chart */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-md space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 block">
            Weekly Incident & SOS Emergency Trend
          </span>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyTrend}>
                <defs>
                  <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" textAnchor="end" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a' }} />
                <Area type="monotone" dataKey="incidents" stroke="#EF4444" fillOpacity={1} fill="url(#colorInc)" name="Incidents Reported" />
                <Area type="monotone" dataKey="resolved" stroke="#10B981" fillOpacity={1} fill="url(#colorRes)" name="Incidents Resolved" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incidents by Severity Pie Chart */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-md space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 block">
            Incident Severity Breakdown
          </span>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentsBySeverity}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="severity"
                  label
                >
                  {incidentsBySeverity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incidents by Category Bar Chart */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-md space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 block">
            Incidents by Category Classification
          </span>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentsByType}>
                <XAxis dataKey="type" stroke="#64748b" tick={{ fontSize: 9 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a' }} />
                <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Incident Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tourist Risk Level Distribution Bar Chart */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-md space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 block">
            Monitored Tourist Risk Distribution
          </span>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistribution}>
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a' }} />
                <Bar dataKey="value" fill="#10B981" radius={[6, 6, 0, 0]} name="Tourists Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

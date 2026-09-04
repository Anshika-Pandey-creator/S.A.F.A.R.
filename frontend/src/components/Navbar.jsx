import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, AlertTriangle, Bell, User, LogOut, Navigation, FileCheck, BarChart3, Settings, Activity } from 'lucide-react';

export default function Navbar({ currentUser, onLogout, notifications = [], onMarkRead, onShowLoader }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifs, setShowNotifs] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#E33900] via-[#FFAC75] to-[#E33900]/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Emblem */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-brand-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-navy-1000">
                S.A.F.A.R.
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 uppercase tracking-widest">
                SIH26207
              </span>
            </div>
            <p className="text-[11px] text-slate-1000 font-medium hidden sm:block">
              SafeTourism for All
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {/* Replay Patriotic Indian Flag Intro */}
          {onShowLoader && (
            <button
              onClick={onShowLoader}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 transition-all flex items-center space-x-1.5 shadow-xs"
              title="Play Indian Flag Intro Animation"
            >
              <span>🇮🇳</span>
              <span>Flag Intro</span>
            </button>
          )}

          <Link
            to="/"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === '/' ? 'bg-slate-200/70 text-emerald-800 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Overview
          </Link>

          {currentUser?.role === 'TOURIST' && (
            <>
              <Link
                to="/tourist-dashboard"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  location.pathname === '/tourist-dashboard' ? 'bg-slate-200/70 text-emerald-800 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Safety Hub</span>
              </Link>
              <Link
                to="/trip-planner"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  location.pathname === '/trip-planner' ? 'bg-slate-200/70 text-emerald-800 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>Trip Planner</span>
              </Link>
            </>
          )}

          {currentUser?.role === 'AUTHORITY' && (
            <>
              <Link
                to="/authority-dashboard"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  location.pathname === '/authority-dashboard' ? 'bg-slate-200/70 text-emerald-800 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>Command Desk</span>
              </Link>
              <Link
                to="/geo-fence-management"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  location.pathname === '/geo-fence-management' ? 'bg-slate-200/70 text-emerald-800 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4 text-emerald-600" />
                <span>Geo-Fences</span>
              </Link>
              <Link
                to="/incidents"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  location.pathname === '/incidents' ? 'bg-slate-200/70 text-emerald-800 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Incidents</span>
              </Link>
              <Link
                to="/blockchain-ledger"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  location.pathname === '/blockchain-ledger' ? 'bg-slate-200/70 text-emerald-800 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>Blockchain</span>
              </Link>
            </>
          )}

          <Link
            to="/vendor-marketplace"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
              location.pathname === '/vendor-marketplace' ? 'bg-slate-200/70 text-cyan-800 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span>Vendors</span>
          </Link>

          <Link
            to="/privacy-compliance"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
              location.pathname === '/privacy-compliance' ? 'bg-slate-200/70 text-emerald-800 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span>DPDP Privacy</span>
          </Link>
        </nav>

        {/* User & Notifications CTA */}
        <div className="flex items-center space-x-3">
          
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce-soft shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold text-slate-800">Live System Alerts</span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => onMarkRead()}
                      className="text-xs text-emerald-700 hover:underline font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-sm">No active alerts</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 text-xs transition-colors ${
                          !n.read ? 'bg-emerald-50/40 border-l-2 border-emerald-500' : 'opacity-70'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`font-bold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded ${
                              n.type === 'CRITICAL'
                                ? 'bg-red-100 text-red-700 border border-red-200'
                                : n.type === 'HIGH'
                                ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                : n.type === 'MEDIUM'
                                ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {n.type}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-800 mb-0.5">{n.title}</p>
                        <p className="text-slate-600 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Auth State */}
          {currentUser ? (
            <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs border border-emerald-300">
                {currentUser.name ? currentUser.name[0] : 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-800 leading-tight">{currentUser.name}</p>
                <p className="text-[10px] text-emerald-700 font-mono font-bold">
                  {currentUser.role} {currentUser.touristId ? `(${currentUser.touristId})` : ''}
                </p>
              </div>
              <button
                onClick={onLogout}
                className="p-1 text-slate-400 hover:text-red-600 transition-colors ml-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 rounded-lg shadow-sm transition-all"
              >
                Register Digital ID
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

import React, { useState } from 'react';

const AdminDashboard = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const rawUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const backendUrl = rawUrl.replace(/\/$/, '');

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getInitialColor = (name) => {
    const colors = [
      'from-amber-500 to-orange-600',
      'from-emerald-500 to-teal-600',
      'from-blue-500 to-indigo-600',
      'from-rose-500 to-pink-600',
      'from-violet-500 to-purple-600',
      'from-cyan-500 to-sky-600',
    ];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/api/admin/registrations`, {
        headers: { 'x-admin-password': password },
      });

      if (!response.ok) {
        throw new Error('Invalid Admin Password');
      }

      const data = await response.json();
      setRegistrations(data);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen stadium-bg flex items-center justify-center p-4">
        <div className="noise-overlay" />
        <div className="relative z-10 w-full max-w-md bg-midnight-200/90 backdrop-blur-md rounded-2xl border border-gold/20 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold/20 to-fire/10 flex items-center justify-center border border-gold/30">
              <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h1 className="font-display font-bold text-3xl text-gradient-gold mb-2">Admin Access</h1>
            <p className="text-ash/70 font-body text-sm">Enter the admin password to view registrations</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-midnight-300/50 border border-ash/20 rounded-xl px-4 py-3.5 text-snow placeholder-ash/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-body font-medium"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-fire text-sm font-medium bg-fire/10 border border-fire/20 rounded-lg px-4 py-2.5">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-fire to-fire-light hover:from-fire-light hover:to-fire text-snow font-display font-bold text-lg py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying...
                </span>
              ) : 'Unlock Dashboard'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-gold/50 hover:text-gold text-sm transition-colors">← Return to Home</a>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen stadium-bg text-snow">
      <div className="noise-overlay" />

      {/* Header */}
      <header className="relative z-10 border-b border-gold/10 bg-midnight-100/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-gradient-gold">GPL-3 Admin</h1>
            <p className="text-ash/60 text-sm mt-0.5">{registrations.length} registered players</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setIsAuthenticated(false); setPassword(''); setRegistrations([]); }}
              className="px-4 py-2 border border-fire/30 rounded-lg text-fire/80 hover:bg-fire/10 hover:text-fire transition-all text-sm font-medium"
            >
              Logout
            </button>
            <a href="/" className="px-4 py-2 border border-gold/30 rounded-lg text-gold/80 hover:bg-gold/10 hover:text-gold transition-all text-sm font-medium">
              Home
            </a>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-midnight-200/60 backdrop-blur-sm border border-gold/10 rounded-xl p-4">
            <p className="text-ash/60 text-xs uppercase tracking-wider font-semibold">Total</p>
            <p className="text-2xl font-display font-bold text-gold mt-1">{registrations.length}</p>
          </div>
          <div className="bg-midnight-200/60 backdrop-blur-sm border border-gold/10 rounded-xl p-4">
            <p className="text-ash/60 text-xs uppercase tracking-wider font-semibold">Batsman</p>
            <p className="text-2xl font-display font-bold text-emerald-400 mt-1">{registrations.filter(r => r.player_type === 'Batsman').length}</p>
          </div>
          <div className="bg-midnight-200/60 backdrop-blur-sm border border-gold/10 rounded-xl p-4">
            <p className="text-ash/60 text-xs uppercase tracking-wider font-semibold">Bowler</p>
            <p className="text-2xl font-display font-bold text-blue-400 mt-1">{registrations.filter(r => r.player_type === 'Bowler').length}</p>
          </div>
          <div className="bg-midnight-200/60 backdrop-blur-sm border border-gold/10 rounded-xl p-4">
            <p className="text-ash/60 text-xs uppercase tracking-wider font-semibold">All Rounder</p>
            <p className="text-2xl font-display font-bold text-purple-400 mt-1">{registrations.filter(r => r.player_type === 'All Rounder').length}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-midnight-200/40 backdrop-blur-sm border border-ash/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body">
              <thead className="bg-midnight-300/60 border-b border-ash/10">
                <tr>
                  <th className="px-5 py-4 text-[11px] font-semibold text-ash/60 uppercase tracking-wider">#</th>
                  <th className="px-5 py-4 text-[11px] font-semibold text-ash/60 uppercase tracking-wider">Player</th>
                  <th className="px-5 py-4 text-[11px] font-semibold text-ash/60 uppercase tracking-wider">Contact</th>
                  <th className="px-5 py-4 text-[11px] font-semibold text-ash/60 uppercase tracking-wider">Details</th>
                  <th className="px-5 py-4 text-[11px] font-semibold text-ash/60 uppercase tracking-wider">Payment</th>
                  <th className="px-5 py-4 text-[11px] font-semibold text-ash/60 uppercase tracking-wider">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ash/5">
                {registrations.map((reg, index) => (
                  <tr key={reg.id} className="hover:bg-gold/[0.03] transition-colors group">
                    <td className="px-5 py-4 text-ash/40 text-sm">{index + 1}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {reg.photo_path ? (
                          <img
                            src={reg.photo_path.startsWith('http') ? reg.photo_path : `${backendUrl}${reg.photo_path}`}
                            alt={reg.name}
                            className="w-11 h-11 rounded-full object-cover border-2 border-gold/20 group-hover:border-gold/50 transition-all cursor-pointer shadow-lg"
                            onClick={() => setSelectedImage(reg.photo_path.startsWith('http') ? reg.photo_path : `${backendUrl}${reg.photo_path}`)}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-11 h-11 rounded-full bg-gradient-to-br ${getInitialColor(reg.name)} items-center justify-center text-white text-sm font-bold shadow-lg shrink-0`}
                          style={{ display: reg.photo_path ? 'none' : 'flex' }}
                        >
                          {getInitials(reg.name)}
                        </div>
                        <div>
                          <p className="font-medium text-snow text-sm">{reg.name}</p>
                          <p className="text-[11px] text-ash/50 mt-0.5">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${
                              reg.player_type === 'Batsman' ? 'bg-emerald-500/15 text-emerald-400' :
                              reg.player_type === 'Bowler' ? 'bg-blue-500/15 text-blue-400' :
                              'bg-purple-500/15 text-purple-400'
                            }`}>{reg.player_type}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <p className="text-ash/80">{reg.email}</p>
                      <p className="text-ash/50 mt-0.5 text-xs">{reg.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-sm space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-ash/50 text-xs">2025:</span>
                        <span className={`text-xs font-medium ${reg.playing_2025 === 'Yes' ? 'text-emerald-400' : 'text-ash/60'}`}>{reg.playing_2025}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-ash/50 text-xs">Token:</span>
                        <span className={`text-xs font-semibold ${reg.mandal_token_2026 === 'Yes' ? 'text-emerald-400' : 'text-fire'}`}>{reg.mandal_token_2026 || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        reg.payment_method === 'Online' ? 'bg-blue-500/15 text-blue-400' : 'bg-amber-500/15 text-amber-400'
                      }`}>
                        {reg.payment_method === 'Online' ? '💳' : '💵'} {reg.payment_method}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-ash/50">
                      {new Date(reg.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      <br />
                      <span className="text-ash/30">{new Date(reg.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                    </td>
                  </tr>
                ))}
                {registrations.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center text-ash/40">
                      <svg className="w-12 h-12 mx-auto mb-3 text-ash/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      No registrations found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-lg w-full animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Player"
              className="w-full rounded-2xl shadow-2xl border border-gold/20"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-midnight-200 border border-gold/30 rounded-full flex items-center justify-center text-gold hover:bg-fire hover:text-snow hover:border-fire transition-all"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

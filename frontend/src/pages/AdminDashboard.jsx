import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/admin/registrations`, {
        headers: {
          'x-admin-password': password,
        },
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen stadium-bg flex items-center justify-center p-4">
        <div className="noise-overlay" />
        <div className="relative z-10 w-full max-w-md bg-midnight-200/90 backdrop-blur-md rounded-2xl border border-gold/20 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-3xl text-gradient-gold mb-2">Admin Access</h1>
            <p className="text-ash/70 font-body">Enter the secret password to view data.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-midnight-300/50 border border-ash/20 rounded-xl px-4 py-3 text-snow placeholder-ash/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-body font-medium"
                required
              />
            </div>
            
            {error && <p className="text-fire text-sm font-medium text-center">{error}</p>}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-fire to-fire-light hover:from-fire-light hover:to-fire text-snow font-display font-bold text-lg py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Login'}
            </button>
          </form>
          <div className="mt-6 text-center">
             <a href="/" className="text-gold/70 hover:text-gold text-sm underline transition-colors">Return to Home</a>
          </div>
        </div>
      </div>
    );
  }

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  return (
    <div className="min-h-screen bg-midnight-100 text-snow p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
           <div>
             <h1 className="font-display font-bold text-3xl text-gradient-gold">Registrations Dashboard</h1>
             <p className="text-ash mt-1">Total Users: {registrations.length}</p>
           </div>
           <a href="/" className="px-4 py-2 border border-gold/30 rounded-lg text-gold hover:bg-gold/10 transition-colors">Exit Admin</a>
        </div>

        <div className="bg-midnight-200/50 border border-ash/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body">
              <thead className="bg-midnight-300/50 border-b border-ash/10">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-ash/70 uppercase tracking-wider">Photo</th>
                  <th className="px-6 py-4 text-xs font-semibold text-ash/70 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-ash/70 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-semibold text-ash/70 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-ash/70 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ash/5">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-midnight-300/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {reg.photo_path ? (
                        <a href={`${backendUrl}${reg.photo_path}`} target="_blank" rel="noopener noreferrer">
                          <img src={`${backendUrl}${reg.photo_path}`} alt={reg.name} className="w-12 h-12 rounded-full object-cover border-2 border-gold/30 hover:border-gold transition-colors" />
                        </a>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-midnight-300 flex items-center justify-center text-ash/50 text-xs">No img</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-snow text-base">{reg.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="text-ash/90">{reg.email}</div>
                      <div className="text-ash/70 mt-1">{reg.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ash/80">
                      <div><span className="font-medium text-snow/80">Type:</span> {reg.player_type}</div>
                      <div><span className="font-medium text-snow/80">Played 2025:</span> {reg.playing_2025}</div>
                      <div><span className="font-medium text-snow/80">Mandal 2026:</span> <span className={reg.mandal_token_2026 === 'Yes' ? 'text-shield' : 'text-fire'}>{reg.mandal_token_2026}</span></div>
                      <div><span className="font-medium text-snow/80">Paid via:</span> {reg.payment_method}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ash/60">
                      {new Date(reg.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {registrations.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-ash/60">
                      No registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

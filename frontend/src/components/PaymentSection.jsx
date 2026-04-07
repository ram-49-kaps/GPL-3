const PaymentSection = ({ method, totalAmount }) => {
  if (!method) return null;

  const displayAmount = totalAmount ? `₹${totalAmount.toLocaleString('en-IN')}` : '₹500';

  if (method === 'Cash') {
    return (
      <div className="animate-slide-up">
        <div className="glass-card p-4 sm:p-5 border-emerald/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-cream font-display font-semibold text-sm sm:text-base">Cash Payment Selected</p>
              <p className="text-ash text-xs sm:text-sm mt-0.5">Pay <span className="text-gold font-accent text-base sm:text-lg">{displayAmount}</span> at the venue during registration</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (method === 'Online') {
    return (
      <div className="animate-slide-up">
        <div className="glass-card p-4 sm:p-6 text-center">
          {/* Amount Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-4">
            <span className="text-ash text-xs font-body">Amount:</span>
            <span className="text-gold font-accent text-xl sm:text-2xl">{displayAmount}</span>
          </div>

          {/* QR Code */}
          <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden bg-white p-3 shadow-gold-md">
            <img
              src="/assets/qr-code.png"
              alt="Payment QR Code"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div class="w-full h-full flex flex-col items-center justify-center bg-white rounded-xl">
                    <svg class="w-16 h-16 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75zM6.75 16.5h.75v.75h-.75zM16.5 6.75h.75v.75h-.75zM13.5 13.5h.75v.75h-.75zM13.5 19.5h.75v.75h-.75zM19.5 13.5h.75v.75h-.75zM19.5 19.5h.75v.75h-.75zM16.5 16.5h.75v.75H16.5z" />
                    </svg>
                    <p class="text-gray-500 text-xs">QR Code</p>
                  </div>`;
              }}
            />
          </div>

          {/* UPI Info */}
          <div className="mt-4 space-y-1.5">
            <p className="text-cream font-display font-semibold text-sm sm:text-base">Scan & Pay with any UPI App</p>
            <p className="text-ash text-xs font-body">UPI ID: <span className="text-gold/80 select-all">ramkapadia49@okhdfcbank</span></p>
            <p className="text-ash text-xs font-body">Name: <span className="text-cream/80">Ram Kapadia</span></p>
          </div>

          {/* Security Note */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-emerald/70 text-[10px] sm:text-xs">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Secure UPI Payment</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentSection;

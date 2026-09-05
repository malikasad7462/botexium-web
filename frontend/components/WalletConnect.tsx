'use client';

import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';
import { Wallet, LogOut, CheckCircle } from 'lucide-react';

export default function WalletConnect() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-400/20 bg-cyan-400/5">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm text-white font-medium">
            {formatAddress(address)}
          </span>
        </div>
        <button
          onClick={() => disconnect()}
          className="p-2 rounded-xl border border-red-400/20 text-red-400 hover:bg-red-400/10 transition"
        >
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => open()}
      className="flex items-center gap-2 premium-btn"
    >
      <Wallet size={18} />
      <span>Connect Wallet</span>
    </button>
  );
}
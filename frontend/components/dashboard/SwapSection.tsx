"use client";

import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits, erc20Abi } from "viem";
import { Coins, Wallet, Info, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { GlassCard } from "./GlassCard";

// ============================================================
// TOKEN CONFIG
// ============================================================
const TOKEN_CONTRACT = "0xa194f97a4d9f102441e93ab74d08fedf1b3ae556";
const USDT_CONTRACT = "0x55d398326f99059fF775485246999027B3197955"; // BSC USDT
const TOKEN_SYMBOL = "BOXM";
const TOKEN_NAME = "BOTEXIUM";
const TOKEN_DECIMALS = 18;
const TOKEN_PRICE_USDT = 0.01; // 1 BOXM = 0.01 USDT
const COMPANY_WALLET = "0x96E959221901623eE6a286E6333e96C66dB69cB4"; // ✅ COMPANY WALLET ADDRESS DAALO

import { API_URL } from "@/lib/api";

// ============================================================
// ABI (Buy Function)
// ============================================================
const TOKEN_ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "usdtAmount", "type": "uint256" }
    ],
    "name": "buyTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// ============================================================
// COMPONENT
// ============================================================
export default function SwapSection() {
  const { address, isConnected } = useAccount();

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [isApproving, setIsApproving] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  // ============================================================
  // READ CONTRACT: User Token Balance
  // ============================================================
  const { data: tokenBalance, refetch: refetchTokenBalance } = useReadContract({
    address: TOKEN_CONTRACT,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (tokenBalance !== undefined) {
      const formatted = Number(formatUnits(tokenBalance as bigint, TOKEN_DECIMALS));
      setUserBalance(formatted);
    }
  }, [tokenBalance]);

  // ============================================================
  // READ CONTRACT: User USDT Balance
  // ============================================================
  const { data: usdtBal, refetch: refetchUsdtBalance } = useReadContract({
    address: USDT_CONTRACT,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (usdtBal !== undefined) {
      setUsdtBalance(Number(formatUnits(usdtBal as bigint, 18)));
    }
  }, [usdtBal]);

  // ============================================================
  // WRITE: Approve USDT
  // ============================================================
  const { writeContract: approveUSDT, data: approveHash } = useWriteContract();
  const { isLoading: isApproveLoading, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  // ============================================================
  // WRITE: Buy Tokens
  // ============================================================
  const { writeContract: buyTokens, data: buyHash, error: buyError } = useWriteContract();
  const { isLoading: isBuyLoading, isSuccess: isBuySuccess } = useWaitForTransactionReceipt({
    hash: buyHash,
  });

  // ============================================================
  // EFFECTS: Handle Buy Success
  // ============================================================
  useEffect(() => {
    if (isBuySuccess) {
      setMessage(`✅ Successfully purchased ${botexiumAmount} ${TOKEN_SYMBOL} tokens!`);
      setAmount("");
      refetchTokenBalance();
      refetchUsdtBalance();
      setIsBuying(false);
    }
  }, [isBuySuccess]);

  useEffect(() => {
    if (buyError) {
      setError(buyError.message || "Transaction failed.");
      setIsBuying(false);
    }
  }, [buyError]);

  // ============================================================
  // HELPERS
  // ============================================================
  const usdtAmount = parseFloat(amount) || 0;
  const botexiumAmount = usdtAmount > 0 ? (usdtAmount / TOKEN_PRICE_USDT).toFixed(2) : "0.00";
  const usdtWei = parseUnits(amount || "0", 18);
  const tokenWei = parseUnits(botexiumAmount, TOKEN_DECIMALS);

  const handleBuy = async () => {
    if (!isConnected) {
      setError("Please connect your wallet first.");
      return;
    }

    if (!amount || usdtAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (usdtAmount > usdtBalance) {
      setError("Insufficient USDT balance.");
      return;
    }

    setError("");
    setMessage("");
    setIsBuying(true);

    try {
      // Step 1: Approve USDT
      setIsApproving(true);
      approveUSDT({
        address: USDT_CONTRACT,
        abi: erc20Abi,
        functionName: "approve",
        args: [TOKEN_CONTRACT, usdtWei],
      });
    } catch (err: any) {
      setError(err.message || "Approval failed.");
      setIsBuying(false);
      setIsApproving(false);
    }
  };

  // When approve is successful, call buyTokens
  useEffect(() => {
    if (isApproveSuccess && isBuying) {
      setIsApproving(false);
      buyTokens({
        address: TOKEN_CONTRACT,
        abi: TOKEN_ABI,
        functionName: "buyTokens",
        args: [usdtWei],
      });
    }
  }, [isApproveSuccess, isBuying]);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <section className="space-y-6">
      <div>
        <div className="text-xs font-semibold tracking-[0.16em] text-gray-500 uppercase">
          BOTEXIUM TOKEN PURCHASE
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Buy {TOKEN_SYMBOL} Tokens
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
          Purchase {TOKEN_NAME} tokens using USDT (BSC BEP-20).
        </p>
      </div>

      <GlassCard className="p-6 max-w-lg">
        {/* Wallet Status */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {isConnected ? `✅ Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}` : "⚠️ Wallet not connected"}
          </span>
          <span className="text-xs text-gray-500">BSC Network</span>
        </div>

        {/* Contract Address */}
        <div className="mb-4 p-2 rounded-lg bg-[#050816]/50 border border-cyan-500/5">
          <p className="text-[10px] text-gray-500">Contract Address</p>
          <p className="text-xs text-cyan-400 font-mono truncate">{TOKEN_CONTRACT}</p>
        </div>

        {/* You Pay - USDT */}
        <div className="bg-[#050816]/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">You Pay</span>
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
              <Wallet size={14} />
              <span>Balance: {usdtBalance.toFixed(2)} USDT</span>
            </button>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-semibold text-white outline-none placeholder:text-gray-600"
              min="0"
              step="0.01"
            />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04]">
              <span className="text-white font-medium">USDT</span>
              <span className="text-[10px] text-gray-500">(BSC)</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center -my-2">
          <div className="p-2 rounded-full bg-[#081021] border border-cyan-400/10">
            <ArrowRight size={18} className="text-cyan-400" />
          </div>
        </div>

        {/* You Receive - BOXM */}
        <div className="bg-[#050816]/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">You Receive</span>
            <span className="text-sm text-cyan-400 font-semibold">
              1 {TOKEN_SYMBOL} = {TOKEN_PRICE_USDT} USDT
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <input
              type="text"
              value={botexiumAmount}
              readOnly
              className="flex-1 bg-transparent text-2xl font-semibold text-white outline-none cursor-default"
            />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04]">
              <Coins size={16} className="text-cyan-400" />
              <span className="text-cyan-400 font-medium">{TOKEN_SYMBOL}</span>
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <span>Your {TOKEN_SYMBOL} Balance: {userBalance.toFixed(2)}</span>
          <span className="text-cyan-400">Auto-updated</span>
        </div>

        {/* Info */}
        <div className="mt-4 p-3 rounded-xl bg-cyan-400/5 border border-cyan-400/10">
          <div className="flex items-start gap-2">
            <Info size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-400">
              Tokens purchased will be locked for <span className="text-cyan-400 font-semibold">3 months</span> before they can be transferred or sold.
            </p>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="flex items-center gap-2 rounded-xl border border-green-400/20 bg-green-400/[0.06] px-4 py-3 text-sm text-green-300">
            <CheckCircle size={16} />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Buy Button */}
        <button
          onClick={handleBuy}
          disabled={!isConnected || isBuying || isApproving || !amount || usdtAmount <= 0}
          className="w-full premium-btn mt-4 py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isApproving ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Approving USDT...
            </>
          ) : isBuying ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Buying {TOKEN_SYMBOL}...
            </>
          ) : (
            `Buy ${TOKEN_SYMBOL} Tokens`
          )}
        </button>

        {/* Token Info */}
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>💎 Token: {TOKEN_SYMBOL}</span>
          <span>🔒 Lock: 3 months</span>
          <span>📈 Price: {TOKEN_PRICE_USDT} USDT</span>
        </div>
      </GlassCard>

      {/* About */}
      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold text-white mb-2">About {TOKEN_NAME}</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>Ecosystem token for AI trading bots and Web3 platform</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>Staking rewards available after lock period</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>Access to exclusive trading bot features</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>Contract: <span className="text-cyan-400 font-mono text-xs">{TOKEN_CONTRACT.slice(0, 6)}...{TOKEN_CONTRACT.slice(-4)}</span></span>
          </li>
        </ul>
      </GlassCard>
    </section>
  );
}
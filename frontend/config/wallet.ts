import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, polygon, arbitrum, optimism, bsc } from '@reown/appkit/networks';
import type { AppKitNetwork } from '@reown/appkit/networks';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [bsc, mainnet, polygon, arbitrum, optimism];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});

export const config = wagmiAdapter.wagmiConfig;

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#22d3ee',
  },
});
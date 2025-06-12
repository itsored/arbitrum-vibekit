import Compound from '@compound-finance/compound-js';
import { providers, Wallet } from 'ethers';
import * as dotenv from 'dotenv';
dotenv.config();

export const RPC_URL       = process.env.RPC_URL!;
export const PRIVATE_KEY   = process.env.PRIVATE_KEY!;
export const COMET_ADDRESS = process.env.COMET_ADDRESS!;   // local-fork USDC Comet
export const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS!;   // local USDC

// Patch the provider so it *reports* the Arbitrum network (42161) even if the
// underlying Hardhat fork is using a local chain-id. This avoids Compound.js
// throwing `Util.getNetNameWithChainId invalid chainId` at runtime.
class ArbitrumForkProvider extends providers.JsonRpcProvider {
  override async getNetwork(): Promise<providers.Network> {
    return { chainId: 42161, name: 'arbitrum' } as providers.Network;
  }

  // Compound.js falls back to `net_version` RPC call to detect the chain if
  // it cannot rely on `getNetwork()`. We spoof that here as well so any call
  // to `provider.send('net_version')` returns the Arbitrum chain-id.
  override async send(method: string, params: Array<unknown>): Promise<unknown> {
    if (method === 'net_version') {
      return '42161';
    }
    return super.send(method as any, params as any);
  }
}

export const provider = new ArbitrumForkProvider(RPC_URL);

// Wallet (server-side)
export const wallet   = new Wallet(PRIVATE_KEY, provider);

// Root Compound.js object  (cast to any, then pass RPC_URL)
export const compound = new (Compound as any)(wallet);

// Instantiate the canonical Arbitrum USDC Comet instance (address is hard-coded
// inside the Compound.js constants and must match your fork). This avoids the
// nonexistent `.custom()` helper.
export const comet = (compound.comet as any).ARBITRUM_USDC();
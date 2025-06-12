LAST ISSUE IS ABUT FINDING TOKEN ADDRESS


pnpm exec hardhat node
TOKEN=WBTC AMOUNT=0.9 pnpm exec hardhat run scripts/fund.js --network localhost
pnpm dev
pnpm -F @arbitrum-vibekit/compound-v3-mcp inspect:npx
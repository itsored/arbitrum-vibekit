import { spawn } from 'child_process';

const userAddress = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'; // Pass as argument or replace

const payload = {
  method: "tools/call",
  params: {
    name: "supply",
    arguments: {
      asset: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // USDC
      amount: "1000000", // 1 USDC (6 decimals)
      user: userAddress
    },
    _meta: { progressToken: 1 }
  }
};

const child = spawn('node', ['dist/index.js']);

child.stdin.write(JSON.stringify(payload) + '\n');
child.stdin.end();

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
}); 
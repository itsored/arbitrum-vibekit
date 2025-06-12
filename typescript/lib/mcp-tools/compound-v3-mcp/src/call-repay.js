const { spawn } = require('child_process');

const payload = {
  method: "tools/call",
  params: {
    name: "repay",
    arguments: {
      asset: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // USDC
      amount: "1000000", // 1 USDC (6 decimals)
      user: "0xYourTestAccountAddress" // <-- Replace with your test account address
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
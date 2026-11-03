const assert = require('node:assert/strict');
async function check() {
  const response = await fetch('http://localhost:3000/api/blog', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Large body', content: 'x'.repeat(40000) })
  });
  const result = await response.json();
  assert.equal(response.status, 413);
  assert.equal(typeof result.error.message, 'string');
  console.log('PASS: JSON body limit and central error format');
}
check().catch(error => { console.error(error.message); process.exitCode = 1; });

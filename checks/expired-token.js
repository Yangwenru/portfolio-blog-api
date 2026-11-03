require('../config/env');
const jwt = require('jsonwebtoken');
const assert = require('node:assert/strict');
async function check() {
  const token = jwt.sign({}, process.env.JWT_SECRET, {
    subject: '000000000000000000000000', algorithm: 'HS256', expiresIn: -1,
    issuer: 'portfolio-blog-api', audience: 'portfolio-client'
  });
  const response = await fetch('http://localhost:3000/api/users/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  assert.equal(response.status, 401);
  console.log('PASS: expired tokens are rejected');
}
check().catch(error => { console.error(error.message); process.exitCode = 1; });

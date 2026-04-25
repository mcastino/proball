module.exports = async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing code');
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();

  if (!data.access_token) {
    return res.status(400).send(data.error_description || 'Authentication failed');
  }

  const token = JSON.stringify(data.access_token);

  res.setHeader('Content-Type', 'text/html');
  res.send(`<!doctype html><html><body><script>
    (function () {
      var token = ${token};
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:success:' + JSON.stringify({ token: token, provider: 'github' }),
          e.origin
        );
      }
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  <\/script></body></html>`);
};

module.exports = function handler(req, res) {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: `https://${req.headers.host}/api/callback`,
    scope: 'repo',
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
};

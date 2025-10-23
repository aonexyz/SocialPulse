const fetch = require('node-fetch');

async function postToLinkedIn(content){
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const org = process.env.LINKEDIN_ORGANIZATION_ID; // or person urn
  const endpoint = 'https://api.linkedin.com/v2/ugcPosts';
  const body = {
    "author": org,
    "lifecycleState": "PUBLISHED",
    "specificContent": {
      "com.linkedin.ugc.ShareContent": {
        "shareCommentary": { "text": content },
        "shareMediaCategory": "NONE"
      }
    },
    "visibility": { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
  };
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0'
    },
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(`LinkedIn post failed: ${res.status}`);
  return res.json();
}

module.exports = { postToLinkedIn };

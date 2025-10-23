function truncate(text, limit){
  if(!limit) return text;
  if(text.length <= limit) return text;
  return text.slice(0, limit - 1) + '…';
}

function addHashtags(text, hashtags){
  if(!hashtags) return text;
  return `${text}\n\n${hashtags}`;
}

function formatContent(rawText, meta = {}){
  const hashtags = meta.hashtags || process.env.DEFAULT_HASHTAGS || '';
  let t = rawText.trim();
  if(meta.platform === 'x') t = truncate(t, 280 - (hashtags.length + 2));
  if(hashtags) t = addHashtags(t, hashtags);
  return t;
}

module.exports = { formatContent, truncate, addHashtags };

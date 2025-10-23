// Minimal worker: listens for jobs (via Redis queue) and processes posting tasks
require('dotenv').config();
const fetch = require('node-fetch');
const Redis = require('ioredis');
const { postToX } = require('./platforms/x');
const { postToLinkedIn } = require('./platforms/linkedin');
const { postToTelegram } = require('./platforms/telegram');
const { formatContent } = require('./utils/formatters');

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const QUEUE_KEY = 'socialpulse:queue';

async function callGemini(prompt, opts = {}){
  const endpoint = process.env.GOOGLE_GEMINI_ENDPOINT;
  if(!endpoint) throw new Error('GOOGLE_GEMINI_ENDPOINT not set');
  const body = {
    model: process.env.GEMINI_MODEL || 'gemini-1.5',
    prompt,
    max_tokens: opts.max_tokens || 256
  };
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GOOGLE_GEMINI_API_KEY}`
    },
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(`Gemini error ${res.status}`);
  const json = await res.json();
  return json.output_text || (json.choices && json.choices[0] && json.choices[0].text) || JSON.stringify(json);
}

async function handleJob(job){
  try{
    const { prompt, platforms, meta } = job;
    const raw = await callGemini(prompt);
    const post = formatContent(raw, meta);
    const results = {};
    if(platforms.includes('x')) results.x = await postToX(post);
    if(platforms.includes('linkedin')) results.linkedin = await postToLinkedIn(post);
    if(platforms.includes('telegram')) results.telegram = await postToTelegram(post);
    console.log('Posted', results);
  }catch(err){
    console.error('Job failed', err);
  }
}

async function run(){
  console.log('Worker started, waiting for jobs...');
  while(true){
    const data = await redis.blpop(QUEUE_KEY, 0); // blocking pop
    const rawJob = data[1];
    let job;
    try{ job = JSON.parse(rawJob); } catch(e){ console.error('Invalid job', e); continue; }
    await handleJob(job);
  }
}

run().catch(e=>{console.error(e); process.exit(1)});

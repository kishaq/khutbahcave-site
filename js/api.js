// ─────────────────────────────────────────────────────
//  KhutbahCave — Supabase API helpers
//  !! Replace these two values with your real credentials
//  Supabase Dashboard → Project Settings → API
// ─────────────────────────────────────────────────────
const SUPABASE_URL      = 'https://wrdrqtreaorjohfsbvda.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZHJxdHJlYW9yam9oZnNidmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MDg3MDAsImV4cCI6MjA5MDI4NDcwMH0.ofRiBkceQLfz49wNwl0WSDpbImv5tocmhPZnacw04JU';

const H = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

async function q(table, params = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, { headers: H });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  return res.json();
}

export const getKhutbahs = ({ limit = 20, offset = 0 } = {}) =>
  q('khutbahs', `select=id,title,slug,author&status=eq.PUBLISHED&order=title.asc&limit=${limit}&offset=${offset}`);

export const getAllKhutbahs = () =>
  q('khutbahs', `select=id,title,slug,author&status=eq.PUBLISHED&order=title.asc`);

export const getKhutbahBySlug = async (slug) => {
  const rows = await q('khutbahs', `select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`);
  return rows[0] || null;
};

export const searchKhutbahs = (term) => {
  const t = encodeURIComponent(term);
  return q('khutbahs', `select=id,title,slug,author&or=(title.ilike.*${t}*,english_part1.ilike.*${t}*,author.ilike.*${t}*)&status=eq.PUBLISHED&order=title.asc`);
};

export const getKhutbahCount = async () => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/khutbahs?select=id&status=eq.PUBLISHED`, {
    headers: { ...H, 'Prefer': 'count=exact', 'Range': '0-0' }
  });
  return parseInt(res.headers.get('Content-Range')?.split('/')[1] || '0', 10);
};

export const getAuthors = async () => {
  const rows = await getAllKhutbahs();
  return [...new Set(rows.map(r => r.author).filter(Boolean))].sort();
};

export const getCategories = () => q('categories', 'select=*&order=title.asc');
export const getDuas        = () => q('duas',       'select=*&order=id.asc');
export const getResources   = () => q('resources',  'select=*&order=id.asc');

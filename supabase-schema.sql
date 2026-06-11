-- Esegui questo SQL nell'editor di Supabase (SQL Editor → New query)

create table if not exists feedback (
  id          uuid        default gen_random_uuid() primary key,
  created_at  timestamptz default now(),
  session_id  text,
  kind        text        not null,   -- 'message' | 'tip' | 'incipit'
  rating      text        not null,   -- 'up' | 'down'
  note        text        default '',
  event_type  text,                   -- solo per kind='message'
  variant     int,
  text        text,
  voice       text,
  frame_number int,
  throw_in_frame int,
  pins        int,
  context     jsonb                   -- GameContext completo
);

-- Permetti insert pubblici (anon key) senza autenticazione
alter table feedback enable row level security;

create policy "Allow public insert"
  on feedback for insert
  to anon
  with check (true);

create policy "Allow public select"
  on feedback for select
  to anon
  using (true);

-- Esegui questo SQL nell'editor di Supabase (SQL Editor → New query)

-- ── Versioni della pipeline ───────────────────────────────
create table if not exists pipeline_versions (
  id              uuid        default gen_random_uuid() primary key,
  created_at      timestamptz default now(),
  version_number  serial,
  notes           text        default '',
  messages_snapshot jsonb     -- snapshot completo di tutti i messaggi al momento della versione
);

alter table pipeline_versions enable row level security;

create policy "Allow public insert" on pipeline_versions for insert to anon with check (true);
create policy "Allow public select" on pipeline_versions for select to anon using (true);

-- ── Feedback utenti ───────────────────────────────────────
create table if not exists feedback (
  id                uuid        default gen_random_uuid() primary key,
  created_at        timestamptz default now(),
  session_id        text,
  pipeline_version_id uuid      references pipeline_versions(id),
  kind              text        not null,   -- 'message' | 'tip' | 'incipit'
  rating            text        not null,   -- 'up' | 'down'
  note              text        default '',
  -- campi specifici per kind='message'
  event_type        text,
  variant           int,
  text              text,
  voice             text,
  frame_number      int,
  throw_in_frame    int,
  pins              int,
  context           jsonb       -- GameContext completo
);

alter table feedback enable row level security;

create policy "Allow public insert" on feedback for insert to anon with check (true);
create policy "Allow public select" on feedback for select to anon using (true);

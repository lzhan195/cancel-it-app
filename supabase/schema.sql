-- Cancel-It schema — service-role writes only (no public RLS policies)

create table if not exists subscriptions (
  id   text primary key,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists reminders (
  id              uuid primary key default gen_random_uuid(),
  subscription_id text not null references subscriptions(id),
  remind_on       date not null,
  created_at      timestamptz not null default now()
);

alter table subscriptions enable row level security;
alter table reminders enable row level security;

-- No public policies — all writes go through the service-role key.

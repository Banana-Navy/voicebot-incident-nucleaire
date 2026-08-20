create type public.instruction_status as enum ('draft','in_review','approved','expired','withdrawn');

create table public.official_instructions (
  id uuid primary key default gen_random_uuid(),
  status public.instruction_status not null default 'draft',
  incident_key text,
  geographic_scope jsonb not null default '[]'::jsonb,
  valid_from timestamptz not null,
  valid_until timestamptz not null,
  instruction_fr text not null,
  instruction_nl text not null,
  instruction_de text not null,
  source_authority text not null,
  source_url text not null check (source_url ~ '^https://'),
  source_published_at timestamptz,
  reviewed_by uuid references auth.users(id),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  check (valid_until > valid_from),
  check ((status <> 'approved') or (reviewed_by is not null and approved_at is not null))
);

alter table public.official_instructions enable row level security;
revoke all on public.official_instructions from anon, authenticated;

create table public.instruction_audit (
  id bigint generated always as identity primary key,
  instruction_id uuid not null references public.official_instructions(id),
  actor_id uuid references auth.users(id),
  action text not null,
  created_at timestamptz not null default now(),
  details jsonb not null default '{}'::jsonb
);

alter table public.instruction_audit enable row level security;
revoke all on public.instruction_audit from anon, authenticated;

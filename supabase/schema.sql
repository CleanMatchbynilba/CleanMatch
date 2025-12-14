create table if not exists profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'homeowner' check (role in ('homeowner','cleaner','agency')),
  full_name text,
  city text,
  areas text[],
  hourly_rate numeric,
  bio text,
  created_at timestamptz not null default now()
);

create table if not exists bookings (
  id bigserial primary key,
  requester_id uuid not null references auth.users(id) on delete cascade,
  provider_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  time time not null,
  notes text,
  status text not null default 'requested' check (status in ('requested','accepted','declined','completed','canceled')),
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id bigserial primary key,
  sender_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists ratings (
  id bigserial primary key,
  from_user_id uuid not null references auth.users(id) on delete cascade,
  to_user_id uuid not null references auth.users(id) on delete cascade,
  stars int not null check (stars between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

-- RLS
alter table profiles enable row level security;
alter table bookings enable row level security;
alter table messages enable row level security;
alter table ratings enable row level security;

-- profiles: user can read all (marketplace), but only update own
create policy "profiles_read_all" on profiles for select using (true);
create policy "profiles_upsert_own" on profiles for insert with check (auth.uid() = user_id);
create policy "profiles_update_own" on profiles for update using (auth.uid() = user_id);

-- bookings: participants can read; requester can create; participants can update status
create policy "bookings_read_participants" on bookings
for select using (auth.uid() = requester_id or auth.uid() = provider_id);

create policy "bookings_insert_requester" on bookings
for insert with check (auth.uid() = requester_id);

create policy "bookings_update_participants" on bookings
for update using (auth.uid() = requester_id or auth.uid() = provider_id);

-- messages: participants can read; sender can insert
create policy "messages_read_participants" on messages
for select using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "messages_insert_sender" on messages
for insert with check (auth.uid() = sender_id);

-- ratings: everyone can read; only logged-in can create; cannot update later
create policy "ratings_read_all" on ratings for select using (true);
create policy "ratings_insert_loggedin" on ratings for insert with check (auth.uid() = from_user_id);

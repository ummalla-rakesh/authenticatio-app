
-- Enable pg_trgm extension for trigram search
create extension if not exists pg_trgm;

-- ============================
-- 0. Helper Function: Auto update updated_at
-- ============================
create or replace function trigger_set_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;



-- ============================
-- 1. Courses Table
-- ============================
create table public.courses (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text,
    price numeric(10,2) default 0 not null,
    duration text,
    image_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create trigger set_courses_updated_at
before update on public.courses
for each row execute procedure trigger_set_timestamp();



-- ============================
-- 2. Tags Table
-- ============================
create table public.tags (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    created_at timestamptz not null default now()
);

create index tags_name_trgm_idx 
on public.tags using gin (name gin_trgm_ops);



-- ============================
-- 3. Course Tags (Join Table)
-- ============================
create table public.course_tags (
    id uuid primary key default gen_random_uuid(),
    course_id uuid not null references public.courses(id) on delete cascade,
    tag_id uuid not null references public.tags(id) on delete cascade,
    created_at timestamptz not null default now(),

    constraint unique_course_tag unique (course_id, tag_id)
);

create index idx_course_tags_course_id on public.course_tags (course_id);
create index idx_course_tags_tag_id on public.course_tags (tag_id);

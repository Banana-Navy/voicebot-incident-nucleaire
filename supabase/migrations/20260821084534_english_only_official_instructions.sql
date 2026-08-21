-- Safety content is never machine-translated during a schema migration.
-- If reviewed records exist, a qualified reviewer must supply approved English
-- content before this migration can proceed.
do $$
begin
  if exists (select 1 from public.official_instructions) then
    raise exception using
      message = 'English-only migration stopped: reviewed instruction_en content is required for existing rows',
      hint = 'Export the records, obtain human-approved English instructions, and load them through a reviewed data migration.';
  end if;
end $$;

alter table public.official_instructions
  add column instruction_en text not null,
  drop column instruction_fr,
  drop column instruction_nl,
  drop column instruction_de;

comment on column public.official_instructions.instruction_en is
  'Human-approved English operational instruction. Automatic translation is prohibited.';

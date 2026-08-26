create extension if not exists "pgcrypto";

create table if not exists cadastros (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'nova'
    check (status in ('nova', 'em_captacao', 'em_edicao', 'entregue')),

  confronto text not null,
  data_jogo date not null,
  horario time not null,
  local text not null,

  atleta_nome text not null,
  time_atleta text not null,
  sub text not null,
  numero text not null,
  posicao text not null,
  musica text,
  instagram text not null,

  responsavel_nome text not null
);

create index if not exists cadastros_status_idx on cadastros (status);
create index if not exists cadastros_atleta_nome_idx on cadastros (atleta_nome);

-- RLS ligado: toda a leitura/escrita passa pela service role key no servidor
-- (Server Actions / Server Components), nunca pelo client. Nenhuma policy
-- pública é criada, então o anon key não consegue ler nem escrever a tabela.
alter table cadastros enable row level security;

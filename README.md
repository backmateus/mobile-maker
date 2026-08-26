# Mobile Maker — Cadastro de Atletas

Site que substitui o formulário de cadastro do WhatsApp: o responsável preenche o
cadastro do atleta, o site salva os dados e abre o WhatsApp com a mensagem já
formatada para o Felipe enviar.

## Stack

Next.js (App Router) + Supabase (Postgres) + Resend (e-mail) + Vercel (deploy).

## Configuração local

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um projeto no [Supabase](https://supabase.com) e rode a migration em
   `supabase/migrations/0001_init.sql` (SQL Editor do painel, ou via CLI do
   Supabase).

3. Copie `.env.local.example` para `.env.local` e preencha:
   - `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`: em Project Settings > API do
     Supabase. **Use a service role key** (a tabela fica com RLS ligado e sem
     policy pública — só o servidor acessa).
   - `RESEND_API_KEY`, `FELIPE_EMAIL`, `RESEND_FROM_EMAIL`: crie uma conta em
     [resend.com](https://resend.com), gere uma API key. Para testar sem
     domínio verificado, use `onboarding@resend.dev` como remetente.
   - `ADMIN_PASSWORD`: senha de acesso ao painel `/admin`.
   - `ADMIN_SESSION_SECRET`: uma string aleatória longa (ex.: gere com
     `openssl rand -hex 32`).
   - `NEXT_PUBLIC_SITE_URL`: URL pública do site (usada no link do e-mail de
     aviso).

4. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   - Formulário público: `http://localhost:3000`
   - Painel admin: `http://localhost:3000/admin`

## Deploy (Vercel)

1. Suba o projeto num repositório git e importe na Vercel.
2. Configure as mesmas variáveis de ambiente do `.env.local` nas
   configurações do projeto na Vercel (atualize `NEXT_PUBLIC_SITE_URL` para a
   URL de produção).
3. Deploy.

## Número do WhatsApp do Felipe

Está fixo em `lib/whatsapp.ts` (`FELIPE_WHATSAPP`). Para trocar, edite essa
constante.

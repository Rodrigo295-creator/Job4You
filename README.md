# Job4You

Plataforma para conectar clientes e profissionais autônomos (React, Vite, Tailwind, Supabase).

## Desenvolvimento local

```bash
npm install
cp .env.example .env   # preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
npm run dev
```

App em http://localhost:5173

## Build

```bash
npm run build
```

## Deploy (Vercel)

O projeto está configurado com `vercel.json`. Deploy manual:

```bash
npx vercel deploy --prod --yes
```

Produção: https://job4you-rho.vercel.app

Configure em **Vercel → Project → Environment Variables** as mesmas variáveis do `.env.example`.

## Repositório

https://github.com/Rodrigo295-creator/Job4You

```bash
git clone https://github.com/Rodrigo295-creator/Job4You.git
cd Job4You
npm install
```

Para enviar alterações (com [GitHub CLI](https://cli.github.com/) instalado):

```bash
./scripts/git-push.sh
```

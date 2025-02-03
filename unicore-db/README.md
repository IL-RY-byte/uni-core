Run `pnpm i` from project root.

Create `.env` with following var:
```
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_DATABASE_ID=
CLOUDFLARE_D1_TOKEN=
```

To change the schema use `src/schema.ts`.

To apply existing migrations run `npx drizzle-kit migrate`.
To generate migrations run `npx drizzle-kit generate`.

Firstly run `pnpm i` from the project root.

Create `.env` or `.dev.vars` with following vars:
```
ACCESS_TOKEN_SECRET=
```

`ACCESS_TOKEN_SECRET` is used to sign JWT tokens. It could be any string.

To run locally use `pnpm --filter unicore-auth dev --remote --env dev` (it will use .dev.vars and it will use remote DB specified in `preview_database_id` from `wrangler.toml`).

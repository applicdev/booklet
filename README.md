# Markdown Reader

A minmal interpreter for converting Markdown repositories into Documents structured JSON data.

<!--
## Disclaimer

[...]
-->

## Install and use

To work locally, run the following command after installing Deno to stream a preview over localhost –

```
deno run -A --unstable https://github.com/milotheirself/reader/raw/main/lib/reader-stream.ts
```

[deon-install]: https://deno.land/manual/getting_started/installation

---

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        deno-version: [1.3.0]

    steps:
      - name: Git Checkout Deno Module
        uses: actions/checkout@v2

      - name: Use Deno Version ${{ matrix.deno-version }}
        uses: denolib/setup-deno@v2
        with:
          deno-version: ${{ matrix.deno-version }}

      - name: Build
        run: deno run -A --unstable https://github.com/milotheirself/reader/raw/main/lib/reader-stream.ts

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.ACTIONS_ACCESS_TOKEN }}
          publish_dir: ./.github-reader/public
          enable_jekyll: false
```

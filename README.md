# Booklet

[![Page preview of Booklet's "Overview" section][banner:preview]][banner:landing]

[banner:preview]: https://applic.dev/booklet/output/booklet-overview.png
[banner:landing]: https://applic.dev/booklet/overview

## Getting Started

A complete documentation will be available at a later time. For now, the experimental interface consists of:

<!--
See our [documentation](https://applic.dev/booklet/overview) for complete guide –
-->

```plain
Usage: booklet [options]

Options:
  -v, --version       output version number
  -h, --help          output usage information
  -s, --stream        start a local server for bundled assets
  -b, --bundle        write bundled assets to the repository workflows
  -f                  force file writes
```

### Download and install

Install the [latest version of Deno][deno:install-latest], then run the following two commands to install this tool and, if required, [Puppeteer][puppeteer:install-latest]:

```sh
deno install -A --unstable --name booklet https://deno.land/x/booklet/lib/index.ts
```

```sh
$Env:PUPPETEER_PRODUCT="chrome"; deno run -A --unstable https://deno.land/x/puppeteer@9.0.2/install.ts
```

To update a previously installed version run:

```sh
deno install -A --unstable --reload -f --name booklet https://deno.land/x/booklet/lib/index.ts
```

[deno:install-latest]: https://github.com/denoland/deno_install#install-latest-version
[puppeteer:install-latest]: https://github.com/lucacasonato/deno-puppeteer#installation

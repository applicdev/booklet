[![Page preview of the "Getting Started" section][reader:preview]][reader:landing]

[reader:preview]: https://applic.dev/reader/~/preview/reader-manual-getting-started.png
[reader:landing]: https://applic.dev/reader/manual/getting-started

<!--
> **Disclaimer** –
> This tool was written primarily for the purposes of our documentation pages. For this reason, and because it is still in the experimental stage, we would not recommend using it for other projects at this time. Interfaces, configurations, and file structures may change as we work on them without a major version bump.

<br>
-->

## Getting Started

A complete documentation will be available at a later time. For now, the experimental interface consists of:

<!--
See our [documentation](https://applic.dev/reader/manual/getting-started) for complete guide –
-->

```plain
Usage: reader [options]

Options:
  -v, --version       output version number
  -h, --help          output usage information

  -s, --stream        start a local server for bundled assets
  -b, --bundle        write bundled assets to the repository workflows
  -p                  use repository name as path namespace
  -f                  force file writes
```

### Download and install

Install the [latest version of Deno][deno:install-latest], then run the following two commands to install this tool and, if required, [Puppeteer][puppeteer:install-latest]:

```sh
deno install -A --unstable --name reader https://deno.land/x/reader/lib/index.ts
```

```sh
$Env:PUPPETEER_PRODUCT="firefox"; deno run -A --unstable https://deno.land/x/puppeteer/install.ts
```

To update a previously installed version run:

```sh
deno install -A --unstable --reload -f --name reader https://deno.land/x/reader/lib/index.ts
```

[deno:install-latest]: https://github.com/denoland/deno_install#install-latest-version
[puppeteer:install-latest]: https://deno.land/x/puppeteer@14.1.1#installation

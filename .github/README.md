# Booklet

[![Page preview of Booklet's "Overview" section][banner:preview]][banner:landing]

[banner:preview]: https://applic.dev/booklet/output/booklet.png
[banner:landing]: https://applic.dev/booklet

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
  -b, --bundle        write bundled assets to the repository docs
  -f                  force file writes
  -p                  force file writes
```

```yaml
booklet:
  uses: applicdev/booklet/.github/workflows/deploy.yaml@main
  secrets:
    booklet_token: ${{ secrets.booklet_token || secrets.GITHUB_TOKEN }}
    booklet_cname: ${{ secrets.booklet_cname }}
```

[booklet:template]: https://github.com/applicdev/booklet-starter-md
[booklet:deploy-workflow]: https://github.com/applicdev/booklet/blob/main/.github/workflows/deploy.yaml

### Download and install

Install the [latest version of Deno][deno:install-latest], then run the following command to install this tool and, if required, [Puppeteer][puppeteer:install-latest]:

```sh
deno run --allow-run https://github.com/applicdev/booklet/raw/main/packages/booklet/install.ts
```

To update a previously installed version run:

```sh
deno run --allow-run https://github.com/applicdev/booklet/raw/main/packages/booklet/install.ts --upgrade
```

[deno:install-latest]: https://github.com/denoland/deno_install#install-latest-version
[puppeteer:install-latest]: https://github.com/lucacasonato/deno-puppeteer#installation

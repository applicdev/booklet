# Markdown Reader

A minimal interpreter for converting Markdown repositories into readable documents and structured JSON data –

<!--
## Disclaimer

[...]
-->

## Install and use

To work locally, run the following command [after installing Deno][deon:install] to stream a preview over localhost –

```console
deno run --allow-read --allow-write --allow-net --unstable --reload https://raw.githubusercontent.com/milotheirself/reader/main/lib/reader-stream.ts
```

<details>
  <summary>command breakdown</summary>
  <dl>
    <dt><code>deno run</code></dt>
    <dd>runs a TypeScript module with Deno</dd>
    <dt><code>--allow-read --allow-write</code></dt>
    <dd>allows the module to read and write files</dd>
    <dt><code>--allow-net</code></dt>
    <dd>allows the module to start a web server and load external files</dd>
    <dt><code>--unstable</code></dt>
    <dd>specifies that the module is using some not production-ready features of Deno</dd>
    <dt><code>--reload</code></dt>
    <dd>specifies to not use a cached version of the the module</dd>
    <dt><code>https://.../lib/reader-stream.ts</code></dt>
    <dd>specifies the location of the module</dd>
  </dl>
</details>

[deon:install]: https://deno.land/manual/getting_started/installation

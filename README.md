# Markdown Reader

A lightweight bundler for transforming Markdown repositories into readable documents and structured JSON data –

<!--
## Disclaimer

[...]
-->

## Install and use

To work locally, get [Deno][deon:install], 1.20.5 or higher, and run the following install command –

```console
deno install --allow-read --allow-write --allow-net --unstable --reload -f -n markdown-reader https://raw.githubusercontent.com/milotheirself/reader/main/lib/reader.ts
```

Navigate to your project's directory and run the following command to stream a preview on localhost –

```console
markdown-reader --stream
```

[deon:install]: https://deno.land/manual/getting_started/installation

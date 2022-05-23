---
title: Outline - Markdown Reader
label: Reader

field:
  caption: A simple tool for transforming Markdown repositories into readable documents –
  keyword: Deno, Markdown, MD, JSON, HTML

locate:
  - { urn: ./outline/ }
  - { urn: ./, field: { role: landing, urn: ./outline } }
# - { urn: ./, field: { role: forward, urn: ./outline } }

module:
  # ? web-interface modules
  - { alias: reader-inline, urn: ./lib/module/reader-inline.ts, field: { role: inline } }
  - { alias: reader-loaded, urn: ./lib/module/reader.ts }

  # ? pwa-interface modules
  - { alias: access, urn: ./lib/module/common-access.ts, field: { role: worker } }
  - { alias: direct, urn: ./lib/module/common-direct.ts, field: { role: worker } }

figure:
  - { alias: 'common', urn: ./lib/pattern/assets/figure/document.png }
  - { alias: 'masked', urn: ./lib/pattern/assets/figure/document-masked.png }
  - { alias: 'window', urn: ./lib/pattern/assets/figure/document-window.png }
---

# Markdown Reader

A simple tool for transforming Markdown repositories into readable documents –

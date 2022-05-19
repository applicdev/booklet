---
title: Outline - Markdown Reader
label: Reader

field:
  caption: A lightweight bundler for transforming Markdown repositories into readable documents and structured JSON data –
  keyword: Reader, Markdown, MD, JSON, HTML

locate:
  - { urn: ./outline/ }
  - { urn: ./, field: { role: landing } }
  - { urn: ./, field: { role: forward, urn: ./outline } }

module:
  - { urn: ./lib/module/reader.ts }
  - { urn: ./lib/module/reader-inline.ts, field: { role: inline } }
  - { urn: ./lib/module/reader-direct.ts, field: { role: worker } }

figure:
  - { urn: ./lib/pattern/assets/figure/document.png }
  - { urn: ./lib/pattern/assets/figure/document-masked.png, field: { role: masked } }
  - { urn: ./lib/pattern/assets/figure/document-window.png, field: { role: window } }
---

# Markdown Reader

A lightweight bundler for transforming Markdown repositories into readable documents and structured JSON data –

---
title: Outline - Markdown Reader
label: Markdown Reader

field:
  caption: A lightweight bundler for transforming Markdown repositories into readable documents and structured JSON data –
  keyword: Reader, Markdown, MD, JSON, HTML

locate:
  - { urn: ./outline/ }
  - { urn: ./, role: forward, field: { urn: ./outline/ } }

module:
  - { urn: ./lib/module/reader.ts }
  - { urn: ./lib/module/reader-inline.ts, role: inline }
  - { urn: ./lib/module/reader-worker.ts, role: worker }

figure:
  - { urn: ./lib/pattern/assets/figure/document.png }
  - { urn: ./lib/pattern/assets/figure/document-masked.png, role: masked }
  - { urn: ./lib/pattern/assets/figure/document-window.png, role: window }
---

# Markdown Reader

A lightweight bundler for transforming Markdown repositories into readable documents and structured JSON data –

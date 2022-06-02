---
extend-define:
  # ? landing pages
  - alias: 'booklet-landing'
    field: { module: { inline: ['booklet-landing'] } }

  # ? forward pages
  - alias: 'booklet-forward'
    field: { module: { inline: ['booklet-forward'] } }

  # ? document pages
  - alias: 'booklet-manual'
    field:
      # title: false
      title-suffix: ' – Booklet'
      # title-prefix: false
      # caption: false
      # keyword: false
    module: { inline: ['booklet-manual-inline'], loaded: ['booklet-manual-loaded'] }

module-define:
  # ? interface modules
  - alias: 'booklet-manual-loaded'
    field: { urn: './lib/module/booklet.ts' }
  - alias: 'booklet-manual-inline'
    field: { urn: './lib/module/booklet-inline.ts' }

  # ? routing modules
  - alias: 'booklet-landing'
    field: { urn: './lib/module/booklet-landing.ts' }
  - alias: 'booklet-forward'
    field: { urn: './lib/module/booklet-forward.ts' }

figure-define:
  # ? tray and bowser icon
  - alias: 'window'
    field: { urn: './lib/pattern/assets/figure/manual-window.png' }

  # ? pwa and embedded representations
  - alias: 'common'
    field: { urn: './lib/pattern/assets/figure/manual.png' }
  - alias: 'masked'
    field: { urn: './lib/pattern/assets/figure/manual-masked.png' }
---

---
extend-define:
  # ? landing pages
  - alias: 'reader-landing'
    field: { module: { inline: ['reader-landing'] } }

  # ? forward pages
  - alias: 'reader-forward'
    field: { module: { inline: ['reader-forward'] } }

  # ? document pages
  - alias: 'reader-manual'
    field:
      # title: false
      title-suffix: ' – Reader'
      # title-prefix: false
      # caption: false
      # keyword: false
    module: { inline: ['reader-manual-inline'], loaded: ['reader-manual-loaded'] }

module-define:
  # ? interface modules
  - alias: 'reader-manual-loaded'
    field: { urn: './lib/module/reader.ts' }
  - alias: 'reader-manual-inline'
    field: { urn: './lib/module/reader-inline.ts' }

  # ? routing modules
  - alias: 'reader-landing'
    field: { urn: './lib/module/reader-landing.ts' }
  - alias: 'reader-forward'
    field: { urn: './lib/module/reader-forward.ts' }

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

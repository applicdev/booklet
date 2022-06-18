import { html, svg, render } from 'https://unpkg.com/lit-html?module';

const fragment = {};
const internal = {};

/* */

fragment.snapToBanner = () => {
  let hei = document.querySelector('.node.banner').offsetHeight;
  document.querySelector('.node.bounds > .bounds-inner').scroll(0, hei);
};

/* */

internal.requestScrollUpdate = () => {
  // ? banner visibility
  let hei = document.querySelector('.node.banner > .banner-content').offsetHeight;
  let pos = document.querySelector('.node.bounds > .bounds-inner').scrollTop;

  let vis = Math.max(80 - pos + hei / 2, 0) / 80;
  document.querySelector('.node.banner').setAttribute('style', `--banner-vis: ${vis};`);
};

globalThis.addEventListener('scroll', internal.requestScrollUpdate, true);

/* */

internal.template = ({ reader, banner }) => {
  return html`
    <div class="node bounds">
      <div class="bounds-inner">
        <header class="node banner">
          <div class="banner-content">
            <!---->
            <div class="type-block">
              <span class="type banner">${banner.title}</span>
              <span class="type banner-caption">${banner.caption}</span>
            </div>
            <!---->
          </div>
          <div class="banner-actions">
            <!---->
            <div>
              <!---->
              ${banner.action[0].map(
                (act) => html`
                  <a class="action-icon" href="${banner.path}">
                    <span class="type icon">${internal.templateIcon({ name: act.icon })}</span>
                  </a>
                `
              )}
              <!---->
            </div>
            <div>
              <!---->
              <div class="type-block-sm">
                <span class="type action">${banner.title}</span>
                <span class="type action-sm">${banner.caption}</span>
              </div>
              <!---->
            </div>
            <div>
              <!---->
              <!---->
            </div>
            <!---->
          </div>
        </header>

        <main class="node reader">
          ${!reader
            ? `test`
            : [{}, {}, {}].map(
                (sec) => html`
                  <!---->
                  <section class="reader-section"></section>
                  <!---->
                `
              )}
        </main>
      </div>
    </div>
  `;
};

internal.templateIcon = ({ name }) => {
  return html`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      ${{
        'paper:previous': svg`
            <polyline class="st1" points="15.7,19.3 8.2,11.9 15.7,4.4 "/>
          `,
        'paper:navigate': svg`
            <line class="st0" x1="5.4" y1="12" x2="18.4" y2="12"/>
            <line class="st0" x1="5.4" y1="5.5" x2="18.4" y2="5.5"/>
            <line class="st0" x1="5.4" y1="18.5" x2="18.4" y2="18.5"/>
          `,
        'paper:anker': svg`
            <circle cx="6" cy="19" r="2"></circle>
            <circle cx="18" cy="5" r="2"></circle>
            <path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5"></path>
          `,
      }[name]}
    </svg>
  `;
};

/* */

render(
  internal.template({
    banner: {
      title: 'Booklet',
      caption: 'Debugging-Document',
      action: [
        [{ icon: 'paper:previous', type: 'show:previous' }], //
        [{ icon: 'paper:previous', type: 'show:previous' }],
      ],
    },
    reader: {},
  }),
  document.body
);

requestAnimationFrame(() => {
  if (location.hash != '') return;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  fragment.snapToBanner();
});

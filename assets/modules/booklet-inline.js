const fragment = {};
const internal = {};

/* */

internal.requestScrollUpdate = () => {
  // ? banner visibility
  let hei = document.querySelector('.node.banner > .banner-content').offsetHeight / 3;
  let pos = document.querySelector('.node.bounds > .bounds-inner').scrollTop;

  let vis = Math.max(hei - pos + 50, 0) / hei;
  document.querySelector('.node.banner').setAttribute('style', `--banner-vis: ${vis};`);
};

globalThis.addEventListener('scroll', internal.requestScrollUpdate, true);

/* */

internal.debugRender = ({ reader, option }) => {
  const { hosted, bundle } = globalThis.booklet;

  return `
    <div class="node bounds">
      <div class="bounds-inner">
        <header class="node banner">
          <div class="banner-content">
            <!---->
            <div class="type-block">
              <span class="type banner">Booklet</span>
              <span class="type banner-caption">Debugging-Document</span>
            </div>
            <!---->
          </div>
          <div class="banner-actions">
            <!---->
            <div>
              <!---->
              <a class="action-icon" href="${booklet.hosted.path}">
                <span class="type icon">${internal.debugRenderIcon({ name: 'paper:previous' })}</span>
              </a>
              <!---->
            </div>
            <div>
              <!---->
              <div class="type-block-sm">
                <span class="type action">Booklet</span>
                <span class="type action-sm">Debugging-Document</span>
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

        ${
          !reader
            ? `
              <main>

              </main>
              `
            : `
              <main class="node reader">
                <!---->
                ${[{}, {}, {}]
                  .map(
                    (sec) => `
                    <section class="reader-section"></section>
                  `
                  )
                  .join('')}
                <!---->
              </main>
              `
        }
      </div>
    </div>
  `;
};

internal.debugRenderIcon = ({ name }) => {
  return `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      stroke-width="1.6" 
      stroke="currentColor" 
      fill="none" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      ${
        {
          'paper:previous': `
            <polyline class="st1" points="15.7,19.3 8.2,11.9 15.7,4.4 "/>
          `,
          'paper:navigate': `
            <line class="st0" x1="5.4" y1="12" x2="18.4" y2="12"/>
            <line class="st0" x1="5.4" y1="5.5" x2="18.4" y2="5.5"/>
            <line class="st0" x1="5.4" y1="18.5" x2="18.4" y2="18.5"/>
          `,
          'paper:upcoming': `
            <path d="M20 12v-6a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v8" />
            <path d="M4 18h17" />
            <path d="M18 15l3 3l-3 3" />
          `,
          'paper:anker': `
            <circle cx="6" cy="19" r="2"></circle>
            <circle cx="18" cy="5" r="2"></circle>
            <path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5"></path>
          `,
          'paper:close': `
            <path d="M21 12v3a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h9" />
            <line x1="7" y1="20" x2="17" y2="20" />
            <line x1="9" y1="16" x2="9" y2="20" />
            <line x1="15" y1="16" x2="15" y2="20" />
            <path d="M17 8l4 -4m-4 0l4 4" />
          `,
        }[name]
      }
    </svg>
  `;
};
// ---

globalThis.addEventListener('DOMContentLoaded', async () => {
  document.body.innerHTML = internal.debugRender({
    reader: {}, //false,
    option: {},
  });

  // ? snap to header
  if (location.hash == '') {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    let hei = document.querySelector('.node.banner').offsetHeight;
    document.querySelector('.node.bounds > .bounds-inner').scroll(0, hei);

    requestAnimationFrame(() => {
      document.body.removeAttribute('active-scroll');
    });
  }
});

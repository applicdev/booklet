const fragment = {};
const internal = {};

let tim;
globalThis.addEventListener(
  'scroll',
  () => {
    // ? banner visibility
    let hei = document.querySelector('.node.banner').offsetHeight * 0.5;
    let pos = document.querySelector('.node.bounds').scrollTop;

    let vis = Math.max(Math.min(hei - pos), 0) / hei;
    document.querySelector('.node.banner').setAttribute('style', `--banner-vis: ${vis};`);

    // ? scroll
    document.body.setAttribute('active-scroll', '');

    clearTimeout(tim);
    tim = setTimeout(() => {
      document.body.removeAttribute('active-scroll');
    }, 1800);
  },
  true
);

globalThis.addEventListener('DOMContentLoaded', async () => {
  document.body.innerHTML = await internal.debugRender({
    reader: {}, //false,
    bundle: {},
    option: {},
  });

  if (location.hash == '') {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    let hei = document.querySelector('.node.banner').offsetHeight;
    document.querySelector('.node.bounds').scroll(0, hei);

    requestAnimationFrame(() => {
      document.body.removeAttribute('active-scroll');
    });
  }
});

internal.debugRender = async ({ reader, bundle, option }) => {
  return `
    <div class="node bounds">
      <header class="node banner">
        <!---->
        <div class="banner-content"><span class="type banner">Untitled document</span></div>
        <!---->
      </header>

      ${
        !reader
          ? `
            <main>

            </main>
            `
          : `
            <nav class="node reader-nav">
              <!---->
              <button class="button-nav" onclick="globalThis.dispatchEvent(new CustomEvent('request:focus-previous-paper'))">
                <span class="type icon-sm"> ${internal.debugRenderIcon({ name: 'paper:previous' })} </span>
              </button>
              <!---->
              
              <!---->
              <button class="button-nav" onclick="globalThis.dispatchEvent(new CustomEvent('request:paper-close'))">
                <span class="type icon-sm"> ${internal.debugRenderIcon({ name: 'paper:close' })} </span>
              </button>
              <button class="button-nav" onclick="globalThis.dispatchEvent(new CustomEvent('request:paper-anker'))">
                <span class="type icon-sm"> ${internal.debugRenderIcon({ name: 'paper:anker' })} </span>
              </button>
              <!---->
              
              <!---->
              <button class="button-nav" onclick="globalThis.dispatchEvent(new CustomEvent('request:focus-upcoming-paper'))">
                <span class="type icon-sm"> ${internal.debugRenderIcon({ name: 'paper:upcoming' })} </span>
              </button>
              <!---->
            </nav>
                  
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
  `;
};

internal.debugRenderIcon = ({ name }) => {
  return `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      stroke-width="2" 
      stroke="currentColor" 
      fill="none" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      ${
        {
          'paper:previous': `
            <path d="M4 12v-6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v8" />
            <path d="M20 18h-17" />
            <path d="M6 15l-3 3l3 3" />
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
let params = new URLSearchParams(globalThis.location.search).get(`redirect`) || ``;
let active = globalThis.location.pathname.split(`/`).slice(1);
let target = '';

if (active[active.length - 1] == ``) active.pop();

switch (true) {
  // ? try ".../foo/boo[?redirect=...]" to ".../foo/boo/[?redirect=...]"
  case !globalThis.location.pathname.endsWith(`/`):
    {
      let path = `/${active.join(`/`)}`;
      target = params == `` ? `${path}/` : `${path}/?redirect=${params}`;
    }
    break;

  // ? trusted fallback when root path was not resolvable
  case active.length == 0:
    {
      let rout = `${params || ''}`;
      let host = `${location.hostname}`;
      let path = `applic.dev/search/feedback`;

      target = `https://${path}?redirect=${rout}&redirect-origin=${host}`;
    }
    break;

  // ? redirect down ".../foo/boo/" to ".../foo?redirect=/boo/"
  default:
    {
      let rout = `/${active.pop()}${params || ''}`;
      let path = `/${active.join(`/`)}`;

      target = `${path}?redirect=${rout}`;
    }
    break;
}

globalThis.location.replace(target);

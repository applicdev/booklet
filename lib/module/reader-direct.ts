let shorts: { [prop: string]: string } = { o: 'outline', p: 'people', s: 'search' };
let params = new URLSearchParams(globalThis.location.search).get(`redirect`) || ``;
let active = globalThis.location.pathname.split(`/`).slice(1);
let target = { urn: '' };

if (active[active.length - 1] == ``) active.pop();

switch (true) {
  // ? try "/o/foo/boo[/][?redirect=...]" to "/outline/foo/boo[/][?redirect=...]"
  case active[0] in shorts:
    {
      active[0] = shorts[active[0]];
      let path = `/${active.join(`/`)}`;
      target.urn = params == `` ? `${path}` : `${path}?redirect=${params}`;
    }
    break;

  // ? try ".../foo/boo[?redirect=...]" to ".../foo/boo/[?redirect=...]"
  case !globalThis.location.pathname.endsWith(`/`):
    {
      let path = `/${active.join(`/`)}`;

      target.urn = params == `` ? `${path}/` : `${path}/?redirect=${params}`;
    }
    break;

  // ? trusted fallback when root path was not resolvable
  case active.length == 0:
    {
      let rout = `${params || ''}`;
      let host = `${location.hostname}`;
      let path = `applic.dev/manual/booklet/fallback-page`;

      target.urn = `https://${path}?redirect=${rout}&redirect-origin=${host}`;
    }
    break;

  // ? redirect down ".../foo/boo/" to ".../foo?redirect=/boo/"
  default:
    {
      let rout = `/${active.pop()}${params || ''}`;
      let path = `/${active.join(`/`)}`;

      target.urn = `${path}?redirect=${rout}`;
    }
    break;
}

globalThis.location.replace(target.urn);

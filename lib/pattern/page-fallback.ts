const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.render = ({ page, pattern }: any) => `
<!DOCTYPE html>
<html lang="en-NL">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=no" />
    <meta name="robots" content="noarchive, notranslate, noindex" />

    <!---->
    <script>
      let shorts = { o: 'outline' };
      let params = new URLSearchParams(globalThis.location.search).get(\`redirect\`) || \`\`;
      let active = globalThis.location.pathname.split(\`/\`).slice(1);
      let target = '';

      if (active[active.length - 1] == \`\`) active.pop();

      switch (true) {
        // ? try "/o/foo/boo[/][?redirect=...]" to "/outline/foo/boo[/][?redirect=...]"
        case active[0] in shorts:
          {
            active[0] = shorts[active[0]];
            let path = \`/\${active.join(\`/\`)}\`;
            target = params == \`\` ? \`\${path}\` : \`\${path}?redirect=\${params}\`;
          }
          break;

        // ? try ".../foo/boo[?redirect=...]" to ".../foo/boo/[?redirect=...]"
        case !globalThis.location.pathname.endsWith(\`/\`):
          {
            let path = \`/\${active.join(\`/\`)}\`;
            target = params == \`\` ? \`\${path}/\` : \`\${path}/?redirect=\${params}\`;
          }
          break;

        // ? trusted fallback when root path was not resolvable or
        //   redirect down ".../foo/boo/" to ".../foo/?redirect=/boo/"
        default:
          {
            let rout = \`/\${active.pop()}\${params}\`;
            let path = \`/\${active.join(\`/\`)}?redirect=\${rout}\`;

            target =
              path.startsWith(\`//\`) || path.startsWith(\`/?redirect\`) //
                ? \`https://applic.dev/outline\`
                : \`\${path}\`;
          }
          break;
      }

      globalThis.location.replace(target);
    </script>
    <!---->
  </head>

  <body>
    <!---->
    <p>Please <a href="https://applic.dev/outline">click here</a>, if you do not get redirected automatically.</p>
    <!---->
  </body>
</html>
`;

export default { ...fragment };

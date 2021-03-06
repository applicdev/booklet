// import { default as snippet } from '../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

internal.createPattern = ({}) => {
  return ({ parsed }: any) => `<!DOCTYPE html>
<html lang="en-NL">
  <head>
    <meta charset="UTF-8" />
    <meta content="noarchive, notranslate, noindex" name="robots" />
    <meta content="width=device-width, initial-scale=1, user-scalable=no" name="viewport" />

    <!---->
    <title>&#65279;</title>
    <!---->

    <!---->
    <meta content="#f6f6f6" name="theme-color" />
    <meta content="#f6f6f6" name="theme-color" media="(prefers-color-scheme: light)" />
    <meta content="#171b22" name="theme-color" media="(prefers-color-scheme: dark)" />
    <!---->

    <!---->
    <script>
      globalThis.booklet = {
        outline: [
          { urn: ${parsed.urn} }
        ]
      }
    </script>
    <!---->

    <!---->
    <script src="${parsed.urn}assets/modules/booklet-direct.js"></script>
    <!---->
  </head>
</html>
`;
};

fragment.create = ({ role }: { role: string }) => ({ role, render: internal.createPattern({}) });

export default { ...fragment };

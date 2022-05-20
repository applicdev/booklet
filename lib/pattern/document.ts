// import { default as snippet } from '../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

internal.createPattern = ({}) => {
  return ({ parsed }: any) => `<!DOCTYPE html>

<html lang="en-NL">
  <head>
    <meta charset="UTF-8" />
    <meta content="index, follow" name="robots" />
    <meta content="width=device-width, initial-scale=1, user-scalable=no" name="viewport" />

    <!---->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <!---->

    <!---->
    <title>${parsed.title}</title>
    <meta content="${parsed.field.caption}" name="description" />
    <meta content="${parsed.field.keyword}" name="keywords" />
    <!---->

    <!---->
    <link href="${parsed.figure_48w}" rel="icon" />
    <link href="${parsed.figure_192w}" rel="apple-touch-icon" />
    <!---->

    <!---->
    <meta content="#f6f6f6" name="theme-color" />
    <meta content="#f6f6f6" name="theme-color" media="(prefers-color-scheme: light)" />
    <meta content="#171b22" name="theme-color" media="(prefers-color-scheme: dark)" />
    <link href="${parsed.static.webmanifest}" rel="manifest" />
    <!---->

    <!---->
    <meta content="en-NL" property="og:locale" />
    <meta content="${parsed.image_512w}" property="og:image" />
    <meta content="${parsed.title}" property="og:title" />
    <meta content="${parsed.url}" property="og:url" />
    <meta content="${parsed.field.caption}" property="og:description" />
    <meta content="summary_large_image" property="twitter:card" />
    <!---->

    <!---->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@350;400;450;550&display=block" rel="stylesheet" />
    <!---->

    <!---->
    ${parsed.style_inline}
    <!---->

    <!---->
    ${parsed.module_inline}
    <!----> 
  </head>

  <body>
    <!---->
    <reader-bounds>
      ${parsed.append}

      <!---->
      <div class="body-node unresolved-scrim"></div>
      <!---->
    </reader-bounds>
    <!---->

    <!---->
    ${parsed.module}
    <!---->

    <!---->
    <template>${parsed.content}</template>
    <!---->
  </body>
</html>
`;
};

fragment.create = ({ role }: { role: string }) => ({ role, render: internal.createPattern({}) });

export default { ...fragment };

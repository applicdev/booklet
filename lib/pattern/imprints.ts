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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@350;400;450;550&display=block" rel="stylesheet" />
    <!---->
  </head>

  <body>
    <!---->
    <template>${parsed.content}</template>
    <!---->
  </body>
</html>
`;
};

fragment.create = () => ({ role: '', render: internal.createPattern({}) });

export default { ...fragment };

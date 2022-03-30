const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.render = ({ page, pattern }: any) => `
  text from page-document.ts

  <pre>
    ${JSON.stringify(page, null, 2)}
  </pre>
`;

export default { ...fragment };

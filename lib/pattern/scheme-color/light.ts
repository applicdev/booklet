internal.createPattern = ({}) => {
  return ({ parsed }: any) => css`
    html {
    }
  `;
};

fragment.create = ({ role }: { role: string }) => ({ role, render: internal.createPattern({}) });

export default { ...fragment };

type InterfaceOption = {
  source: { urn: string; listen?: boolean };
  output: { urn: string };
  hosted: { path: string };
};

type InterfaceMarkdownYaml = {
  [prop: string]: {
    changed?: Date;
    created?: Date;
    title?: string;
    label?: string;

    field?: { [prop: string]: any };

    public?: { urn: string; role?: 'forward' }[];
    figure?: { urn: string; role?: 'masked' | 'window' }[];
    module?: { urn: string; role?: 'inline' }[];
  };
};

type OutputContentIndex = {
  [prop: string]: {
    changed: Date;
    created: Date;
    title: string;
    label: string;

    public: { urn: string };
    source: { urn: string };
  };
};

type OutputContentOption = {
  [prop: string]: {
    changed: Date;
    created: Date;
    title: string;
    label: string;

    field: { [prop: string]: any };

    content: string;

    public: { urn: string; role?: 'forward' }[];
    figure: { urn: string; role?: 'masked' | 'window' }[];
    module: { urn: string; role?: 'inline' }[];
  };
};

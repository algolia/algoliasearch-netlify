export type PluginInputs = {
  disabled: boolean;
  branches: string[];
  mainBranch?: string;
  pathPrefix?: string;
  customDomain?: string;
  renderJavaScript?: boolean;
  template?: string;
};

// Need to be sync with manifest.yml
type Inputs = {
  appId: string;
  apiKey: string;
};

export function onPreBuild({ inputs }: { inputs: Inputs }) {
  console.log('Hello world from onPreBuild event!');
  console.log('Got inputs', inputs);
}

export function onPostBuild() {
  console.log('onPostBuild');
}

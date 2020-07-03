export function onPreBuild({ inputs }) {
  console.log('Hello world from onPreBuild event!');
  console.log('Got inputs', inputs);
}

export function onPostBuild() {
  console.log('onPostBuild');
}

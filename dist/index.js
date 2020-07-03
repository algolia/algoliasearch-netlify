"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onPostBuild = exports.onPreBuild = void 0;
function onPreBuild({ inputs }) {
    console.log('Hello world from onPreBuild event!');
    console.log('Got inputs', inputs);
}
exports.onPreBuild = onPreBuild;
function onPostBuild() {
    console.log('onPostBuild');
}
exports.onPostBuild = onPostBuild;

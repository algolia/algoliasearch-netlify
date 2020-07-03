"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onEnd = exports.onPostBuild = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
async function onPostBuild() {
    console.log('Algolia Crawler Netlify plugin started');
    const crawlerID = process.env.CRAWLER_ID;
    const crawlerUserID = process.env.CRAWLER_USER_ID;
    const crawlerApiKey = process.env.CRAWLER_API_KEY;
    if (!crawlerID || !crawlerUserID || !crawlerApiKey) {
        throw new Error('Missing required Crawler credentials');
    }
    const results = await node_fetch_1.default(`https://crawler.algolia.com/api/1/crawlers/${crawlerID}/reindex`, {
        headers: {
            Authorization: `Basic ${Buffer.from(`${crawlerUserID}:${crawlerApiKey}`).toString('base64')}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });
    console.log(results);
}
exports.onPostBuild = onPostBuild;
function onEnd(params) {
    console.log(JSON.stringify(params));
}
exports.onEnd = onEnd;

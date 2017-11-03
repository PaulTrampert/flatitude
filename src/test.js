import 'babel-polyfill';

let ctx = require.context('./', true, /\.spec.jsx?$/);
ctx.keys().forEach(ctx);
'use strict';
require('babel-polyfill');
require('babel-register');
const app = require('./src').default;
app.listen(3000);
console.log('Server running at 3000');

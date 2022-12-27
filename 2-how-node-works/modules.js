// console.log(arguments);

// module.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
const { add, devide } = require('./test-module-2');
console.log(add(2, 5));
// console.log(module.exports);

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();

// Caching, we are requiring our own modules from the test-module-3 file,
// whether we called it three times, the text 'hello from the module'  logged once only, but
// the function was executed three times, the reason for that is the text 'hello from the module'
// was not exported, no matter how many times we will require module it will called only once,
// but anonymous functions which are exported will be executed depending on how many times we call them because
// they are stored somewhere in node's processes cache.

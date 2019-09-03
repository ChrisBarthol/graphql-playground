'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var expressGraphQL = _interopDefault(require('express-graphql'));

const app = express();

app.use('/graphql', expressGraphQL({
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening');
});

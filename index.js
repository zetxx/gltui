const package = require('./package.json');
const conf = require('rc')(package.name);
const state = require('./state')({});
const layout = require('./layout');
const api = require('./api')(state);

if (!conf.contexts) {
    throw new Error('no contexts found');
}

layout(
    state,
    api
);

state.state().centerData = [
    ['id', 'Context']
].concat(conf.contexts.map(({endpoint}, k) => {
    return [k, endpoint];
}));

setTimeout(async() => {
    state.state().ctx = conf.contexts[0];
    state.state().path = 'Starred Projects';
    state.state().starredProjects = await api.starredProject();
    state.state().user = await api.currentUser();
}, 1500);


// state.sub({
//     prop: 'b',
//     fn: (value) => console.error(value)
// })
// state.state().a = 1;
// state.state().b = 2;

// (async() => {
//     const proj = await api.get({
//         resource: '/projects',
//         params: {
//             membership: true
//         }
//     });
//    console.log(JSON.stringify(proj, null, 2));
// })();

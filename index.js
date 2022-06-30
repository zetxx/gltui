const package = require('./package.json');
const conf = require('rc')(package.name);
const state = require('./state')({});
const layout = require('./layout');
const api = require('./api')(state);
const flow = require('./flow')(
    state,
    conf,
    api
);

if (!conf.contexts) {
    throw new Error('no contexts found');
}

layout(
    state,
    flow
);

flow.init();

// setTimeout(async() => {
//     state.state().ctx = conf.contexts[0];
//     state.state().path = 'Starred Projects';
//     state.state().starredProjects = await api.starredProject();
//     state.state().user = await api.currentUser();
// }, 1500);

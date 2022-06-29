const apiCall = require('./apiCall');

module.exports = (state) => {
    let apiCaller
    state.sub({prop: 'ctx', fn: (value, pro, obj) => {
        apiCaller = apiCall({
            ...value,
            notify: (v) => (state.state().httpRequest = v)
        });
    }});

    // apiCaller

    return {
        starredProject: async() => {
            return await apiCaller.get({
                resource: '/projects',
                params: {
                    membership: true
                }
            });
        },
        currentUser: async() => {
            return await apiCaller.get({
                resource: '/user',
                params: {}
            });
        }
    };
};

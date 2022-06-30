const apiCall = require('./apiCall');

module.exports = (state) => {
    let apiCaller
    const notify = (v) => (state.state().httpRequest = v);
    state.sub({prop: 'ctx', fn: (value, pro, obj) => {
        apiCaller = apiCall({
            ...value,
            notify
        });
    }});

    // apiCaller

    return {
        starredProject: async() => {
            return await apiCaller.get({
                resource: '/projects',
                params: {
                    membership: true,
                    starred: true
                },
                notify
            });
        },
        currentUser: async() => {
            return await apiCaller.get({
                resource: '/user',
                params: {},
                notify
            });
        },
        mergeRequestsOpen: async() => {
            return await apiCaller.get({
                resource: '/merge_requests',
                params: {
                    state: 'opened'
                },
                notify
            });
        }
    };
};

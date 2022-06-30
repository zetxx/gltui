module.exports = (
    state,
    conf,
    api
) => {
    const o = {
        'init'(){
            state.state().flow = 'context';
            state.state().starredProjects = [];
            state.state().user = {};
            state.state().centerData = [
                ['Context']
            ].concat(conf.contexts.map(({endpoint}, k) => {
                return [endpoint];
            }))
        },
        async 'starredProjects'(ctx){
            state.state().flow = 'starredProjects';
            state.state().ctx = conf.contexts[ctx];
            const starredProjects = await api.starredProject();
            const mergeRequestsOpen = (await api.mergeRequestsOpen())
                .reduce((a, {project_id, ...p}) => {
                    return {
                        ...a,
                        [project_id]: (a[project_id] || [])
                            .concat({...p, project_id})
                    };
                }, {});
            const user =  await api.currentUser();
            state.state().flow = 'starredProjects';
            state.state().starredProjects = starredProjects;
            state.state().user = user;
            state.state().centerData = [
                ['Name', 'Forks', 'Issues', 'Star', 'MR']
            ].concat(
                starredProjects
                    .map(({
                        id,
                        name,
                        forks_count,
                        open_issues_count,
                        star_count
                    }) => [
                        name,
                        String(forks_count),
                        String(open_issues_count),
                        String(star_count),
                        (mergeRequestsOpen[id] || [])
                            .length
                            .toString()
                    ])
            );
        },
        async 'project.mergeRequests'(
            objectId,
            subObjectId,
            select
        ) {
            state.state().flow = 'project.mergeRequests';
        }
    };
    0['starredProjects.mergeRequests'] = o['project.mergeRequests'];
    return o;
};

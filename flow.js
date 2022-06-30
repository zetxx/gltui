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
            state.state().project = null;
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
            state.state().project = state
                .state()[state.state().flow][objectId - 1];
            state.state().flow = 'project.mergeRequests';
            const mergeRequestsOpen = (await api.mergeRequestsOpen())
                .filter(({project_id}) => project_id === state.state().project.id);
            state.state().centerData = [
                ['Title', 'From > To', 'State']
            ].concat(
                mergeRequestsOpen
                    .map(({
                        title,
                        merge_status,
                        source_branch,
                        target_branch,
                        state,
                        work_in_progress
                    }) => [
                        title,
                        `${source_branch} > ${target_branch}`,
                        `State: ${state !== "opened" ? "✗" : "✅"}; MR Status: ${merge_status === "cannot_be_merged" ? "✗" : "✅"}; WIP: ${work_in_progress ? "YES" : "NO"}`
                        // '✅✗❗'
                    ])
            );
        }
    };
    o['starredProjects.mergeRequests'] = o['project.mergeRequests'];
    return o;
};

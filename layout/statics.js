const o = {
    labels: {
        context: 'Context',
        starredProjects: 'Starred Projects',
        projectInfo: 'Project information',
        repository: 'Repository',
        issues: 'Issues',
        mergeRequests: 'Merge requests',
        cicd: 'CI/CD'
    },
    menu: {
        project: [
            'projectInfo',
            'repository',
            'issues',
            'mergeRequests',
            'cicd'
        ]
    }
};

o.menu.starredProjects = o.menu.project;

module.exports = o;

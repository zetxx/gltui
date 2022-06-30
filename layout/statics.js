const o = {
    labels: {
        context: 'Context',
        starredProjects: 'Starred Projects',
        projectInfo: 'Project information',
        repository: 'Repository',
        issues: 'Issues',
        mergeRequests: 'Merge requests',
        cicd: 'CI/CD',
        list: 'List',
        boards: 'Boards',
        labels: 'Labels',
        milestones: 'Milestones',
        'project.mergeRequests': ': Merge Requests',
        merge: 'Merge',
        close: 'Close'
    },
    menu: {
        project: [
            'projectInfo',
            'repository',
            'issues',
            'mergeRequests',
            'cicd'
        ],
        'project.issues': [
            'list',
            'boards',
            'labels',
            'milestones'
        ],
        'project.mergeRequests': [
            'merge',
            'close'
        ]
    }
};

o.menu.starredProjects = o.menu.project;

module.exports = o;

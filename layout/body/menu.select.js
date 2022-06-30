const blessed = require('blessed');
const {
    labels,
    menu
} = require('../statics');

module.exports = (
    state,
    flow,
    screen,
    centerList,
    objectId
) => {
    const menuList = blessed.list({
        parent: screen,
        left: 'center',
        top: 'center',
        label: ' Menu ',
        width: 'shrink',
        height: '20%',
        border: {
            type: 'line'
        },
        align: 'left',
        tags: true,
        keys: true,
        vi: true,
        mouse: false,
        style: {
            fg: 'blue',
            bg: 'default',
            border: {
                fg: 'default',
                bg: 'default'
            },
            selected: {
                 bg: 'green'
            }
        },
        items: menu[state.state().flow]
            .map((el) => labels[el])
    });
    menuList.focus();
    const destroy = () => {
        menuList.destroy();
        centerList.focus();
        screen.render();
    };
    menuList.on('select', function(item, select) {
        const sel = menu[state.state().flow][select];
        const flowName = [state.state().flow, menu[state.state().flow][select]].join('.');
        destroy();
        if (!flow[flowName]) {
            throw new Error('flowNotImplemented');
        }
        flow[flowName](objectId, select);
    });
    menuList.on('keypress', function(ch, {name, ...key}) {
        if (name === 'escape') {
            destroy();
        }
    });
    screen.render();
};

const blessed = require('blessed');
const {labels} = require('../statics');
const menuSelect = require('./menu.select');

module.exports = (
    state,
    flow,
    screen,
    layout
) => {
    const boxCenter = blessed.box({
        parent: layout,
        left: 0,
        width: '100%',
        height: '100%-7',
        border: false
    });

    const centerList = blessed.listtable({
        parent: boxCenter,
        left: 0,
        top: 0,
        left: 0,
        data: null,
        border: 'line',
        align: 'center',
        tags: true,
        keys: true,
        //width: '80%',
        width: '100%-1',
        height: '100%-1',
        vi: true,
        mouse: false,
        style: {
            border: {
                fg: 'red'
            },
            header: {
                fg: 'blue',
                bold: true
            },
            cell: {
                fg: 'magenta',
                selected: {
                    bg: 'blue'
                }
            }
        }
    });

    centerList.on('select', function(item, select) {
        if (['context'].indexOf(state.state().flow) >= 0){ // direct select
            switch (state.state().flow) {
                case 'context':
                    flow.starredProjects(select - 1);
                    break;
            }
        } else { // menu select
            menuSelect(
                state,
                flow,
                screen,
                centerList,
                select
            );
        }
    });
    centerList.focus();
    const updateCenterList = (
        items,
        prop,
        obj
    ) => {
        centerList.setLabel(`  ${labels[obj.flow]}   `);
        centerList.setData(items);
        centerList.select(0);
        screen.render();
    };
    state.sub({prop: 'centerData', fn: updateCenterList});
};

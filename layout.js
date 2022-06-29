const blessed = require('blessed');

module.exports = (state) => {
    const httpRequestBoxQueue = [];

    const screen = blessed.screen({
      smartCSR: true,
      dockBorders: true,
      autoPadding: false,
      warnings: true
    });

    const httpRequest = (
        value,
        prop,
        obj
    ) => {
        if (value === 'begin' && !httpRequestBoxQueue.length) {
            const over = blessed.box({
                parent: screen,
                shadow: true,
                left: 'center',
                top: 'center',
                width: 20,
                height: 7,
                style: {
                  bg: 'red',
                  transparent: true
                },
                border: false,
                tags: true,
                content: '\n\n\n{center}Loading ...{/}'
            });
            httpRequestBoxQueue.push(over);
        } else if (value === 'end' && httpRequestBoxQueue.length) {
            httpRequestBoxQueue.pop().destroy();
        }
    };
    state.sub({prop: 'httpRequest', fn: httpRequest});

    const layout = blessed.layout({
        parent: screen,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'line',
        layout: 'inline-block',
        border: false
    });
    // top
    const boxTop = blessed.box({
        parent: layout,
        top: 0,
        left: 0,
        width: '100%',
        height: 5,
        border: 'line'
    });

    const boxTopLeft = blessed.box({
        parent: boxTop,
        top: 1,
        left: 1,
        width: '33%',
        height: 3,
        border: false,
        tags: true,
        content: '{#fca300-fg}Context:{/#fca300-fg} {bold}N/A{/bold}\n{#fca300-fg}User:{/#fca300-fg} {bold}N/A{/bold}\n'
    });
    const updateBoxTopLeftCont = (
        value,
        prop,
        {
            ctx: {endpoint = 'N/A'} = {},
            user: {name = 'N/A'} = {}
        } = {}
    ) => {
        boxTopLeft.setContent(`{#fca300-fg}Context:{/#fca300-fg} {bold}${endpoint}{/bold}\n{#fca300-fg}User:{/#fca300-fg} {bold}${name}{/bold}\n`);
        screen.render();
    };
    state.sub({prop: 'ctx', fn: updateBoxTopLeftCont});
    state.sub({prop: 'user', fn: updateBoxTopLeftCont});
    // const boxTopCenter = blessed.box({
    //     parent: boxTop,
    //     top: 1,
    //     left: '33%',
    //     width: '33%',
    //     height: 3,
    //     border: false,
    //     tags: true,
    //     content: 'center 1\ncenter 2\ncenter 3'
    // });

    // end top

    const boxCenter = blessed.box({
        parent: layout,
        left: 0,
        width: '100%',
        height: '100%-7',
        border: 'line'
    });

    const listTable = blessed.listtable({
        parent: boxCenter,
        left: 0,
        width: '100%-1',
        height: '100%-1',
        border: {
            type: 'line',
            left: true,
            top: true,
            right: false,
            bottom: false
        },
        align: 'center',
        tags: true,
        keys: true,
        vi: true,
        mouse: false,
        style: {
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
    const updateListTable = (
        value,
        prop,
        obj
    ) => {
        listTable.setData(value);
        screen.render();
    };
    state.sub({prop: 'centerData', fn: updateListTable});
    // bottom
    const boxBottom = blessed.box({
        parent: layout,
        left: 0,
        width: '100%',
        height: 1,
        border: false
    });

    const boxBottomLeft = blessed.box({
        parent: boxBottom,
        left: 0,
        width: '50%',
        height: 1,
        border: false,
        tags: true,
        content: '<context>'
    });
    const updateBoxBottomLeft = (
        value,
        prop,
        obj
    ) => {
        boxBottomLeft.setContent(`{#180200-fg}{#ffa500-bg}{bold}<${value}>{/}`);
        screen.render();
    };
    state.sub({prop: 'path', fn: updateBoxBottomLeft});

    const boxBottomRight = blessed.box({
        parent: boxBottom,
        left: '50%',
        width: '50%',
        height: 1,
        border: false,
        content: ':<command>'
    });
    // end bottom

    screen.key('q', function() {
        return screen.destroy();
    });

    screen.render();
};

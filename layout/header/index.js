const blessed = require('blessed');

module.exports = (
    state,
    flow,
    screen,
    layout
) => {
    const httpRequestBoxQueue = [];
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
                  bg: 'green',
                  transparent: true
                },
                border: false,
                tags: true,
                content: '\n\n\n{center}Loading ...{/}'
            });
            httpRequestBoxQueue.push(over);
            screen.render();
        } else if (value !== 'begin' && httpRequestBoxQueue.length) {
            httpRequestBoxQueue.pop().destroy();
            screen.render();
        }
    };
    state.sub({prop: 'httpRequest', fn: httpRequest});
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
};

const blessed = require('blessed');

module.exports = (
    state,
    flow,
    screen,
    layout
) => {
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

    const boxBottomRight = blessed.box({
        parent: boxBottom,
        left: '50%',
        width: '50%',
        height: 1,
        border: false,
        content: ':<command>'
    });
    // end bottom
};

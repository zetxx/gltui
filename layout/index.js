const blessed = require('blessed');

const header = require('./header');
const body = require('./body');
const footer = require('./footer');

module.exports = (
    state,
    flow
) => {
    const screen = blessed.screen({
      smartCSR: true,
      dockBorders: true,
      autoPadding: false,
      warnings: true
    });

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
    
    header(
        state,
        flow,
        screen,
        layout
    );
    body(
        state,
        flow,
        screen,
        layout
    );

    footer(
        state,
        flow,
        screen,
        layout
    );
    screen.key('q', function() {
        return screen.destroy();
    });

    screen.render();
};

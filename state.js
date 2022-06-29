module.exports = (initState = {}) => {
    const fnCallList = [];
    let validator = {
        set: function(obj, prop, value) {
            obj[prop] = value;
            fnCallList
                .map(({prop: p, fn}) => {
                    if (p === prop) {
                        fn(value, prop, obj);
                    }
                });
            return true;
        }
      };
      const state = new Proxy(initState, validator);
      
    return {
        sub: ({prop, fn}) => fnCallList.push({prop, fn}),
        state: () => state
    };
};
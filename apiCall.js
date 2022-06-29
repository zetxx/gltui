const {parse} = require('url');
const {request: rq} = require('http');
const {request: rqSec} = require('https');

const requestInit = ({
    endpoint,
    token
}) => {
    const url = parse(endpoint);
    const request = (
        () => (url.protocol
            .startsWith('https') && rqSec) ||rq
    )();
    const staticHeaders = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    return async({
        headers = {},
        resource,
        method = 'GET',
        params
    } = {}) => {
        return new Promise((resolve, reject) => {
            const paramsS = params && JSON.stringify(params) || '';

            const rd = {
                headers: {
                    ...staticHeaders,
                    ...headers,
                    'Content-Length': (method !== 'GET' &&
                        params &&
                        Buffer.byteLength(paramsS)) || 0
                },
                host: url.host,
                method,
                path: `${url.path}${resource}`
            };
            if (method === 'GET' && params) {
                const qs = Object.keys(params).map(
                    (k) => [k, params[k]].join('=')
                ).join('&');
                rd.path = `${rd.path}?${qs}`;
            }
            const r = request(
                rd,
                (res) => {
                    let data = [];
                    res.setEncoding('utf8');
                    res.on('data', (ch) => data.push(ch));
                    res.on('end', () => {
                        const d = JSON.parse(
                            data.join('')
                        );
                        if (d.error) {
                            console.error(d.error, rd);
                            reject(new Error(d.error));
                        }
                        resolve(d);
                    });
                }
            );
            r.on('error', reject);
            method !== 'GET' && params && r.write(Buffer.from(paramsS));
            r.end();
        });
    };
};

module.exports = ({
    endpoint,
    token,
    notify = () => {}
}) => {
   const request = requestInit({
    endpoint,
    token
});

    return {
        get: async({
            resource,
            method,
            params
        }) => {
            notify('begin');
            const r = await request({
                resource,
                params,
                method
            });
            notify('end');
            return r;
        }
    };
};
/* eslint-disable indent */
// nodemon --> untuk live server perubahan pada js
// eslint --> standarisasi penulisan JS

// eslint-disable-next-line import/no-extraneous-dependencies
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server is running on ${server.info.uri}`);
};

init();

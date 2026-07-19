"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("@infrastructure/typeorm/data-source");
const app_1 = require("./app");
const APP_PORT = process.env.PORT;
async function initializeApplication() {
    try {
        await (0, data_source_1.createPostgresConnection)();
        console.info('Connected to database');
    }
    catch (error) {
        console.error('Error connecting to database', { error });
        throw error;
    }
    const port = 4000;
    return app_1.app.listen(port);
}
initializeApplication()
    .then((server) => {
    console.info('Server Started Successfully', {
        server: server.address(),
        APP_PORT,
    });
})
    .catch((error) => {
    console.error('Failed to start application', { error });
    process.exit(1);
});

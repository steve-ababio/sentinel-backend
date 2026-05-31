import { Server } from "http";
import { createPostgresConnection } from "@infrastructure/typeorm/data-source";
import { app } from "./app";

const APP_PORT = process.env.APP_PORT

async function initializeApplication(): Promise<Server> {
  try {
    await createPostgresConnection()
    console.info('Connected to database')

  } catch (error) {
    console.error('Error connecting to database', { error })
    throw error
  }

    // Start server
//   const port = APP_PORT ? parseInt(APP_PORT, 10) : 4000;
  
//   return new Promise<Server>((resolve) => {
//     const server = app.listen(port, '0.0.0.0', () => {
//       resolve(server);
//     });
//   });
// }
  // Start server
  const port = APP_PORT ? parseInt(APP_PORT, 10) : 4000;
  return app.listen(port)
}

initializeApplication() 
  .then((server) => {
    console.info('Server Started Successfully', {
      server: server.address(),
      APP_PORT,
    })
  })
  .catch((error): void => {
    console.error('Failed to start application', { error })
    process.exit(1)
  })

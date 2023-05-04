import { createServer } from './server';

const initRoutes = async() => {
  await createServer();
}

initRoutes();
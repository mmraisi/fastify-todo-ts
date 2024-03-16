import fastify from 'fastify';
import oas from 'oas-fastify';
import fastifySwagger from '@fastify/swagger';
import { todoController as handler } from './controllers/todos/index';

import spec from '../openapi.json';

//workaround for fastify issue (https://github.com/ahmadnassri/node-oas-fastify/issues/17)
(spec as { $id?: string }).$id = '$';

const server = fastify({
  logger: true,
});

const start = async () => {
  try {
    server.register(fastifySwagger, {
      swagger: spec,
      exposeRoute: true,
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
      },
    });

    // Integrate oas-fastify
    server.register(oas, {
      spec,
      handler,
    });

    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('app is listening on port:', 3000);
  } catch (error) {
    server.log.error(error);
    console.log(error);
    process.exit(1);
  }
};

start();
export default server;
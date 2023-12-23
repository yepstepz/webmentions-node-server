import { fastify } from '../routes/index.js'
import '../../dot-env.js';

// Run the server!
fastify.listen({ port: 3030 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
import { fastify } from '../routes/index.js'
import '../../dot-env.js';

const port = process.env.PORT || 3030;

// Run the server!
fastify.listen({ port, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
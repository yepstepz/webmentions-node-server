import Fastify from 'fastify'
import formbody from '@fastify/formbody';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
import { prisma } from "../prisma/client";

import { processInput } from '../server/receiver/process-input.js';
import { discoverSource } from '../server/receiver/discover-source.ts';
import { parseSource } from '../server/receiver/parse-source.ts';

import { parse } from "../server/process-webmentions-io/parse.js";
import { processWebmentions } from "../server/process-webmentions-io/process-webmentions.js";

const fastify = Fastify({
  logger: true
})

fastify.register(formbody);

fastify.register(fastifyStatic, {
  root: path.join(process.cwd(), 'fixture'),
  prefix: '/fixture/', // optional: default '/'
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

fastify.route({
  method: 'POST',
  url: '/receiver',
  json: true,
  headers: {
    'Accept': '*/*'
  },
  handler: async function (request, reply) {
    try {
      const { sourceURLObject, targetURLObject } = processInput(request.body);
      const response = await discoverSource({ sourceURLObject, targetURLObject });
      parseSource(response, { sourceURLObject, targetURLObject });
    } catch (e) {
      throw new Error(e);
    }
    if (reply.statusCode >= 299) {
      reply.statusCode = 500
    }

    reply.statusCode = 202;

    reply.send({})
  }
})

fastify.route({
  method: 'POST',
  url: '/process-webmentions-io',
  json: true,
  headers: {
    'Accept': '*/*'
  },
  handler: async function (request, reply) {
    try {
      const data = await parse(request.body);
      await processWebmentions(data);

    } catch (e) {
      throw new Error(e);
    }
    reply.send({ status: 'success'})
  }
})

fastify.route({
  method: 'GET',
  url: '/fixture/:url',
  json: true,
  headers: {
    'Accept': '*/*'
  },
  handler: async function (request, reply) {
    let data = {}
    try {
      data = await import(path.join(process.cwd(), 'fixture', request.params.url + '.json'));
    } catch (e) {
      throw new Error(e);
    }
    reply.send(data)
  }
})

fastify.route({
  method: 'GET',
  url: '/:category/comments',
  json: true,
  headers: {
    'Accept': '*/*'
  },
  handler: async function (request, reply) {
    let data = {};

    try {
      data = await prisma.mention.findMany({
        orderBy: [
          {
            published: 'asc',
          },
        ],
        include: {
          User: true
        }
      })
    } catch (e) {
      throw new Error(e);
    }
    reply.send({ data })

  }
})

fastify.route({
  method: 'GET',
  url: '/:category/comments/:target',
  json: true,
  headers: {
    'Accept': '*/*'
  },
  handler: async function (request, reply) {
    let data = {};
    let parsedData = {};

    try {
      const { href } = new URL(
          path.join(request.params.category, request.params.target),
          process.env.TARGET
      );

      data = await prisma.mention.findMany({
        orderBy: [
          {
            published: 'asc',
          },
        ],
        where: { wmTarget: href },
        include: {
          User: true
        }
      });

      parsedData = data.map(({User, ...rest}) => {
        rest.user = User;
        return rest
      });
    } catch (e) {
      throw new Error(e);
    }
    reply.send({ data: parsedData })

  }
})

fastify.route({
  method: 'GET',
  url: '/:category',
  json: true,
  headers: {
    'Accept': '*/*'
  },
  handler: async function (request, reply) {
    let data = {};

    try {
      data = await prisma.mention.groupBy({
        by: ['wmTarget'],
        _count: {
          _all: true,
          inReplyTo: true,
          likeOf: true,
          repostOf: true,
          bookmarkOf: true,
          mentionOf: true,
          rsvp: true
        },
      })
    } catch (e) {
      throw new Error(e);
    }

    reply.send({ data })
  }
})

export { fastify }

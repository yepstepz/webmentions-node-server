# webmentions-server

## Getting Started

Create .env file with the following parameters:

```
    TARGET=example.com
    DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?schema=<SCHEMA>&connection_limit=1"
    SECRET_WEBMENTIONS_IO=example
    WEBMENTIONS_URL=<webmentions.io>
```

For local development:

```
    npm install
```

- Create Postgres DB, user, schema;
- start server;
- add DATABASE_URL to .env file;

```
    prisma db push
    prisma db pull
    prisma generate
    npm run server
```

## Process webmentions.io to Database

- add TARGET as your personal website to .env file;
- add SECRET_WEBMENTIONS_IO to .env file;
- use the value with request:

```
    curl -X POST <PROTOCOL>//<HOST>:<PORT>/process-webmentions-io -d 'secret=<SECRET_WEBMENTIONS_IO>'
```

// TODO:

- [ ] webmentions receiver
- [ ] webmentions sender
- [ ] webmentions parser
- [ ] save to database
- [ ] tests
- [ ] different .env

## Request your webmentions
// TODO

```
    curl -X POST <PROTOCOL>//<HOST>:<PORT>/comments/<type>/<slug>
```
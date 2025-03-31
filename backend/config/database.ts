
export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');
  const host = env('DATABASE_HOST', process.env.DATABASE_HOST);
  const port = env('DATABASE_PORT', process.env.DATABASE_PORT);
  const user = env('DATABASE_USER', process.env.DATABASE_USER);
  const password = env('DATABASE_PASSWORD', process.env.DATABASE_PASSWORD);
  const database = env('DATABASE_NAME', process.env.DATABASE_NAME);

  const connections = {
    postgres: {
      connection: {
        host: env('DATABASE_HOST', host),
        port: env.int('DATABASE_PORT', port),
        database: env('DATABASE_NAME', database),
        user: env('DATABASE_USERNAME', user),
        password: env('DATABASE_PASSWORD', password),
        ssl: env.bool('DATABASE_SSL', true) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};

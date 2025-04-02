const parse = require("pg-connection-string").parse;

const {host, port, database, user, password} = parse(
    process.env.DATABASE_URL
);

export default ({env}) => ({
    connection: {
        client: 'postgres',
        connection: {
            host: host,
            port: port,
            database: database,
            user: user,
            password: password,
            ssl: {
                rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
                ca: env('DATABASE_CA'),
            },

        },
        debug: false,
    },
});

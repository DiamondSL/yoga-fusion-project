const parse = require("pg-connection-string").parse;

const {host, port, database, user, password} = parse(
    process.env.DATABASE_URL
);

console.info(process.env.DATABASE_URL)

export default ({env}) => ({
    connection: {
        client: 'postgres',
        //connectionString: `postgresql://doadmin:${process.env.DATABASE_PASSWORD}@db-postgresql-fra1-54008-do-user-20170373-0.i.db.ondigitalocean.com:25060/defaultdb?sslmode=require`,
        connection: {
            host: host,
            port: port,
            database: database,
            user: user,
            password: password,
            ssl: env.bool('DATABASE_SSL', true) && {
                rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
                ca: env('DATABASE_CA'),
            },

        },
        debug: false,
    },
});

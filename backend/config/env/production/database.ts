const parse = require("pg-connection-string").parse;

const {host, port, database, user, password} = parse(
    process.env.DATABASE_URL
);

export default ({env}) => {
    console.info('DATABASE_URL', process.env.DATABASE_URL, 'CA', process.env.DATABASE_CA)

    return ({
        connection: {
            client: 'postgres',
            //connectionString: `postgresql://doadmin:${process.env.DATABASE_PASSWORD}@db-postgresql-fra1-54008-do-user-20170373-0.i.db.ondigitalocean.com:25060/defaultdb?sslmode=require`,
            connection: {
                host: host,
                port: port,
                database: database,
                user: user,
                password: password,
                ssl: Boolean(true) && {
                    rejectUnauthorized: false,
                    ca: env('DATABASE_CA'),
                },

            },
            debug: false,
        },
    });
}

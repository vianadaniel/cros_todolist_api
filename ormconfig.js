require('dotenv/config');

module.exports = [
    {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'postgres',
        entities: ['src/database/entities/*'],
        synchronize: true,
        migrationsTableName: 'migrations',
        migrations: ['src/database/migrations/*'],
        cli: {
            migrationsDir: 'src/database/migrations',
        },
    },
    {
        type: 'sqlite',
        database: 'test.db',
        synchronize: true,
        logging: false,
        entities: ['src/database/entities/*'],
        synchronize: true,
        migrationsTableName: 'migrations',
        migrations: ['src/database/migrations/*'],
        cli: {
            migrationsDir: 'src/database/migrations',
        },
    },
];

import path from 'path';
import dotenv from 'dotenv';
import { createConnections, Connection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

let postgres_data: Connection[]

export default async (isTesting = false): Promise<Connection[]> => {
    const postgresOptions: PostgresConnectionOptions = {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT!, 10) || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_DB || 'postgres',
        synchronize: true, // Set to false in production
        logging: false, // Set to true for debugging
        entities: [path.resolve(__dirname, '../entities/*.ts')],
    };

    if (isTesting) {
        postgres_data = await createConnections([
            {
                name: 'default',
                ...postgresOptions,
                database: 'test_database',
            },
        ]);

        return postgres_data;
    }

    postgres_data = await createConnections([{
        name: 'default',
        ...postgresOptions,
    }]);

    return postgres_data;
};




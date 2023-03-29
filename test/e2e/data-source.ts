import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'planit-test',
  synchronize: false,
  entities: ['dist/src/entities/*.entity.js'],
});

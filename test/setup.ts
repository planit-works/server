import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'planit-test',
  synchronize: true,
  entities: ['../src/entities/*.entity.js'],
});

const setup = async () => {
  await dataSource.initialize();

  await dataSource.manager.query(`INSERT INTO role (role) VALUES ('admin')`);
  await dataSource.manager.query(`INSERT INTO role (role) VALUES ('basic')`);
  await dataSource.manager.query(
    `INSERT INTO image (url) VALUES ('avatars/default')`,
  );
};

export default setup;

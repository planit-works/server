import { dataSource } from './data-source';

const setup = async () => {
  await dataSource.initialize();
  await dataSource.manager.query(`INSERT INTO role (role) VALUES ('admin')`);
  await dataSource.manager.query(`INSERT INTO role (role) VALUES ('basic')`);
  await dataSource.manager.query(
    `INSERT INTO image (url) VALUES ('avatars/default')`,
  );
};

export default setup;

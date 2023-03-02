require('ts-node').register({
  transpileOnly: true,
});
import { DataSource } from 'typeorm';
import { Role } from '../src/entities/role.entity';
import { Image } from '../src/entities/image.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'planit-test',
  synchronize: true,
  entities: ['src/entities/*.entity.ts'],
});

const setup = async () => {
  await dataSource.initialize();

  await dataSource.manager.insert(Role, { role: 'admin' });

  await dataSource.manager.insert(Role, {
    role: 'basic',
  });

  await dataSource.manager.insert(Image, {
    url: 'avatars/default',
  });
};

export default setup;

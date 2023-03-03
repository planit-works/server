import { dataSource } from './setup';

const teardown = async () => {
  await dataSource.destroy();
};

export default teardown;

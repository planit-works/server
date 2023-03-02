require('ts-node').register({
  transpileOnly: true,
});
import { dataSource } from './setup';

const teardown = async () => {
  await dataSource.destroy();
};

export default teardown;

import { Repository } from './repository';

class Client {
  repositories(): Repository {
    return new Repository();
  }
}

export { Client };

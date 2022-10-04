import axiosClient from './axiosInstance';

class Repository {
  async getAll(params: Record<string, unknown>): Promise<Result> {
    return await (await axiosClient.get('/repositories', { params: params })).data;
  }
}

export { Repository };

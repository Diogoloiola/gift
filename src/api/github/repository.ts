import axiosClient from './axiosInstance';
import { AxiosResponse } from 'axios';

class Repository {
  async getAll(params: Record<string, unknown>): Promise<AxiosResponse> {
    return await axiosClient.get('/repositories', { params: params });
  }
}

export { Repository };

import axiosClient from './axiosInstance';

class Repository {
  async getAll(params: Record<string, unknown>): Promise<Result> {
    return (await axiosClient.get('/search/repositories', { params: params })).data;
  }

  async findByName(organization: string, name: string): Promise<Project> {
    return (await axiosClient.get(`/repos/${organization}/${name}`)).data; 
  }
}

export { Repository };

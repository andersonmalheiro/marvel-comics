import { AxiosInstance } from 'axios';
import { useAPIAuth } from 'utils';
import { clearObject } from 'utils/clear-object';
import { Comic, Pagination, ResponseWrapper } from './models';

type GetComic = ResponseWrapper<Comic>;

export class ComicService {
  constructor(private httpClient: AxiosInstance) {}

  public async list(filters: any): Promise<Pagination<Comic> | undefined> {
    const [ts, hash, key] = useAPIAuth();

    filters = clearObject(filters);

    const params = {
      apikey: key,
      ts,
      hash,
      ...filters,
      offset: 0,
      limit: 20,
    };

    try {
      const response = await this.httpClient.get<GetComic>('/comics', {
        params,
      });

      if (response && response.data) {
        const { data } = response.data;
        return data;
      }
    } catch (error) {
      return error;
    }

    return undefined;
  }
}

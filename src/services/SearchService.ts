import { Api, Route, type RouteParameters, type RouteResponse } from '../middlewares/Api';
import { alertStore } from '../stores';

type Service = {
  /**
   * Get Repositories
   * @param parameters query parameters
   */
  repositories(parameters: RouteParameters<Route.SearchRepositories>): Promise<{
    success: boolean;
    data?: RouteResponse<Route.SearchRepositories>['data']
  }>;
};

export const SearchService: Service = {
  async repositories(parameters) {
    try {
      const res = await Api.request(Route.SearchRepositories, parameters);

      return {
        success: true,
        data: res.data
      }
    } catch(err: any) {
      const [title, ...message] = err.toString().split(':');

      alertStore.setState((_state) => ({
        title,
        message,
        color: 'danger',
        show: true
      }));

      return {
        success: false,
      }
    }
  }
};

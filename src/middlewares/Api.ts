import { Octokit } from '@octokit/core';
import type { OctokitOptions, RequestParameters } from '@octokit/core/dist-types/types'
import type { Endpoints } from '@octokit/types/dist-types/generated/Endpoints';
import { throttling } from '@octokit/plugin-throttling';
import { alertStore } from '../stores';

const ApiOctokit = Octokit.plugin(throttling);

export const Api = new ApiOctokit({
  throttle: {
    onRateLimit: (retryAfter: number, options: OctokitOptions, octokit: Octokit, retryCount: number) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      // Retry once
      if (retryCount < 1) {
        alertStore.setState((state) =>({
          title: 'Request quota detected',
          message: `retrying after ${retryAfter} seconds!`,
          color: 'warning',
          show: true,
        }));
        return true;
      }
    },
    onSecondaryRateLimit: (retryAfter: number, options: OctokitOptions, octokit: Octokit) => {
      alertStore.setState((state) =>({
        title: 'Secondary quota detected',
        message: `wait for ${retryAfter} seconds!`,
        color: 'danger',
        show: true,
      }));

      // does not retry, only logs a warning
      octokit.log.warn(
        `Secondary quota detected for request ${options.method} ${options.url}`
      );
    },
  },
});

export enum Route {
  SearchRepositories = 'GET /search/repositories',
}
export type RouteParameters<T extends Route> = Endpoints[T]['parameters'] & RequestParameters;
export type RouteResponse<T extends Route> = Endpoints[T]['response'];
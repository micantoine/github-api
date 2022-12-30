import { type HTMLAttributes, type FC } from 'react';
import { Route, type RouteResponse } from '../middlewares/Api';
import { abbreviateNumber } from '../utils';
import Pill from './Pill';
import styles from './RepositoryItem.module.css';

export type Repository =  ArrayElement<RouteResponse<Route.SearchRepositories>['data']['items']>;

const RepositoryItem: FC<HTMLAttributes<{}> & { item: Repository }> = ({
  item,
  ...props
}) => {

  const topics = item.topics?.map((topic) => <Pill key={topic}>{topic}</Pill>) ?? '';

  return (
    <div {...props}>
      <h3 className={styles.title}>
        <a href={item.html_url} title={item.name} target="_blank" rel="noreferrer">{item.full_name}</a>
      </h3>
      <p className={styles.description}>{item.description}</p>
      <div className={styles.topics}>{topics}</div>
      <dl className={styles.dl}>
        <dt>Stars:</dt>
        <dd>{abbreviateNumber(item.stargazers_count)}</dd>
        {item.language && <>
          <dt>Language:</dt>
          <dd>{item.language}</dd>
        </>}
        {item.license && <>
          <dt>License:</dt>
          <dd>{item.license.spdx_id ?? item.license.name}</dd>
        </>}
      </dl>
    </div>
  );
}

export default RepositoryItem;
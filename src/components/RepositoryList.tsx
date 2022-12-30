import { type HTMLAttributes, type FC } from 'react';
import RepositoryItem, { type Repository } from './RepositoryItem';
import { classNames } from '../utils';
import styles from './RepositoryList.module.css';

const RepositoryList: FC<HTMLAttributes<{}> & { items: Repository[] }> = ({
  items,
  className,
  ...props
}) => {

  return (
    <>{items.length > 0 &&
      <ul className={classNames([styles.list, className])} {...props}>
        {items.map((item) => <li className={styles.item} key={item.id}><RepositoryItem item={item} /></li>)}
      </ul>
    }</>
  );
}

export default RepositoryList;
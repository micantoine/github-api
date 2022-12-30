import type { HTMLAttributes, FC } from 'react';
import { classNames } from '../utils';

import styles from './ProgressBarLoader.module.css';

const ProgressBarLoader: FC<HTMLAttributes<{}> & {
  bar?: 'transparent',
}> = ({ className, bar, ...props }) => {

  return <div className={classNames([
    styles.bar,
    className,
    bar ? styles[bar] : undefined,
  ])} {...props}>
    <div className={styles.progress}></div>
  </div>
}

export default ProgressBarLoader;
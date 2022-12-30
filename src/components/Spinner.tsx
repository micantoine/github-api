import type { HTMLAttributes, FC } from 'react';
import { classNames } from '../utils';

import styles from './Spinner.module.css';

const Spinner: FC<HTMLAttributes<{}>> = ({ className, ...props }) => {
  return <div className={classNames([
    styles.spinner,
    className
  ])} {...props} />
}

export default Spinner;
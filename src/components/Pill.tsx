import { type HTMLAttributes, type FC } from 'react';
import { classNames } from '../utils';

import styles from './Pill.module.css';

const Pill: FC<HTMLAttributes<{}>> = ({ className, ...props }) => {
  return <span className={classNames([styles.pill, className])} {...props}>{props.children}</span>
}

export default Pill;
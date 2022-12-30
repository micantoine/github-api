import type { HTMLAttributes, FC } from 'react';
import { useStore } from '../hooks';
import { alertStore } from '../stores';
import { classNames } from '../utils';
import styles from './Alert.module.css';

const Alert: FC<HTMLAttributes<{}>> = ({ className, ...props }) => {
  const alert = useStore(alertStore, (state) => state);

  const classes = [styles.alert, className];

  if (alert.color) {
    classes.push(styles[alert.color]);
  }

  return <>
    {alert.show && <div className={classNames(classes)} {...props}>
      <strong>{alert.title}:</strong> {alert.message}
      {props.children}
    </div>}
  </>;
}

export default Alert;
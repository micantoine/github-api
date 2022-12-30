import type { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from '../utils';
import styles from './Button.module.css';

const Button: FC<ButtonHTMLAttributes<{}> & {
  color?: 'transparent',
  size?: 'small'
}> = ({ className, color, size, type, ...props }) => {
  const buttonType: ButtonHTMLAttributes<{}>['type'] = type ?? 'button';
  const classes = [styles.btn, className];

  if (color) {
    classes.push(styles[color]);
  }
  if (size) {
    classes.push(styles[size]);
  }

  return (
    <button className={classNames(classes)} type={buttonType} {...props}>
      {props.children}
    </button>
  )
}

export default Button
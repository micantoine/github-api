import React, { type HTMLAttributes, type FC } from 'react';
import { classNames } from '../utils';
import styles from './Container.module.css';


const Container: FC<HTMLAttributes<{}> & TagNameProps> = ({
  className,
  tagName = 'div',
  children,
  ...props
}) => {

  const element = React.createElement(
    tagName,
    {
      className: classNames([styles.container, className]),
      ...props
    },
    children
  );

  return element;
}

export default Container;
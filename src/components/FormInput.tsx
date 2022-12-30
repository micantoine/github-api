import { type InputHTMLAttributes, type FC } from 'react';
import { classNames } from '../utils';
import styles from './FormInput.module.css';

const FormInput: FC<InputHTMLAttributes<{}>> = ({ className, ...props }) => {
  return (
    <input
      className={classNames([styles.input, className])}
      {...props}
    />
  );
}

export default FormInput;
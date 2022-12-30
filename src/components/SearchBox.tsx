import { type ChangeEvent, type HTMLAttributes, type FC, type FormEvent, useState } from 'react';
import { classNames } from '../utils';
import { FormInput, Button } from '.';
import styles from './SearchBox.module.css';
import Spinner from './Spinner';
import { ReactComponent as SearchIcon } from '../assets/search.svg';


const SearchBox: FC<HTMLAttributes<{}> & {
  isSearching?: boolean;
  value?: string;
  onSearch: (payload: string ) => void;
}> = ({
  className,
  isSearching,
  value,
  onSearch,
  ...props
}) => {
  const [ search, setSearch ] = useState<string>(value ?? '');

  const handleChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    setSearch(ev.target.value);
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    if (search.trim().length > 0 && !isSearching) {
      onSearch(search);
    }
  };

  return (
    <form className={classNames([styles.box, className])} {...props} onSubmit={handleSubmit}>
      <FormInput
        type="search"
        defaultValue={search}
        onChange={handleChange}
      />
      <Button type="submit" disabled={isSearching}>
        {isSearching ? <Spinner /> : <SearchIcon />}
      </Button>
    </form>
  );
}

export default SearchBox;
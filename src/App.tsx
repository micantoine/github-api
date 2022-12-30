import { useState, useReducer, useMemo, type Reducer } from 'react';
import { SearchService } from './services/SearchService';
import { Url } from './middlewares';
import { alertStore } from './stores';
import { useDebouncedEffect } from './hooks';
import { Alert, Container, SearchBox, RepositoryList, Pagination, ProgressBarLoader } from './components';
import type { Repository } from './components/RepositoryItem';
import styles from './App.module.css';
import { ReactComponent as GithubLogo } from './assets/github-logo.svg';

enum ReducerActionType {
  SET,
}
interface ReducerAction {
  type: ReducerActionType;
  payload: Repository[];
}

const reducer: Reducer<Repository[], ReducerAction> = (_state, action) => {
  switch (action.type) {
    case ReducerActionType.SET:
      return action.payload;
    default:
      throw new Error();
  }
}

function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <GithubLogo className={styles.logo} width={40} height={40} />
      <h1 className={styles.title}>Search Github</h1>
    </header>
  )
}

function App() {
  const [ repositories, dispatchRepositories ] = useReducer(reducer, []);
  const [ totalCount, setTotalCount ] = useState<number>();
  const [ currentSearch, setCurrentSearch ] = useState<string>(Url.parameter('q'));
  const [ currentPage, setCurrentPage ] = useState<number>(parseInt(Url.parameter('page'), 10) || 1);
  const [ isSearching, setIsSearching ] = useState<boolean>(false);
  
  const resultNumber = useMemo<string>(() => new Intl.NumberFormat().format(totalCount ?? 0), [totalCount]);
  
  const handleSearch = (payload: string): void => {
    setCurrentSearch(payload);
    setCurrentPage(1);
    Url.pushHistory('q', payload);
    Url.deleteHistory('page');
  };

  const handlePagination = (payload: number): void => {
    window.scrollTo({ top: 0 });
    setCurrentPage(payload);
    Url.pushHistory('page', payload);
  };

  useDebouncedEffect(() => {
    const fetchData = async () => {
      setIsSearching(true);
      alertStore.turnOff();

      const res = await SearchService.repositories({
        q: currentSearch,
        page: currentPage,
      });
      if (res.success && res.data) {
        dispatchRepositories({
          type: ReducerActionType.SET,
          payload: res.data.items,
        });
        setTotalCount(res.data.total_count);
      }
      setIsSearching(false);
    };

    if (currentSearch) {
      fetchData();
    }
  }, [currentSearch, currentPage], 500, {
    leading: true,
  });

  return (<>
    <Header />
    <Container tagName="main">
      <SearchBox className={styles.searchBox} isSearching={isSearching} value={currentSearch} onSearch={handleSearch} />
      <Alert />
      {totalCount !== undefined &&
        <>
          <h2 className={styles.resultTitle}>Repository: {resultNumber}</h2>
          { isSearching
            ? <ProgressBarLoader className={styles.progressBar} bar="transparent" />
            : ''
          }
        </>
      }
      <RepositoryList items={repositories} />
      {(totalCount ?? 0) > 0 && <Pagination page={currentPage} itemsCount={totalCount ?? 0} onNavigate={handlePagination} />}
    </Container>
  </>);
}
export default App;

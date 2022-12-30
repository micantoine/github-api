interface URLParameters {
  q: string;
  page: number;
}

class ApplicationURL {
  public url: URL;

  constructor () {
    this.url = new URL(window.document.URL);
  }

  private replaceHistoryState() {
    window.history.replaceState(null, '', this.url.toString());
  }

  public pushHistory<K extends keyof URLParameters>(key: K, value: URLParameters[K]): void {
    this.url.searchParams.set(key, value.toString());
    this.replaceHistoryState();
  }

  public deleteHistory(key: keyof URLParameters): void {
    this.url.searchParams.delete(key);
    this.replaceHistoryState();
  }

  public parameter(key: keyof URLParameters): string {
    return this.url.searchParams.get(key) || '';
  }
}

export const Url = new ApplicationURL();
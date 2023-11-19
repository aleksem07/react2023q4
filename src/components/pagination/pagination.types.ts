export type PaginationProps = {
  fetchData: FetchData;
  page: number;
  onPageChange: (page: number) => void;
};

export type FetchData = {
  next: string | null;
  previous: string | null;
  count?: number;
};

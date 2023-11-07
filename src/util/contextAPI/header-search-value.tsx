import { createContext } from 'react';

type HeaderSearchValue = {
  headerSearchValue: string;
  setHeaderSearchValue: (searchValue: string) => void;
};

export const HeaderSearchContext = createContext({} as HeaderSearchValue);

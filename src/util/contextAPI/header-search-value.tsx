import { createContext } from 'react';

type HeaderSearchValue = {
  headerSearchValue: string;
  setHeaderSearchValue: (searchValue: string) => void;
};

const initialState = {
  headerSearchValue: '',
  setHeaderSearchValue: () => {},
};

export const HeaderSearchContext =
  createContext<HeaderSearchValue>(initialState);

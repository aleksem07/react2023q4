import React, { createContext, useState, useContext, ReactNode } from 'react';

type SearchHeroValue = {
  headerSearchValue: string;
  setHeaderSearchValue: (searchValue: string) => void;
};

type SearchHeroProviderProps = {
  children: ReactNode;
};

const initialState = {
  headerSearchValue: '',
  setHeaderSearchValue: () => {},
};

const SearchHeroContext = createContext<SearchHeroValue>(initialState);

export const SearchHeroProvider: React.FC<SearchHeroProviderProps> = ({
  children,
}) => {
  const [headerSearchValue, setHeaderSearchValue] = useState(
    localStorage.getItem('search') || ''
  );

  const contextValue = {
    headerSearchValue,
    setHeaderSearchValue,
  };

  return (
    <SearchHeroContext.Provider value={contextValue}>
      {children}
    </SearchHeroContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchHeroContext);

  if (context == null) {
    throw new Error('useSearch must be used within a SearchHeroContext');
  }

  return context;
};

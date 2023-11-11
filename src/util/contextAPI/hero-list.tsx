import { createContext, useContext, useState } from 'react';

type PersonProps = {
  name: string;
};

type HeroListContextProps = {
  person: PersonProps;
  setPerson: (person: PersonProps) => void;
};

type HeroListProviderProps = {
  children: React.ReactNode;
};

const initialState = {
  person: { name: '' },
  setPerson: () => {},
};

export const HeroListContext =
  createContext<HeroListContextProps>(initialState);

export const HeroListProvider: React.FC<HeroListProviderProps> = ({
  children,
}) => {
  const [person, setPerson] = useState(initialState.person);

  const contextValue = {
    person,
    setPerson,
  };

  return (
    <HeroListContext.Provider value={contextValue}>
      {children}
    </HeroListContext.Provider>
  );
};

export const useHeroList = () => {
  const context = useContext(HeroListContext);

  if (context == null) {
    throw new Error('useHeroList must be used within a HeroListContext');
  }

  return context;
};

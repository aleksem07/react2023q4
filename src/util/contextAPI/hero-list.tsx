import { createContext, useContext } from 'react';

type PersonProps = {
  name: string;
};

type initialStateProps = {
  person: PersonProps;
};

const initialState = {
  person: Object,
};

export const HeroListContext = createContext<initialStateProps>(initialState);

export const useHeroList = () => {
  const context = useContext(HeroListContext);

  if (context == null) {
    throw new Error('useHeroList must be used within a HeroListContext');
  }

  return context;
};

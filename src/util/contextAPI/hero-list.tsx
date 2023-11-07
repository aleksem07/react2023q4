import { createContext } from 'react';

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

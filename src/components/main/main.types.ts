export type Person = {
  name: string;
  birth_year: string;
};

export type MainState = {
  people: Person[];
  loading: boolean;
};

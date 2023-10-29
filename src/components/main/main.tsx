import React from 'react';
import './main.scss';
import { MainProps, MainState } from './main.types';
import Pagination from '../pagination/pagination';
import getHeroesAll from '../../services/heroes/heroes';
import { Loader } from '../loader/loader';

class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    this.state = {
      people: [],
      loading: false,
      searchValue: this.getSearchValue,
    };
  }
  getSearchValue: string = localStorage.getItem('search') || '';

  componentDidMount() {
    this.fetchHeroes(this.props.searchValue);
  }

  componentDidUpdate(prevProps: MainProps) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.fetchHeroes(this.props.searchValue);
    }
  }

  async fetchHeroes(searchValue: string) {
    this.setState({ loading: true });
    const heroes = await getHeroesAll(searchValue);
    if (heroes) {
      this.setState({ people: heroes, loading: false });
    }
  }

  render() {
    const { people, loading } = this.state;

    return (
      <>
        <div className="main p-5">
          <h1 className="h2 text-center mb-3">Star Wars Heroes</h1>
          {loading ? (
            <Loader />
          ) : (
            <>
              <ul>
                {people.map((person, index) => (
                  <li key={index}>
                    name: {person.name} birth: {person.birth_year}
                  </li>
                ))}
              </ul>
              <Pagination />
            </>
          )}
        </div>
      </>
    );
  }
}

export default Main;

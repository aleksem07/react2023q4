import './main.scss';
import React from 'react';
import { MainProps, MainState } from './main.types';
import Pagination from '../pagination/pagination';
import getHeroesAll from '../../services/heroes/heroes';
import { Loader } from '../loader/loader';
import HeroItem from '../hero-item/hero-item';

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
        <div className="main p-5 pb-0 container">
          <h1 className="h2 text-center mb-3">Star Wars Heroes</h1>
          {loading ? (
            <Loader />
          ) : (
            <>
              <ul className="row flex flex-row flex-wrap mb-3">
                {people.length > 0 ? (
                  people.map((person, index) => (
                    <li
                      key={index}
                      className="col-4 list-group w-25 align-items-center"
                    >
                      <HeroItem person={person} />
                    </li>
                  ))
                ) : (
                  <li className="text-left">Sorry... No results found</li>
                )}
              </ul>
              {people.length > 0 ? <Pagination /> : null}
            </>
          )}
        </div>
      </>
    );
  }
}

export default Main;

import React from 'react';
import './main.scss';
import { Person, MainState } from './main.types';
import Pagination from '../pagination/pagination';
import getHeroesAll from '../../services/heroes/heroes';
import { Loader } from '../loader/loader';

class Main extends React.Component<Person, MainState> {
  constructor(props: Person) {
    super(props);
    this.state = {
      people: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchHeroes();
  }

  async fetchHeroes() {
    this.setState({ loading: true });
    const heroes = await getHeroesAll();
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
                  <li key={index}>{person.name}</li>
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

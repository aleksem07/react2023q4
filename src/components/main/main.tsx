import React from 'react';
import './main.scss';
import { Person, MainState } from './main.types';
import Pagination from '../pagination/pagination';
import getHeroesAll from '../../services/heroes/heroes';

class Main extends React.Component<Person, MainState> {
  constructor(props: Person) {
    super(props);
    this.state = {
      people: [],
    };
  }

  componentDidMount() {
    this.fetchHeroes();
  }

  async fetchHeroes() {
    const heroes = await getHeroesAll();
    if (heroes) {
      this.setState({ people: heroes });
    }
  }

  render() {
    const { people } = this.state;

    return (
      <>
        <div className="main">
          <h1 className="h2">main</h1>
          <ul>
            {people.map((person, index) => (
              <li key={index}>{person.name}</li>
            ))}
          </ul>
          <Pagination />
        </div>
      </>
    );
  }
}

export default Main;

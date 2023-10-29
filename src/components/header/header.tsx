import React from 'react';
import Search from '../search/search';
import { HeaderProps } from './header.types';

class Header extends React.Component<HeaderProps> {
  handleSearchChange = (value: string) => {
    this.props.onSearch(value);
  };

  render() {
    return (
      <div className="bg-secondary bg-gradient">
        <Search onSearchChange={this.handleSearchChange} />
      </div>
    );
  }
}

export default Header;

import React from 'react';

type HeroItemProps = {
  person: {
    name: string;
    birth_year: string;
  };
};

class HeroItem extends React.Component<HeroItemProps> {
  render() {
    const { name, birth_year } = this.props.person;
    return (
      <>
        <img
          src="placeholder.webp"
          alt="placeholder"
          width={100}
          className="rounded mb-2"
        />
        <h3 className="h5">{name}</h3>
        <p>birth: {birth_year}</p>
      </>
    );
  }
}

export default HeroItem;

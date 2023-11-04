import Search from '../search/search';
import { HeaderProps } from './header.types';

export default function Header({ onSearch }: HeaderProps) {
  const handleSearchChange = (value: string) => {
    onSearch(value);
  };

  return (
    <div className="bg-secondary bg-gradient">
      <Search onSearchChange={handleSearchChange} />
    </div>
  );
}

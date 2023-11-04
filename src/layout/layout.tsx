import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';

interface LayoutProps {
  onSearch: (searchValue: string) => void;
}

function Layout({ onSearch }: LayoutProps): JSX.Element {
  return (
    <>
      <Header onSearch={onSearch} />
      <Outlet />
    </>
  );
}

export default Layout;

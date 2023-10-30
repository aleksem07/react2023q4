import React, { useState } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import ErrorBoundary from './components/error-boundary/errorBoundary';
import ErrorComponent from './components/error-component/errorComponent';

export default function App() {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('search') || ''
  );
  const handleSearchChange = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  return (
    <>
      <Header onSearch={handleSearchChange} />
      <Main value={searchValue} />
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    </>
  );
}

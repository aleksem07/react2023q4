import { useState } from 'react';
import Main from './components/main/main';
import ErrorBoundary from './components/error-boundary/errorBoundary';
import ErrorComponent from './components/error-component/errorComponent';
import { AppRoute } from './const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import PageNotFound from './pages/not-found';
import HeroCard from './components/hero-card/hero-card';

export default function App() {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('search') || ''
  );

  const handleSearchChange = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout onSearch={handleSearchChange} />}>
          <Route
            path={AppRoute.Root}
            element={
              <>
                <ErrorBoundary>
                  <Main search={searchValue} />
                  <ErrorComponent />
                </ErrorBoundary>
              </>
            }
          >
            <Route path={`${AppRoute.Hero}/:id`} element={<HeroCard />} />
          </Route>
          <Route path={AppRoute.Page404} element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

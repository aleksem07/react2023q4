import Main from './components/main/main';
import ErrorBoundary from './components/error-boundary/errorBoundary';
import { AppRoute } from './const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import PageNotFound from './pages/not-found';
import HeroCard from './components/hero-card/hero-card';
import { HeroListProvider } from './util/contextAPI/hero-list';

export default function App() {
  return (
    <BrowserRouter>
      <HeroListProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path={AppRoute.Root}
              element={
                <>
                  <ErrorBoundary>
                    <Main />
                  </ErrorBoundary>
                </>
              }
            >
              <Route path={`${AppRoute.Hero}/:id`} element={<HeroCard />} />
            </Route>
            <Route path={AppRoute.Page404} element={<PageNotFound />} />
          </Route>
        </Routes>
      </HeroListProvider>
    </BrowserRouter>
  );
}

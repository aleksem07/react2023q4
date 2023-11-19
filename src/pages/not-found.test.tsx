import PageNotFound from './not-found';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import Layout from '../layout/layout';
import { AppRoute } from '../const';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('PageNotFound', () => {
  it('should render correct', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );

    const pageNotFound = screen.getByText(/404 Page not found/i);
    expect(pageNotFound).toBeInTheDocument();

    const backButton = screen.getByRole('link', { name: /back to main page/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', '/');
  });

  it('render 404 page when navigating to an invalid route', () => {
    render(
      <MemoryRouter initialEntries={[AppRoute.Invalid]}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MemoryRouter>
    );

    const notFoundMessage = screen.getByText(/404 Page not found/i);
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('don`t render 404 page when navigating to an invalid route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Root]}>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const notFoundMessage = screen.queryByText(/404 Page not found/i);
    expect(notFoundMessage).toBeNull();
  });
});

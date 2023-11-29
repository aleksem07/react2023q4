import './App.css';
import Main from './components/main/main';
import { AppRoute } from './const';
import UncontrolledForm from './components/uncontrolled-form/uncontrolled-form';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactHookForm from './components/react-hook-form/react-hook-form';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Main />} />
          <Route path={AppRoute.Uncontrolled} element={<UncontrolledForm />} />
          <Route path={AppRoute.Controlled} element={<ReactHookForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

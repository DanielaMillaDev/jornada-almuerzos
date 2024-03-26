import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Pedidos from './pages/Pedidos/index';
import Cocina from './pages/Cocina/index';
import Bodega from './pages/Bodega/index';
import Mercado from './pages/Mercado/index';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/pedidos"
          element={
            <>
              <PageTitle title="Pedidos | Jornada Alimetación" />
              <Pedidos />
            </>
          }
        />
     
     
        <Route
          path="/cocina"
          element={
            <>
              <PageTitle title="Cocina | Jornada Alimetación" />
              <Cocina />
            </>
          }
        />
        <Route
          path="/bodega"
          element={
            <>
              <PageTitle title="Bodega | Jornada Alimetación" />
              <Bodega />
            </>
          }
        />
        <Route
          path="/mercado"
          element={
            <>
              <PageTitle title="Mercado | Jornada Alimetación" />
              <Mercado />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;

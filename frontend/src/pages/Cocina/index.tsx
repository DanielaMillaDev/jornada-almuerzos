import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TabPedidos from './components/TabPedidos';
import TabRecetas from './components/TabRecetas';
import TabHistorial from './components/TabHistorial';
import { fetchData } from '../../api';

const urlApi = 'http://localhost:3001/api_cocina/';


interface Pedido {
  id_pedido: number;
  id_estado_plato: number;
  numero_plato: number;
  id_receta: number;
  id_plato: number;
  receta: string;
  estado: string;
}

interface Receta {
  id_receta: number;
  receta: string;
}

interface Historial {
  id_pedido: number;
  receta: string;
}

const Cocina = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [historial, setHistorial] = useState<Historial[]>([]);
  const [activeTab, setActiveTab] = useState('pedidos');

  useEffect(() => {
    fetchPedidos();
    fetchRecetasDisponibles();
    fetchHistorialPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const data = await fetchData(urlApi + 'ver_pedidos');
      setPedidos(data.resultadosPedidos); // Establece el estado con los datos recibidos
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  };

  const fetchRecetasDisponibles = async () => {
    try {
      const data = await fetchData(urlApi + 'ver_recetas');
      setRecetas(data.resultadosRecetas); // Establece el estado con los datos recibidos
    } catch (error) {
      console.error('Error al obtener las recetas:', error);
    }
  };

  const fetchHistorialPedidos = async () => {
    try {
      const data = await fetchData(urlApi + 'ver_historial_pedidos');
      setHistorial(data.resultadosHistorial); // Establece el estado con los datos recibidos
    } catch (error) {
      console.error('Error al obtener el historial:', error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cocina" />

      <div className="flex justify-center space-x-4">
        <button
          className={`py-2 px-4 ${activeTab === 'pedidos' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded mb-4`}
          onClick={() => setActiveTab('pedidos')}
        >
          Pedidos
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'recetas' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded mb-4`}
          onClick={() => setActiveTab('recetas')}
        >
          Recetas Disponibles
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'historial' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded mb-4`}
          onClick={() => setActiveTab('historial')}
        >
          Historial Pedidos Finalizados
        </button>
      </div>

      {activeTab === 'pedidos' && <TabPedidos pedidos={pedidos} fetchPedidos={fetchPedidos} />}
      {activeTab === 'recetas' && <TabRecetas recetas={recetas} />}
      {activeTab === 'historial' && <TabHistorial historial={historial} />}
    </DefaultLayout>
  );
};

export default Cocina;

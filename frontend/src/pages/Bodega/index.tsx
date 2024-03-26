import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TabSolicitudes from './components/TabSolicitudes';
import TabInventario from './components/TabInventario';
import { fetchData } from '../../api';

const urlApi = 'http://localhost:3003/api_bodega/';

interface Ingredientes {
    id_receta: number;
    id_ingrediente: number;
    ingrediente: string;
    cantidad_ingredientes: number;
  }
  
interface Solicitud {
  id_plato: number;
  id_receta: number;
  id_solicitud_bodega: number;
  receta: string;
  id_estado_plato: number;
  estado: string;
}



const Bodega = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [inventario, setInventarioIngredientes] = useState<Ingredientes[]>([]);
  const [activeTab, setActiveTab] = useState('solicitudes'); // Estado para manejar la pestaña activa
  useEffect(() => {
    fetchSolicitudes();
    fetchInventarioIngredientes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
        const data = await fetchData(urlApi + 'ver_solicitudes');
        setSolicitudes(data.resultadosSolicitudes);
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
    }
  };

  const fetchInventarioIngredientes = async () => {
    try {
      const data = await fetchData(urlApi +'ver_inventario_ingredientes');
        setInventarioIngredientes(data.resultadosInventario); // Establece el estado con los datos recibidos
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bodega" />
  
      <div className="flex justify-center space-x-4">
        <button className={`py-2 px-4 ${activeTab === 'solicitudes' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded mb-4`} onClick={() => setActiveTab('solicitudes')}>
          Solicitudes
        </button>
        <button className={`py-2 px-4 ${activeTab === 'inventario' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded mb-4`} onClick={() => setActiveTab('inventario')}>
          Inventario Ingredientes
        </button>
      </div>

      {activeTab === 'solicitudes' && <TabSolicitudes solicitudes={solicitudes} fetchSolicitudes={fetchSolicitudes} fetchInventarioIngredientes={fetchInventarioIngredientes}/>}
      {activeTab === 'inventario' && <TabInventario inventario={inventario} />}

    </DefaultLayout>
  );
};

export default Bodega;

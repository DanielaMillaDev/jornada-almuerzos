import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TabCompras from './components/TabCompras';
import TabHistorial from './components/TabHistorial';

const apiUrl = 'http://localhost:3004/api_mercado/';


interface Ingrediente {
    id_ingrediente: number;
    ingrediente: string;
}

interface Historial {
    id_compra: number;
    ingrediente: string;
    cantidad_compra: number;
    fecha_compra: string;
}

const Mercado = () => {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [historial, setHistorial] = useState<Historial[]>([]);
    const [activeTab, setActiveTab] = useState('compras');


    useEffect(() => {
        fetchDataIngredientes();
        fetchHistorialCompras();
    }, []);

    const fetchDataIngredientes = async () => {
        try {
            const response = await fetch(apiUrl + 'ver_ingredientes_mercado');
            if (response.ok) {
                const data = await response.json();
                setIngredientes(data.resultadosIngredientes);
            } else {
                throw new Error('Error al obtener las solicitudes');
            }
        } catch (error) {
            console.error('Error al obtener las solicitudes:', error);
        }
    };

    const fetchHistorialCompras = async () => {
        try {
            const response = await fetch(apiUrl + 'ver_historial_compras');
            if (response.ok) {
                const data = await response.json();
                setHistorial(data.resultadosHistorial);
            } else {
                throw new Error('Error al obtener las solicitudes');
            }
        } catch (error) {
            console.error('Error al obtener las solicitudes:', error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Mercado" />

            <div className="flex justify-center space-x-4">
                <button className={`py-2 px-4 ${activeTab === 'compras' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded mb-4`} onClick={() => setActiveTab('compras')}>
                    Compras
                </button>
                <button className={`py-2 px-4 ${activeTab === 'historial' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded mb-4`} onClick={() => setActiveTab('historial')}>
                    Historial de Compras
                </button>
            </div>

            {activeTab === 'compras' && <TabCompras ingredientes={ingredientes} fetchHistorialCompras={fetchHistorialCompras} />}
            {activeTab === 'historial' && <TabHistorial historial={historial} />}

        </DefaultLayout>
    );

};

export default Mercado;

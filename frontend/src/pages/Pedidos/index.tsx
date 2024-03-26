import  { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import PedidoFormulario from './components/PedidoFormulario';
import ListaPedidosActivos from './components/ListaPedidosActivos';
import { fetchData } from '../../api';


const ECommerce = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const data = await fetchData('http://localhost:3002/api_pedidos/ver_pedidos');
        setPedidos(data.resultadosPedidos);
     
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  };

  return (
    <DefaultLayout>
      <PedidoFormulario fetchPedidos={fetchPedidos} />
      <h1>Listado de pedidos activos</h1>
      <ListaPedidosActivos pedidos={pedidos}  fetchPedidos={fetchPedidos}/>
    </DefaultLayout>
  );
};

export default ECommerce;

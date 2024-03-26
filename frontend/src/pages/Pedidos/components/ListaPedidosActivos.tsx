import React from 'react';
import swal from 'sweetalert';
import CardDataStats from '../../../components/CardDataStats';
import { MdRestaurant } from 'react-icons/md';
import { postData } from '../../../api';

const apiUrl = 'http://localhost:3002/api_pedidos/';

interface Pedidos {
    id_pedido:number;
    cantidad_platos:number;
    id_estado:number;
    platos_listos:number;
    estado:string;
}

interface ListaPedidosActivos {
    pedidos:Pedidos[];
    fetchPedidos: () => void;
}

const ListaPedidosActivos: React.FC<ListaPedidosActivos> = ({ pedidos ,fetchPedidos}) => {

  
  const fetchEntregarPedido = async (idPedido:number) => {
    try {
      await postData(apiUrl + 'entregar_pedido', {
        id_pedido: idPedido
      });
      swal("Pedido entregado!", "", "success");
      fetchPedidos();

    } catch (error) {
      swal("Error al entregar pedido!", "", "error");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {pedidos.map((pedido, index) => (
        pedido.id_estado === 3 ? (
          <CardDataStats
            key={index}
            title={`${pedido.cantidad_platos} plato/s solicitado/s`}
            estado={pedido.estado}
            subtitle={`${pedido.platos_listos} platos/s listo/s`}
            buttonText='Entregar Pedido'
            onClickButton={() => fetchEntregarPedido(pedido.id_pedido)}
          >
            <MdRestaurant size={20} />
          </CardDataStats>
        ) : (
          <CardDataStats
            key={index}
            title={`${pedido.cantidad_platos} plato/s solicitado/s`}
            estado={pedido.estado}
            subtitle={`${pedido.platos_listos} platos/s listo/s`}
          >
            <MdRestaurant size={20} />
          </CardDataStats>
        )
      ))}
    </div>
  );
};

export default ListaPedidosActivos;

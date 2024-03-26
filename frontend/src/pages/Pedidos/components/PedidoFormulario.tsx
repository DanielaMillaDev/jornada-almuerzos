import React, { useState } from 'react';
import { MdOutlineDinnerDining } from 'react-icons/md';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { postData } from '../../../api';

const apiUrl = 'http://localhost:3002/api_pedidos/';

interface PedidoFormulario {
  fetchPedidos: () => void;
}

const PedidoFormulario: React.FC<PedidoFormulario> = ({ fetchPedidos }) => {
  const [cantidadPlatos, setCantidadPlatos] = useState(1);

  const handleChangeCantidadPlatos = (event: any) => {
    let newValue = parseInt(event.target.value);
    if (newValue > 50) {
      newValue = 50;
    }
    setCantidadPlatos(newValue);
  };

  const handleSolicitarPlato = async () => {
    try {
      await postData(apiUrl + 'nuevo_pedido', {
        id_estado: 1,
        cant_platos: 1
      });

      swal("Pedido realizado!", "", "success");
      fetchPedidos();

    } catch (error) {
      swal("Error al realizar pedido!", "", "error");
    }
  };

  const handleSolicitudMasiva = async () => {
    try {
      await postData(apiUrl + 'nuevo_pedido', {
        id_estado: 1,
        cant_platos: cantidadPlatos

      });
      swal("Pedido realizado!", "", "success");
      setCantidadPlatos(1);
      fetchPedidos();
    } catch (error) {
      swal("Error al realizar pedido!", "", "error");
    }
  };

  return (
    <div className="p-2 md:p-3 xl:p-4">
      <div className="mb-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-2 md:p-3 xl:p-4">
          <div className="mb-3 flex flex-col gap-2 xl:gap-3">
            <Link
              to="#"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
              onClick={handleSolicitarPlato}
            >
              <MdOutlineDinnerDining size={16} />
              Solicitar plato
            </Link>
            <div>
              <input
                type="number"
                min={1}
                max={50}
                value={cantidadPlatos}
                onChange={handleChangeCantidadPlatos}
                placeholder="Cantidad Platos"
                className="w-full rounded-lg border-[1px] border-stroke bg-transparent py-1 px-3 text-sm text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <Link
              to="#"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
              onClick={handleSolicitudMasiva}
            >
              <MdOutlineDinnerDining size={16} />
              Solicitud Masiva
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoFormulario;

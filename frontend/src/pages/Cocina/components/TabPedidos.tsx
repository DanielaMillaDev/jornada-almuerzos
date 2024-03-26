import React from 'react';
import { MdRestaurant, MdSoupKitchen } from 'react-icons/md';
import swal from 'sweetalert';
import { fetchData, postData } from '../../../api';
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

interface TabPedidosProps {
    pedidos: Pedido[];
    fetchPedidos: () => void;
}

const TabPedidos: React.FC<TabPedidosProps> = ({ pedidos, fetchPedidos }) => {

    const fetchInsertarPlatoAleatorio = async (idPedido: number, numeroPlato: number) => {
        try {
            const recetas = await fetchData(urlApi+'ver_recetas');
            const idRecetaAleatoria = recetas.resultadosRecetas[Math.floor(Math.random() * recetas.resultadosRecetas.length)].id_receta;
            await postData(urlApi+'insertar_plato_aleatorio', {
                id_receta: idRecetaAleatoria,
                id_pedido: idPedido,
                numero_plato: numeroPlato
            });
            fetchPedidos();
            swal("Listo!", "Plato insertado correctamente con una receta aleatoria", "success");
        } catch (error) {
            console.error('Error al insertar el plato:', error);
            alert('Error al insertar el plato');
        }
    };

    const fetchInsertarSolicitudBodega = async (idReceta: number, idPedido: number, idPlato: number) => {
        try {
            await postData(urlApi+'solicitud_bodega', {
                id_receta: idReceta,
                id_plato: idPlato,
                id_pedido: idPedido
            });
            fetchPedidos();
            swal("Listo!", "Solicitud de ingredientes realizada con éxito", "success");
        } catch (error) {
            swal("Ups!", "Error al solicitar a bodega", "error");
        }
    };

    const fetchEntregarPlato = async (idPlato: number, idPedido: number) => {
        try {
            const response = await postData(urlApi+'entregar_plato', {
                id_plato: idPlato,
                id_pedido: idPedido
            });
            if (response.salida !== 0) {
                fetchPedidos();
                swal("Listo!", "Plato entregado exitosamente", "success");
            } else {
                swal("Faltan Ingredientes", "No existen suficientes ingredientes en inventario", "warning");
            }
        } catch (error) {
            swal("Ups!", "Error al entregar plato", "error");
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            {pedidos.length > 0 ? (
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    N° Pedido
                                </th>
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Plato seleccionado
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Estado
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map((pedido, index) => (
                                <tr key={index}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {pedido.id_pedido}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {pedido.receta}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${pedido.id_estado_plato === 1
                                                ? 'bg-success text-warning'
                                                : pedido.id_estado_plato === 2
                                                    ? 'bg-warning text-warning'
                                                    : 'bg-success text-success'

                                                }`}
                                        >
                                            {pedido.estado}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            {pedido.id_estado_plato === 0 ? (
                                                <button
                                                    className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-3"
                                                    onClick={() => fetchInsertarPlatoAleatorio(pedido.id_pedido, pedido.numero_plato)}
                                                >
                                                    <span>
                                                        <MdRestaurant size={18} />
                                                    </span>
                                                    Receta Aleatoria
                                                </button>
                                            ) : pedido.id_estado_plato === 1 ? (
                                                <button
                                                    className="inline-flex items-center justify-center gap-1.5 rounded-md bg-warning py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-3"
                                                    onClick={() => fetchInsertarSolicitudBodega(pedido.id_receta, pedido.id_pedido, pedido.id_plato)}
                                                >
                                                    <span>
                                                        <MdSoupKitchen size={18} />
                                                    </span>
                                                    Solicitar Ingredientes
                                                </button>
                                            ) : pedido.id_estado_plato === 3 ? (
                                                <button
                                                    className="inline-flex items-center justify-center gap-1.5 rounded-md bg-success py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-3"
                                                    onClick={() => fetchEntregarPlato(pedido.id_plato, pedido.id_pedido)}
                                                >
                                                    <span>
                                                        <MdSoupKitchen size={18} />
                                                    </span>
                                                    Entregar Plato
                                                </button>
                                            ) : pedido.id_estado_plato === 2 ? (
                                                <h4>Esperando ingredientes para enviar plato</h4>
                                            ) : (<p>Error al obtener plato</p>)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className='text-center'>Sin pedidos disponibles</p>
            )}
        </div>
    );
};

export default TabPedidos;

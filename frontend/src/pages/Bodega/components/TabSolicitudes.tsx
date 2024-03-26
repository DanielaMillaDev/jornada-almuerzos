import React, { useState } from 'react';
import { MdRestaurant } from 'react-icons/md';
import swal from 'sweetalert';
import { postData } from '../../../api';
import Modal from './Modal';

const urlApi = 'http://localhost:3003/api_bodega/';

interface Solicitud {
    id_plato: number;
    id_receta: number;
    id_solicitud_bodega: number;
    receta: string;
    id_estado_plato: number;
    estado: string;
}

interface Ingredientes {
    id_receta: number;
    id_ingrediente: number;
    ingrediente: string;
    cantidad_ingredientes: number;
}

interface TabSolicitudesProps {
    solicitudes: Solicitud[];
    fetchSolicitudes: () => void;
    fetchInventarioIngredientes: () => void;
}

const TabSolicitudes: React.FC<TabSolicitudesProps> = ({ solicitudes, fetchSolicitudes, fetchInventarioIngredientes }) => {
    const [ingredientes, setIngredientesSolicitud] = useState<Ingredientes[]>([]);
    const [selectedPlatoId, setSelectedPlatoId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);

    const fetchIngredientesSolicitud = async (idReceta: number) => {
        try {

           const data= await postData(urlApi + 'ver_ingredientes_solicitud', {
                id_receta: idReceta
            })

            setIngredientesSolicitud(data.resultadosIngredientes); 
           
        } catch (error) {
            console.error('Error al obtener las solicitudes:', error);
        }
    };

    const fetchEnviarIngredientesCocina = async (idPlato: number) => {
        try {
            await postData(urlApi + 'enviar_ingredientes', {
                id_plato: idPlato
            })

            fetchSolicitudes();
            fetchInventarioIngredientes();
            setShowModal(false);
            swal("Listo!", "Ingredientes enviados", "success");

        } catch (error) {
            console.error('Error al enviar ingredientes:', error);
        }
    };

    const openModal = (idReceta: number, id_plato: number) => {
        fetchIngredientesSolicitud(idReceta);
        setSelectedPlatoId(id_plato);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    {solicitudes.length === 0 ? (
                        <p className="text-center text-gray-500">Sin solicitudes de ingredientes disponibles</p>
                    ) : (
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        N° Solicitud
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Ingredientes para receta
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
                                {solicitudes.map((solicitud, key) => (
                                    <tr key={key}>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {solicitud.id_solicitud_bodega}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {solicitud.receta}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p
                                                className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${solicitud.id_estado_plato === 3
                                                    ? 'bg-success text-success'
                                                    : 'bg-warning text-warning'
                                                    }`}
                                            >
                                                {solicitud.estado}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">
                                                <button
                                                    className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-3"
                                                    onClick={() => openModal(solicitud.id_receta, solicitud.id_plato)}
                                                >
                                                    <span>
                                                        <MdRestaurant size={18} />
                                                    </span>
                                                    Ver Ingredientes
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <Modal
                showModal={showModal}
                closeModal={closeModal}
                ingredientes={ingredientes}
                selectedPlatoId={selectedPlatoId}
                fetchEnviarIngredientesCocina={fetchEnviarIngredientesCocina}
            />
        </>

    );
};

export default TabSolicitudes;

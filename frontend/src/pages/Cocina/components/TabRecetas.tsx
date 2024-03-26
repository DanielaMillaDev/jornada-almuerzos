import React, { useState } from 'react';
import { MdRestaurant } from 'react-icons/md';
import { postData } from '../../../api';
import Modal from './Modal';

const urlApi = 'http://localhost:3001/api_cocina/';


interface Receta {
  id_receta: number;
  receta: string;
}

interface TabRecetasProps {
  recetas: Receta[];
}

interface Ingredientes {
  id_ingrediente: number;
  ingrediente: string;
}


const TabRecetas: React.FC<TabRecetasProps> = ({ recetas }) => {
  const [ingredientes, setIngredientes] = useState<Ingredientes[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchIngredientes = async (idReceta: number) => {
    try {

      const data = await postData(urlApi + 'ver_ingredientes', {
        id_receta: idReceta
      })

      setIngredientes(data.resultadosIngredientes);

    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
    }
  };

  const openModal = (idReceta: number) => {
    fetchIngredientes(idReceta);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {recetas.length === 0 ? (
            <p className="text-center text-gray-500">Sin recetas disponibles</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    N°
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Receta
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Ver Ingredientes
                  </th>
                </tr>
              </thead>
              <tbody>
                {recetas.map((receta, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {receta.id_receta}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {receta.receta}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-3"
                          onClick={() => openModal(receta.id_receta)}
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
      />
    </>
  );
};

export default TabRecetas;

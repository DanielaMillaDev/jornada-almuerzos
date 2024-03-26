import React from 'react';
import { MdSoupKitchen } from 'react-icons/md';

interface Ingredientes {
  id_receta: number;
  id_ingrediente: number;
  ingrediente: string;
  cantidad_ingredientes: number;
}

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  ingredientes: Ingredientes[];
  selectedPlatoId: number | null;
  fetchEnviarIngredientesCocina: (idPlato: number) => void;
}

const Modal: React.FC<ModalProps> = ({ showModal, closeModal, ingredientes, selectedPlatoId, fetchEnviarIngredientesCocina }) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="bg-white p-8 rounded-lg z-50 w-[600px] h-[400px] overflow-auto">
            <h2 className="text-lg font-semibold mb-4">Ingredientes Solicitados</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-black">Ingrediente</th>
                  <th className="border px-4 py-2 text-black">Cantidad Disponible</th>
                  <th className="border px-4 py-2 text-black">Cantidad Solicitada</th>
                </tr>
              </thead>
              <tbody>
                {ingredientes.map((ingredientItem, index) => (
                  <tr key={index}>
                    <td className={`border px-4 py-2 ${ingredientItem.cantidad_ingredientes === 0 ? 'text-red-500' : 'text-black'}`}>{ingredientItem.ingrediente}</td>
                    <td className={`border px-4 py-2 ${ingredientItem.cantidad_ingredientes === 0 ? 'text-red-500' : 'text-black'}`}>{ingredientItem.cantidad_ingredientes}</td>
                    <td className="border px-4 py-2 text-black">{1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {ingredientes.some(item => item.cantidad_ingredientes === 0) ? (
              <div className="mt-4 text-red-500">Faltan ingredientes</div>
            ) : (
              <button
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-md bg-success py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-3"
                onClick={() => {
                  if (selectedPlatoId !== null) {
                    fetchEnviarIngredientesCocina(selectedPlatoId);
                  }
                }}
              >
                <span>
                  <MdSoupKitchen size={18} />
                </span>
                Enviar Ingredientes
              </button>
            )}
            <button className="mt-4 py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

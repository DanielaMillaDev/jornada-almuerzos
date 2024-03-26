import React from 'react';

interface Ingredientes {
  id_ingrediente: number;
  ingrediente: string;
}

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  ingredientes: Ingredientes[];
}

const Modal: React.FC<ModalProps> = ({ showModal, closeModal, ingredientes }) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="bg-white p-8 rounded-lg z-50 w-[600px] h-[400px] overflow-auto">
            <h2 className="text-lg font-semibold mb-4">Ingredientes receta</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-black">Ingrediente</th>
                  <th className="border px-4 py-2 text-black">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {ingredientes.map((ingredientItem, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 text-black">{ingredientItem.ingrediente}</td>
                    <td className="border px-4 py-2 text-black">{1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-4 py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

import React  from 'react';

interface Ingredientes {
    id_receta: number;
    id_ingrediente: number;
    ingrediente: string;
    cantidad_ingredientes: number;
  }

interface TabInventarioProps {
    inventario: Ingredientes[];
}

const TabInventario: React.FC<TabInventarioProps> = ({ inventario }) => {
    
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
            {inventario.length === 0 ? (
              <p className="text-center text-gray-500">Sin ingredientes disponibles</p>
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      N° 
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Ingrediente
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Cantidad disponible
                    </th>             
                  </tr>
                </thead>
                <tbody>
                  {inventario.map((ingrediente, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {ingrediente.id_ingrediente}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {ingrediente.ingrediente}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {ingrediente.cantidad_ingredientes}
                        </h5>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        
    );
};

export default TabInventario;

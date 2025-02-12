import React from 'react';

interface Historial {
    id_compra: number;
    ingrediente: string;
    cantidad_compra: number;
    fecha_compra: string;
  }

interface TabHistorialProps {
  historial: Historial[];
}

const TabHistorial: React.FC<TabHistorialProps> = ({ historial }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    {historial.length > 0 ? (
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                N° Compra
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Ingrediente
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Cantidad Compra
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Fecha transacción
              </th>
            </tr>
          </thead>
          <tbody>
            {historial.map((item, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.id_compra}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.ingrediente}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.cantidad_compra}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.fecha_compra}
                  </h5>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className='text-center'>Sin historial de compras disponible</p>
    )}

  </div>
  );
};

export default TabHistorial;

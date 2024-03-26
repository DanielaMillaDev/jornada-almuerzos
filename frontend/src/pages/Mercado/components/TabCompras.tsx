import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import swal from 'sweetalert';
import { fetchData, postData } from '../../../api';

interface Ingrediente {
    id_ingrediente: number;
    ingrediente: string;
}

interface TabComprasProps {
    ingredientes: Ingrediente[];
    fetchHistorialCompras: () => void;
}

const TabCompras: React.FC<TabComprasProps> = ({ ingredientes, fetchHistorialCompras }) => {

    const fetchComprarIngrediente = async (idIngrediente: number, ingrediente: string) => {
        try {

            const data = await fetchData(`https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${ingrediente.toLocaleLowerCase()}`);

            if (data.quantitySold != 0) {
                await postData('http://localhost:3004/api_mercado/comprar_ingrediente', {

                    id_ingrediente: idIngrediente,
                    cantidad_compra: data.quantitySold
                })

                swal("Listo!", "Ingrediente comprado", "success");
                fetchHistorialCompras();

            } else {
                swal("Ups!", "Ingrediente no disponible", "warning");
            }

        } catch (error) {
            console.error('Error al enviar ingredientes:', error);
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                N°
                            </th>
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Ingrediente
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredientes.map((item, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {item.id_ingrediente}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {item.ingrediente}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button
                                            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-3"
                                            onClick={() => fetchComprarIngrediente(item.id_ingrediente, item.ingrediente)}
                                        >
                                            <span>
                                                <MdAddShoppingCart size={18} />
                                            </span>
                                            Comprar Ingrediente
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TabCompras;

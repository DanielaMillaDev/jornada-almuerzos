import { NavLink, useLocation } from 'react-router-dom';
import { RiRestaurantLine, RiArchiveFill, RiShoppingCartFill, RiFileList3Fill } from 'react-icons/ri';


const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/pedidos">
          <h1>Jornada Almuerzos</h1>
        </NavLink>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/pedidos"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('pedidos') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <RiFileList3Fill className="fill-current" size={40} />
                  Pedidos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cocina"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('cocina') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <RiRestaurantLine className="fill-current" size={40} />
                  Cocina
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/bodega"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('bodega') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <RiArchiveFill className="fill-current" size={40} />
                  Bodega
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mercado"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('mercado') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <RiShoppingCartFill className="fill-current" size={40} />
                  Mercado
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;

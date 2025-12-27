import { Link, useLocation } from "react-router";
import logo from "../../public/logo.png";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Box, LayoutDashboard, LogOut, Plus, ShoppingCart } from "lucide-react";

const Header = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const getNavItemClass = (path: string) => {
    const baseClass =
      "flex h-[35px] w-[35px] items-center justify-center rounded-md border";

    if (path === location.pathname) {
      return `${baseClass} bg-[#F2DAAC] text-[#161040]`;
    } else {
      return baseClass;
    }
  };

  return (
    <div className="bg-[#161410]">
      <div className="mx-auto flex w-full items-center justify-between p-4 md:w-[737px] md:p-0">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>

        {user ? (
          <div className="flex items-center gap-8 text-white">
            <div className="flex items-center gap-2 text-[#F2DAAC]">
              <Link to="/">
                <div className={getNavItemClass("/")}>
                  <Box size={18} className="cursor-pointer" />
                </div>
              </Link>
              <Link to="/pedidos">
                <div className={getNavItemClass("/pedidos")}>
                  <LayoutDashboard size={18} className="cursor-pointer" />
                </div>
              </Link>
              <div className="flex h-[35px] w-[35px] items-center justify-center rounded-md border">
                <Plus size={18} className="cursor-pointer" />
              </div>
            </div>
            <div className="relative cursor-pointer">
              <ShoppingCart size={18} />
              <p className="absolute -top-4 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2DAAC] p-1 font-bold text-[#161040]">
                1
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p>{user?.name}</p>
              <LogOut className="cursor-pointer" size={18} />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="flex h-[35px] w-[130px] cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC]">
              Entrar
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
